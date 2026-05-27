import type { CustomerJourneyStageDetail, CustomerJourneyStageId } from "./journey-stages";

type StageTemplate = Omit<
  CustomerJourneyStageDetail,
  | "stageId"
  | "label"
  | "status"
  | "completedAt"
  | "meetingSummaries"
  | "aiInsight"
  | "recommendedActions"
  | "risks"
  | "relatedActivity"
  | "sourceBadges"
  | "responsibleOwner"
  | "nextOwnerAction"
  | "pendingClientActions"
  | "internalTasks"
  | "relatedDocuments"
>;

export const STAGE_TEMPLATES: Record<CustomerJourneyStageId, StageTemplate> = {
  prospect_identified: {
    summary:
      "Institution added to target list from discovery scan or inbound interest. Firmographics and initial signals captured.",
    owner: "Jordan Lee",
    ownerRole: "SDR",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Company record",
        lastSynced: "2026-05-08",
        note: "Net-new company — tier tag pending",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-08",
        event: "Prospect identified via web signal scan",
        actor: "Agent",
        source: "HubSpot",
      },
    ],
  },
  research_complete: {
    summary:
      "Account research finished: contacts, signals, product fit, and cross-system checks documented.",
    owner: "Jordan Lee",
    ownerRole: "SDR",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Contact timeline",
        lastSynced: "2026-05-12",
        note: "Last meaningful activity >90 days ago",
      },
      {
        system: "Gmail",
        reference: "Thread search",
        lastSynced: "2026-05-12",
        note: "3 historical threads indexed",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-12",
        event: "Research marked complete",
        actor: "Jordan Lee",
        source: "ClickUp",
      },
    ],
  },
  outreach_active: {
    summary:
      "Active outbound sequence or manual touches in progress. Awaiting reply or meeting acceptance.",
    owner: "Jordan Lee",
    ownerRole: "SDR",
    sourceReferences: [
      {
        system: "Gmail",
        reference: "Outreach draft",
        lastSynced: "2026-05-21",
        note: "Pending human approval — not sent",
      },
      {
        system: "HubSpot",
        reference: "Sequence enrollment",
        lastSynced: "2026-05-20",
        note: "Step 1 queued after approval",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-20",
        event: "Outreach draft generated",
        actor: "Agent",
      },
      { timestamp: "2026-05-21", event: "Awaiting approval", actor: "You" },
    ],
  },
  discovery_scheduled: {
    summary:
      "Discovery call on calendar with at least one economic or technical stakeholder.",
    owner: "Sam Rivera",
    ownerRole: "AE",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Meeting activity",
        lastSynced: "2026-05-19",
        note: "Calendar invite sent",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-19",
        event: "Discovery scheduled",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
    ],
  },
  discovery_completed: {
    summary:
      "Discovery held; pain, timeline, and buying process documented. Next step agreed.",
    owner: "Sam Rivera",
    ownerRole: "AE",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Discovery notes",
        lastSynced: "2026-05-15",
        note: "Pain + timeline captured on deal record",
      },
      {
        system: "Gmail",
        reference: "Recap email",
        note: "Sent to champion post-call",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-15",
        event: "Discovery completed",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
    ],
  },
  demo_scheduled: {
    summary: "Product demo scheduled with technical and business attendees.",
    owner: "Sam Rivera",
    ownerRole: "AE",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Deal stage: Demo",
        lastSynced: "2026-03-20",
        note: "Amount and close date on file",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-03-20",
        event: "Demo scheduled",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
    ],
  },
  proposal_sent: {
    summary:
      "Commercial proposal delivered; pricing and scope under evaluation.",
    owner: "Sam Rivera",
    ownerRole: "AE",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Deal: Proposal",
        lastSynced: "2026-05-01",
        note: "$120k Atlas — proposal stage",
      },
      {
        system: "Gmail",
        reference: "Proposal thread",
        lastSynced: "2026-05-18",
        note: "Opened, no reply 45 days",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-04-01",
        event: "Proposal sent",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
      {
        timestamp: "2026-05-01",
        event: "Close date pushed",
        actor: "HubSpot",
        source: "HubSpot",
      },
    ],
  },
  security_review: {
    summary:
      "InfoSec and data privacy review in progress (questionnaires, architecture review).",
    owner: "Alex Morgan",
    ownerRole: "Solutions Consultant",
    sourceReferences: [
      {
        system: "ClickUp",
        reference: "SIG Lite task",
        lastSynced: "2026-04-12",
        note: "Questionnaire in progress",
      },
      {
        system: "Gmail",
        reference: "InfoSec thread",
        note: "DPA template delivered",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-04-10",
        event: "Security review initiated",
        actor: "Alex Morgan",
        source: "ClickUp",
      },
    ],
  },
  contracting: {
    summary: "MSA, order form, and procurement redlines in negotiation.",
    owner: "Sam Rivera",
    ownerRole: "AE",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Deal stage: Contract",
        lastSynced: "2026-04-15",
        note: "Forecast commit this quarter",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-04-15",
        event: "Contract sent to legal",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
    ],
  },
  kickoff: {
    summary:
      "Deal closed; customer kickoff scheduled with CS and implementation lead.",
    owner: "Taylor Brooks",
    ownerRole: "Customer Success",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Closed-won",
        lastSynced: "2025-11-20",
        note: "Orion — primary SKU",
      },
      {
        system: "ClickUp",
        reference: "CS onboarding template",
        lastSynced: "2025-11-22",
        note: "Project creation pending",
      },
    ],
    activityHistory: [
      {
        timestamp: "2025-11-20",
        event: "Deal closed won",
        actor: "Sam Rivera",
        source: "HubSpot",
      },
    ],
  },
  implementation: {
    summary:
      "Product rollout in progress; milestones tracked in ClickUp and CS cadence.",
    owner: "Taylor Brooks",
    ownerRole: "Customer Success",
    sourceReferences: [
      {
        system: "ClickUp",
        reference: "Implementation project",
        lastSynced: "2026-05-10",
        note: "78% complete — 2 open tasks",
      },
      {
        system: "HubSpot",
        reference: "Customer record",
        lastSynced: "2026-05-10",
        note: "Orion active — health green",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-02-01",
        event: "Implementation started",
        actor: "Taylor Brooks",
        source: "ClickUp",
      },
      {
        timestamp: "2026-05-10",
        event: "Milestone 3 completed",
        actor: "CS Team",
        source: "ClickUp",
      },
    ],
  },
  live_customer: {
    summary:
      "Production usage live; value realization and health monitoring active.",
    owner: "Taylor Brooks",
    ownerRole: "Customer Success",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Customer health score",
        lastSynced: "2026-05-01",
        note: "Green — adoption 82%",
      },
    ],
    activityHistory: [
      {
        timestamp: "2025-12-15",
        event: "Went live",
        actor: "Taylor Brooks",
        source: "HubSpot",
      },
    ],
  },
  expansion_opportunity: {
    summary:
      "Whitespace identified for additional products or campus expansion.",
    owner: "Sam Rivera",
    ownerRole: "AE (Expansion)",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Expansion deal",
        lastSynced: "2026-05-17",
        note: "Atlas — early stage",
      },
      {
        system: "ClickUp",
        reference: "Adoption report",
        lastSynced: "2026-05-15",
        note: "Prism NPS 9",
      },
    ],
    activityHistory: [
      {
        timestamp: "2026-05-17",
        event: "Expansion signal detected",
        actor: "Agent",
        source: "HubSpot",
      },
    ],
  },
  renewal_risk: {
    summary:
      "Monitor renewal health — intervention playbook ready if adoption or sponsorship drops.",
    owner: "Taylor Brooks",
    ownerRole: "Customer Success",
    sourceReferences: [
      {
        system: "HubSpot",
        reference: "Renewal forecast",
        lastSynced: "2026-05-01",
        note: "Not at risk — monitor only",
      },
    ],
    activityHistory: [],
  },
};
