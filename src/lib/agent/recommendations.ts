import { getTopProducts } from "./scoring";
import type {
  ActionType,
  Institution,
  OutreachDraft,
  RecommendedAction,
} from "../types";

export interface ActionRecommendation {
  action: Omit<RecommendedAction, "id" | "approvalStatus" | "createdAt">;
  draft?: Omit<OutreachDraft, "id" | "createdAt">;
}

export function recommendNextAction(
  account: Institution
): ActionRecommendation {
  const topProducts = getTopProducts(account.productFit);
  const primaryContact =
    account.contacts.find((c) => c.isPrimary) ?? account.contacts[0];

  if (account.lifecycleStatus === "do_not_contact") {
    return buildRecommendation(account, "no_action", "Account marked Do Not Contact", "low", topProducts);
  }

  if (account.duplicateRisk?.severity === "high") {
    return buildRecommendation(
      account,
      "no_action",
      "Hold outreach — duplicate/conflict risk detected across CRM systems",
      "high",
      topProducts,
      "Resolve duplicate ownership before any outreach."
    );
  }

  if (
    account.crmRelationship === "existing_customer" ||
    account.lifecycleStatus === "live"
  ) {
    const upsell = account.productFit.some(
      (f) => f.score >= 70 && !account.primaryProducts.includes(f.productId)
    );
    if (upsell) {
      return buildRecommendation(
        account,
        "upsell_opportunity",
        `Expansion fit detected for ${topProducts.join(", ")}`,
        "medium",
        topProducts,
        undefined,
        primaryContact?.id
      );
    }
    return buildRecommendation(
      account,
      "customer_success_check_in",
      "Active customer — schedule success check-in",
      "medium",
      topProducts,
      undefined,
      primaryContact?.id
    );
  }

  if (account.crmRelationship === "dormant_lead") {
    return buildRecommendation(
      account,
      "re_engagement",
      "Dormant lead with fresh signals — personalized re-engagement",
      "high",
      topProducts,
      undefined,
      primaryContact?.id,
      true
    );
  }

  if (account.signals.some((s) => s.category === "conference")) {
    return buildRecommendation(
      account,
      "conference_follow_up",
      "Recent conference touchpoint — timely follow-up",
      "high",
      topProducts,
      undefined,
      primaryContact?.id,
      true
    );
  }

  if (
    account.lifecycleStatus === "active_opportunity" &&
    account.isStalled
  ) {
    return buildRecommendation(
      account,
      "re_engagement",
      "Stalled opportunity — multi-threaded re-engagement",
      "high",
      topProducts,
      undefined,
      primaryContact?.id,
      true
    );
  }

  if (account.lifecycleStatus === "needs_human_review") {
    return buildRecommendation(
      account,
      "no_action",
      "Awaiting human review of prospect research",
      "medium",
      topProducts
    );
  }

  if (
    account.lifecycleStatus === "ready_for_outreach" ||
    account.crmRelationship === "cold_prospect"
  ) {
    return buildRecommendation(
      account,
      "cold_outreach",
      "New prospect with strong product fit — personalized cold outreach",
      "high",
      topProducts,
      undefined,
      primaryContact?.id,
      true
    );
  }

  if (account.signals.some((s) => s.category === "ai_initiatives")) {
    return buildRecommendation(
      account,
      "webinar_invitation",
      "AI initiative signal — invite to targeted webinar",
      "medium",
      topProducts,
      undefined,
      primaryContact?.id
    );
  }

  return buildRecommendation(
    account,
    "no_action",
    "Monitor — no high-confidence action yet",
    "low",
    topProducts
  );
}

function buildRecommendation(
  account: Institution,
  type: ActionType,
  title: string,
  priority: RecommendedAction["priority"],
  suggestedProducts: RecommendedAction["suggestedProducts"],
  extraRationale?: string,
  contactId?: string,
  withDraft = false
): ActionRecommendation {
  const rationale = [
    `CRM status: ${account.crmRelationship.replace(/_/g, " ")}.`,
    `Lifecycle: ${account.lifecycleStatus.replace(/_/g, " ")}.`,
    account.signals.length
      ? `Active signals: ${account.signals.slice(0, 3).map((s) => s.title).join("; ")}.`
      : "No recent public signals.",
    extraRationale,
  ]
    .filter(Boolean)
    .join(" ");

  const action: ActionRecommendation["action"] = {
    accountId: account.id,
    contactId,
    type,
    title,
    rationale,
    priority,
    suggestedProducts,
  };

  if (!withDraft || type === "no_action" || !contactId) {
    return { action };
  }

  const contact = account.contacts.find((c) => c.id === contactId);
  const productName = suggestedProducts[0] ?? "orion";
  const signal = account.signals[0];

  const draft = generateOutreachDraft(account.name, contact?.name ?? "there", type, productName, signal?.title);

  return { action, draft: { ...draft, accountId: account.id, contactId, channel: "email" as const } };
}

function generateOutreachDraft(
  institution: string,
  contactName: string,
  type: ActionType,
  product: string,
  signalHook?: string
): Omit<OutreachDraft, "id" | "createdAt" | "accountId" | "contactId"> {
  const firstName = contactName.split(" ")[0];

  const hooks: Record<ActionType, { subject: string; body: string }> = {
    cold_outreach: {
      subject: `${institution} — ${signalHook ?? "operational priorities"} & ${product}`,
      body: `Hi ${firstName},

I noticed ${signalHook ? `${signalHook.toLowerCase()} at ${institution}` : `recent priorities emerging at ${institution}`} and thought it might connect to work we're doing with peer institutions on ${product}.

We've helped similar universities reduce manual review load and improve decision confidence without adding headcount. If a 20-minute conversation would be useful, I'd welcome the chance to share what peers are doing.

Would next Tuesday or Thursday work for a brief call?

Best,
[Your name]`,
    },
    re_engagement: {
      subject: `Reconnecting — ${institution} & ${product}`,
      body: `Hi ${firstName},

It's been a while since we last connected. Given ${signalHook ?? "shifts in enrollment and aid operations"}, I wanted to reopen the conversation in case timing is better now.

Happy to share a short update on outcomes peer institutions have seen — no pressure if priorities have moved.

Open to a quick call?

Best,
[Your name]`,
    },
    webinar_invitation: {
      subject: `Invitation: AI in Higher Ed operations (peer session)`,
      body: `Hi ${firstName},

We're hosting a focused session for enrollment and IT leaders on practical AI adoption — not hype, but workflows institutions are actually deploying.

Given ${institution}'s ${signalHook ?? "AI initiatives"}, I thought you might find it relevant. Would you like me to reserve a seat?

Best,
[Your name]`,
    },
    conference_follow_up: {
      subject: `Great meeting you at the conference — ${institution}`,
      body: `Hi ${firstName},

It was good connecting at the event. As promised, I'm following up with a brief note on how we're helping institutions like ${institution} with ${product}.

If you'd like to continue the conversation we started, I have time this week.

Best,
[Your name]`,
    },
    upsell_opportunity: {
      subject: `${institution} — expanding your ${product} footprint`,
      body: `Hi ${firstName},

As a current partner, I wanted to flag an opportunity to extend ${product} into adjacent teams where we're seeing strong outcomes.

Could we schedule 30 minutes with your broader stakeholders?

Best,
[Your name]`,
    },
    customer_success_check_in: {
      subject: `${institution} — quarterly success check-in`,
      body: `Hi ${firstName},

I'd like to schedule our regular success check-in to review adoption, open items, and roadmap alignment.

Do you have 30 minutes in the next two weeks?

Best,
[Your name]`,
    },
    no_action: {
      subject: "",
      body: "",
    },
  };

  const content = hooks[type];
  return {
    channel: "email",
    subject: content.subject,
    body: content.body,
  };
}

export function generateActionId(): string {
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
