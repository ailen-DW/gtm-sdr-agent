import { ACTION_TYPE_LABELS, APPROVAL_REQUIRED_ACTIONS } from "../constants";
import { getProductName } from "../products";
import type {
  AgentInsight,
  Institution,
  RecommendedAction,
} from "../types";
import { formatLabel } from "../utils";

export function buildAgentInsight(
  account: Institution,
  action?: Pick<
    RecommendedAction,
    "type" | "title" | "rationale" | "suggestedProducts" | "priority"
  >
): AgentInsight {
  const whatWeFound: string[] = [];

  if (account.signals.length > 0) {
    account.signals.slice(0, 4).forEach((s) => {
      whatWeFound.push(`${s.title} (${formatLabel(s.category)}, ${s.detectedAt})`);
    });
  } else {
    whatWeFound.push("No recent public signals — profile based on firmographics and sector patterns.");
  }

  account.crmRecords.forEach((r) => {
    whatWeFound.push(`${formatLabel(r.source)}: ${r.summary}`);
  });

  if (account.duplicateRisk) {
    whatWeFound.push(
      `Duplicate risk (${account.duplicateRisk.severity}): ${account.duplicateRisk.message}`
    );
  }

  const topFit = [...account.productFit]
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .filter((f) => f.score >= 55);

  if (topFit.length) {
    whatWeFound.push(
      `Product fit: ${topFit.map((f) => `${getProductName(f.productId)} (${f.score})`).join(", ")}`
    );
  }

  const whyItMatters: string[] = [
    `CRM relationship: ${formatLabel(account.crmRelationship)} — informs tone and urgency.`,
    `Lifecycle stage: ${formatLabel(account.lifecycleStatus)} — determines eligible plays.`,
  ];

  if (account.isStalled) {
    whyItMatters.push("Opportunity is stalled — risk of pipeline decay without multi-threaded follow-up.");
  }
  if (account.followUpDue) {
    whyItMatters.push(`Follow-up date is approaching (${account.followUpDue}) — timing matters for momentum.`);
  }
  if (account.lifecycleStatus === "expansion_opportunity") {
    whyItMatters.push("Existing customer with expansion signals — lower friction than net-new outreach.");
  }
  if (account.duplicateRisk?.severity === "high") {
    whyItMatters.push("Uncoordinated outreach could damage executive relationships and deal ownership.");
  }

  const recommendedAction = action
    ? `${ACTION_TYPE_LABELS[action.type]}: ${action.title}`
    : "Review account intelligence and confirm next step in Action Queue.";

  const humanApprovalRequired: string[] = [];

  if (!action || action.type === "no_action") {
    humanApprovalRequired.push("No outbound action proposed — you may override and request outreach manually.");
  } else if (APPROVAL_REQUIRED_ACTIONS.includes(action.type)) {
    humanApprovalRequired.push(`Approve or reject the recommended ${ACTION_TYPE_LABELS[action.type].toLowerCase()} before any send.`);
    humanApprovalRequired.push("Edit outreach draft if messaging needs adjustment — sends are never automatic.");
    humanApprovalRequired.push("CRM updates (HubSpot tasks, deal stage) require separate approval when integrations are connected.");
  }

  if (account.duplicateRisk && account.duplicateRisk.severity !== "low") {
    humanApprovalRequired.push("Resolve duplicate ownership with AE/SDR before approving outreach.");
  }

  const confidence: AgentInsight["confidence"] =
    account.signals.length >= 2 && topFit.length > 0
      ? "high"
      : account.signals.length >= 1 || account.crmRecords.length > 0
        ? "medium"
        : "low";

  return {
    whatWeFound,
    whyItMatters,
    recommendedAction,
    humanApprovalRequired,
    confidence,
  };
}

export function getAccountIndicators(account: Institution) {
  const isUpsell =
    account.lifecycleStatus === "expansion_opportunity" ||
    (account.crmRelationship === "expansion_candidate" &&
      account.productFit.some(
        (f) => f.score >= 70 && !account.primaryProducts.includes(f.productId)
      ));

  const needsFollowUp = Boolean(account.followUpDue);
  const hasDuplicateRisk =
    account.duplicateRisk && account.duplicateRisk.severity !== "low";

  return { isUpsell, needsFollowUp, hasDuplicateRisk, isStalled: account.isStalled };
}
