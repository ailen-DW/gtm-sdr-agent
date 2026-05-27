"use client";

import type { Institution } from "../types";
import { STAGE_MEETING_SUMMARIES } from "./meeting-summaries";
import { STAGE_INTELLIGENCE } from "./stage-intelligence";
import { STAGE_OWNERSHIP } from "./stage-ownership";
import { STAGE_TEMPLATES } from "./stage-templates";
import {
  CUSTOMER_JOURNEY_STAGES,
  type AccountJourneyState,
  type CustomerJourneyStageDetail,
  type CustomerJourneyStageId,
  type JourneyStageStatus,
  type SourceSystem,
  type StageRiskBlocker,
} from "./journey-stages";

const ACCOUNT_CURRENT_STAGE: Record<string, CustomerJourneyStageId> = {
  acc_001: "outreach_active",
  acc_002: "research_complete",
  acc_003: "implementation",
  acc_004: "proposal_sent",
  acc_005: "discovery_scheduled",
  acc_006: "expansion_opportunity",
};

function mergeSourceBadges(
  badges: SourceSystem[],
  refs: { system: SourceSystem }[]
): SourceSystem[] {
  const set = new Set<SourceSystem>([...badges, ...refs.map((r) => r.system)]);
  return Array.from(set);
}

function personalize(
  account: Institution,
  stageId: CustomerJourneyStageId,
  base: CustomerJourneyStageDetail
): CustomerJourneyStageDetail {
  const contact = account.contacts.find((c) => c.isPrimary);
  const copy: CustomerJourneyStageDetail = {
    ...base,
    meetingSummaries: [...base.meetingSummaries],
    sourceReferences: [...base.sourceReferences],
    risks: [...base.risks],
    recommendedActions: base.recommendedActions.map((a) => ({ ...a })),
    aiInsight: { ...base.aiInsight, signalsDetected: [...base.aiInsight.signalsDetected] },
    relatedActivity: { ...base.relatedActivity },
    sourceBadges: [...base.sourceBadges],
  };

  if (stageId === "outreach_active" && account.id === "acc_001") {
    copy.summary = `Outbound in progress for ${account.name}. Aid audit + AI roadmap signals inform Orion/Helios messaging.`;
    copy.aiInsight = {
      whyItMatters:
        "State-level aid audit creates urgency — Orion messaging should lead before Helios expansion talk.",
      signalsDetected: [
        "State audit on aid verification — Orion outcomes angle",
        "Board AI roadmap minutes — Helios only if IT engaged",
        "Outreach draft pending your approval",
      ],
      confidenceScore: 87,
    };
    copy.relatedActivity = {
      ...copy.relatedActivity,
      lastEmail: {
        summary: "Personalized Orion draft ready — not sent until approved",
        date: "2026-05-21",
        source: "Gmail",
      },
    };
    copy.meetingSummaries.push({
      title: "Signal review (internal)",
      date: "2026-05-18",
      summary:
        "Agent correlated state audit news with board AI minutes — Orion primary, Helios secondary.",
      source: "ClickUp",
    });
  }

  if (stageId === "proposal_sent" && account.id === "acc_004") {
    copy.status = "at_risk";
    copy.summary = `Proposal with ${account.name} stalled 45 days post-demo; budget committee is the stated blocker.`;
    copy.risks = [
      {
        category: "delayed_response",
        title: "No executive response",
        description: "Champion opened proposal; no reply since 2026-04-12.",
        severity: "high",
      },
      {
        category: "missing_stakeholders",
        title: "Budget committee not mapped",
        description:
          "Monthly committee cadence — next window uncertain; CFO not on thread.",
        severity: "high",
      },
    ];
    copy.aiInsight.confidenceScore = 68;
    copy.relatedActivity = {
      lastMeeting: {
        summary:
          "Stall check-in — champion declined reschedule; budget committee delay cited",
        date: "2026-05-10",
        source: "Calendar",
      },
      lastEmail: {
        summary: "Proposal opened, no reply — 45 days idle",
        date: "2026-05-18",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Close date pushed — deal flagged at risk",
        date: "2026-05-01",
        source: "HubSpot",
      },
    };
    copy.meetingSummaries = [
      {
        title: "EDUCAUSE booth conversation",
        date: "2026-04-05",
        attendees: "VP Student Services, AE",
        summary:
          "Strong interest in Atlas workflow agents. Requested formal proposal for April budget review.",
        source: "HubSpot",
      },
      {
        title: "Stall check-in (no show)",
        date: "2026-05-10",
        attendees: "AE",
        summary:
          "Champion declined reschedule — cited budget committee delay. Gmail thread shows opened proposal, no reply.",
        source: "Gmail",
      },
    ];
  }

  if (stageId === "discovery_scheduled" && account.id === "acc_005") {
    copy.status = "at_risk";
    copy.risks = [
      {
        category: "duplicate_risk",
        title: "Unsynced executive outreach",
        description:
          "AE Tom sent chancellor intro 2026-05-19 without SDR sync — hold additional touches.",
        severity: "high",
      },
      {
        category: "missing_stakeholders",
        title: "Ownership unresolved",
        description: "Two AEs on thread — internal sync required before next touch.",
        severity: "high",
      },
    ];
    copy.recommendedActions = [
      {
        id: "acc5-ds-1",
        label: "Internal sync with both AEs before next touch",
        priority: "high",
      },
      {
        id: "acc5-ds-2",
        label: "Single owner for chancellor-level thread",
        priority: "high",
      },
      {
        id: "acc5-ds-3",
        label: "Confirm discovery still on calendar",
        priority: "medium",
      },
    ];
    copy.meetingSummaries.push({
      title: "Executive intro (unsynced)",
      date: "2026-05-19",
      attendees: "Chancellor, AE Tom",
      summary:
        "Gmail shows executive intro sent without SDR coordination — risk of duplicate narrative.",
      source: "Gmail",
    });
    copy.relatedActivity = {
      ...copy.relatedActivity,
      lastEmail: {
        summary: "Executive intro sent by AE Tom — not coordinated with SDR",
        date: "2026-05-19",
        source: "Gmail",
      },
    };
  }

  if (stageId === "implementation" && account.id === "acc_003") {
    copy.summary = `${account.name} implementing Orion; Helios expansion RFP indicates phase-2 opportunity.`;
    copy.aiInsight.signalsDetected = [
      "Illuminate migration language in RFP",
      "API credential delay — 12 days open",
      "Helios AE intro after milestone 4",
    ];
    if (contact) {
      copy.meetingSummaries.push({
        title: `CIO check-in — ${contact.name}`,
        date: "2026-05-30",
        attendees: contact.name,
        summary:
          "Scheduled to review API credential blocker and Helios roadmap alignment.",
        source: "HubSpot",
      });
      copy.relatedActivity.lastMeeting = {
        summary: `CIO check-in scheduled with ${contact.name} — API + Helios roadmap`,
        date: "2026-05-30",
        source: "Calendar",
      };
    }
  }

  if (stageId === "expansion_opportunity" && account.id === "acc_006") {
    copy.summary = `Live Prism customer; Atlas expansion supported by student services hiring signal.`;
    copy.owner = contact?.name ?? copy.owner;
    copy.ownerRole = "VP Student Success (champion) + AE";
    copy.aiInsight.confidenceScore = 85;
  }

  if (account.duplicateRisk && stageId === "outreach_active") {
    const dupRisk: StageRiskBlocker = {
      category: "duplicate_risk",
      title: "Duplicate ownership flagged",
      description: account.duplicateRisk.message,
      severity:
        account.duplicateRisk.severity === "high"
          ? "high"
          : account.duplicateRisk.severity === "medium"
            ? "medium"
            : "low",
    };
    if (!copy.risks.some((r) => r.category === "duplicate_risk")) {
      copy.risks.push(dupRisk);
    }
  }

  account.crmRecords.forEach((r) => {
    const system =
      r.source === "hubspot"
        ? "HubSpot"
        : r.source === "clickup"
          ? "ClickUp"
          : r.source === "gmail"
            ? "Gmail"
            : null;
    if (system) {
      if (!copy.sourceReferences.some((ref) => ref.system === system)) {
        copy.sourceReferences.push({
          system,
          reference: r.externalId ?? "Synced record",
          lastSynced: r.lastSyncedAt,
          note: r.summary,
        });
      }
      if (!copy.sourceBadges.includes(system)) {
        copy.sourceBadges.push(system);
      }
    }
  });

  copy.sourceBadges = mergeSourceBadges(copy.sourceBadges, copy.sourceReferences);

  return copy;
}

function resolveStatus(
  stageIndex: number,
  currentIndex: number,
  stageId: CustomerJourneyStageId,
  account: Institution
): JourneyStageStatus {
  if (stageId === "renewal_risk" && stageIndex > currentIndex) {
    return "upcoming";
  }
  if (stageIndex < currentIndex) return "completed";
  if (stageIndex === currentIndex) {
    if (account.isStalled && stageId === "proposal_sent") return "at_risk";
    if (
      account.duplicateRisk?.severity === "high" &&
      stageId === "discovery_scheduled"
    ) {
      return "at_risk";
    }
    return "current";
  }
  return "upcoming";
}

export function getAccountJourney(account: Institution): AccountJourneyState {
  const currentStageId =
    ACCOUNT_CURRENT_STAGE[account.id] ?? "prospect_identified";
  const currentIndex = CUSTOMER_JOURNEY_STAGES.findIndex(
    (s) => s.id === currentStageId
  );

  const stages: CustomerJourneyStageDetail[] = CUSTOMER_JOURNEY_STAGES.map(
    (def, index) => {
      const template = STAGE_TEMPLATES[def.id];
      const intelligence = STAGE_INTELLIGENCE[def.id];
      const ownership = STAGE_OWNERSHIP[def.id];
      const status = resolveStatus(index, currentIndex, def.id, account);
      const base: CustomerJourneyStageDetail = {
        stageId: def.id,
        label: def.label,
        status,
        ...template,
        ...intelligence,
        ...ownership,
        meetingSummaries: STAGE_MEETING_SUMMARIES[def.id] ?? [],
        completedAt:
          status === "completed"
            ? `2026-${String(Math.min(index + 1, 12)).padStart(2, "0")}-15`
            : undefined,
      };
      return personalize(account, def.id, base);
    }
  );

  return {
    accountId: account.id,
    currentStageId,
    stages,
  };
}
