import type {
  JourneyActivity,
  JourneyMeetingSummary,
  JourneySourceReference,
  StageAiInsight,
  StageRecommendedAction,
  StageRelatedActivity,
  SourceSystem,
  StageRiskBlocker,
} from "./journey-stage-types";

export type {
  ActionPriority,
  ActivitySnippet,
  JourneyActivity,
  JourneyMeetingSummary,
  JourneySourceReference,
  RiskCategory,
  SourceSystem,
  StageAiInsight,
  StageIntelligenceBundle,
  StageRecommendedAction,
  StageRelatedActivity,
  StageRiskBlocker,
} from "./journey-stage-types";

export const CUSTOMER_JOURNEY_STAGES = [
  { id: "prospect_identified", label: "Prospect Identified", short: "Identified" },
  { id: "research_complete", label: "Research Complete", short: "Research" },
  { id: "outreach_active", label: "Outreach Active", short: "Outreach" },
  { id: "discovery_scheduled", label: "Discovery Scheduled", short: "Discovery" },
  { id: "discovery_completed", label: "Discovery Completed", short: "Disc. done" },
  { id: "demo_scheduled", label: "Demo Scheduled", short: "Demo" },
  { id: "proposal_sent", label: "Proposal Sent", short: "Proposal" },
  { id: "security_review", label: "Security Review", short: "Security" },
  { id: "contracting", label: "Contracting", short: "Contract" },
  { id: "kickoff", label: "Kickoff", short: "Kickoff" },
  { id: "implementation", label: "Implementation", short: "Implement" },
  { id: "live_customer", label: "Live Customer", short: "Live" },
  { id: "expansion_opportunity", label: "Expansion Opportunity", short: "Expansion" },
  { id: "renewal_risk", label: "Renewal Risk", short: "Renewal" },
] as const;

export type CustomerJourneyStageId =
  (typeof CUSTOMER_JOURNEY_STAGES)[number]["id"];

/** completed | current | upcoming (+ at_risk flags current stage needing attention) */
export type JourneyStageStatus =
  | "completed"
  | "current"
  | "upcoming"
  | "at_risk";

export interface CustomerJourneyStageDetail {
  stageId: CustomerJourneyStageId;
  label: string;
  status: JourneyStageStatus;
  summary: string;
  owner: string;
  ownerRole: string;
  /** Accountable team/function for this stage */
  responsibleOwner: string;
  /** Headline action for the accountable owner */
  nextOwnerAction: string;
  aiInsight: StageAiInsight;
  recommendedActions: StageRecommendedAction[];
  risks: StageRiskBlocker[];
  relatedActivity: StageRelatedActivity;
  sourceBadges: SourceSystem[];
  meetingSummaries: JourneyMeetingSummary[];
  sourceReferences: JourneySourceReference[];
  activityHistory: JourneyActivity[];
  completedAt?: string;
}

export interface AccountJourneyState {
  accountId: string;
  currentStageId: CustomerJourneyStageId;
  stages: CustomerJourneyStageDetail[];
}

export function getStageLabel(id: CustomerJourneyStageId): string {
  return CUSTOMER_JOURNEY_STAGES.find((s) => s.id === id)?.label ?? id;
}

export function isStageComplete(status: JourneyStageStatus): boolean {
  return status === "completed";
}

export function isStageCurrent(status: JourneyStageStatus): boolean {
  return status === "current" || status === "at_risk";
}
