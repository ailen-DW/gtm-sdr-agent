/** Type-only lifecycle definitions (no runtime exports — safe for mixed client/server graphs). */

export type SourceSystem =
  | "HubSpot"
  | "ClickUp"
  | "Gmail"
  | "LinkedIn"
  | "Calendar"
  | "Basecamp";

export type ActionPriority = "high" | "medium" | "low";

export type RiskCategory =
  | "missing_stakeholders"
  | "delayed_response"
  | "security_concerns"
  | "duplicate_risk"
  | "other";

export interface StageAiInsight {
  whyItMatters: string;
  signalsDetected: string[];
  confidenceScore: number;
}

export interface StageRecommendedAction {
  id: string;
  label: string;
  priority: ActionPriority;
}

export interface StageRiskBlocker {
  category: RiskCategory;
  title: string;
  description: string;
  severity: ActionPriority;
}

export interface ActivitySnippet {
  summary: string;
  date?: string;
  source: SourceSystem;
}

export interface StageRelatedActivity {
  lastMeeting?: ActivitySnippet;
  lastEmail?: ActivitySnippet;
  lastLinkedIn?: ActivitySnippet;
  lastCrmUpdate?: ActivitySnippet;
}

export interface JourneyMeetingSummary {
  title: string;
  date?: string;
  attendees?: string;
  summary: string;
  source: SourceSystem;
}

export interface JourneySourceReference {
  system: SourceSystem;
  reference: string;
  lastSynced?: string;
  note: string;
}

export interface JourneyActivity {
  timestamp: string;
  event: string;
  actor?: string;
  source?: SourceSystem;
}

export interface OperationalTask {
  id: string;
  label: string;
  status: "pending" | "in_progress" | "done";
  assignee?: string;
}

export interface StageDocument {
  title: string;
  system: SourceSystem;
  reference: string;
}

export interface StageIntelligenceBundle {
  aiInsight: StageAiInsight;
  recommendedActions: StageRecommendedAction[];
  risks: StageRiskBlocker[];
  relatedActivity: StageRelatedActivity;
  sourceBadges: SourceSystem[];
}
