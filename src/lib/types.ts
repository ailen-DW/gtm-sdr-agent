/** Product suite for Higher Ed B2B software */
export type ProductId = "orion" | "prism" | "helios" | "atlas" | "omnia";

export type LifecycleStatus =
  | "new_prospect"
  | "researching"
  | "needs_human_review"
  | "ready_for_outreach"
  | "in_sequence"
  | "replied"
  | "meeting_booked"
  | "passed_to_ae"
  | "active_opportunity"
  | "customer"
  | "implementation"
  | "live"
  | "expansion_opportunity"
  | "do_not_contact";

export type CRMRelationship =
  | "cold_prospect"
  | "active_opportunity"
  | "existing_customer"
  | "implementation_account"
  | "dormant_lead"
  | "expansion_candidate";

export type ActionType =
  | "cold_outreach"
  | "re_engagement"
  | "webinar_invitation"
  | "conference_follow_up"
  | "upsell_opportunity"
  | "customer_success_check_in"
  | "no_action";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "edited";

export type IntegrationSource =
  | "hubspot"
  | "clickup"
  | "gmail"
  | "meeting_notes"
  | "internal";

export type SignalCategory =
  | "fraud_concerns"
  | "ai_initiatives"
  | "enrollment_challenges"
  | "financial_aid_issues"
  | "transcript_processing"
  | "rfp"
  | "job_posting"
  | "conference"
  | "leadership_change";

export interface ProductFitScore {
  productId: ProductId;
  score: number; // 0-100
  rationale: string;
}

export interface PublicSignal {
  id: string;
  category: SignalCategory;
  title: string;
  summary: string;
  sourceUrl?: string;
  detectedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  email?: string;
  linkedInUrl?: string;
  isPrimary?: boolean;
}

export interface CRMRecord {
  source: IntegrationSource;
  externalId?: string;
  lastSyncedAt?: string;
  summary: string;
}

export interface DuplicateRisk {
  severity: "low" | "medium" | "high";
  message: string;
  conflictingContacts?: string[];
}

export interface RecommendedAction {
  id: string;
  accountId: string;
  contactId?: string;
  type: ActionType;
  title: string;
  rationale: string;
  priority: "low" | "medium" | "high";
  suggestedProducts: ProductId[];
  approvalStatus: ApprovalStatus;
  createdAt: string;
  dueDate?: string;
  editedDraft?: string;
}

export interface OutreachDraft {
  id: string;
  accountId: string;
  contactId: string;
  channel: "email" | "linkedin";
  subject?: string;
  body: string;
  sequencePosition?: number;
  actionId?: string;
  createdAt: string;
}

export interface ApprovalHistoryEntry {
  id: string;
  actionId: string;
  status: ApprovalStatus;
  reviewerNote?: string;
  timestamp: string;
}

export interface AccountNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export type OutreachEventType =
  | "email_sent"
  | "email_opened"
  | "reply_received"
  | "meeting"
  | "linkedin"
  | "call"
  | "sequence_started"
  | "crm_note";

export interface OutreachTimelineEvent {
  id: string;
  type: OutreachEventType;
  title: string;
  detail?: string;
  actor?: string;
  occurredAt: string;
}

/** Structured AI copilot explanation — never a black box */
export interface AgentInsight {
  whatWeFound: string[];
  whyItMatters: string[];
  recommendedAction: string;
  humanApprovalRequired: string[];
  confidence: "high" | "medium" | "low";
}

export interface Institution {
  id: string;
  name: string;
  type: "university" | "college" | "community_college" | "system";
  location: string;
  enrollment?: number;
  website?: string;
  summary: string;
  lifecycleStatus: LifecycleStatus;
  crmRelationship: CRMRelationship;
  productFit: ProductFitScore[];
  primaryProducts: ProductId[];
  signals: PublicSignal[];
  contacts: Contact[];
  crmRecords: CRMRecord[];
  duplicateRisk?: DuplicateRisk;
  recommendedActionId?: string;
  followUpDue?: string;
  isStalled?: boolean;
  notes: AccountNote[];
  approvalHistory: ApprovalHistoryEntry[];
  hubspotId?: string;
  tags: string[];
}

export interface MarketingInsight {
  id: string;
  type: "objection" | "question" | "confusion" | "trend";
  title: string;
  description: string;
  frequency: number;
  suggestedCampaigns: string[];
  relatedProducts: ProductId[];
}

export interface DashboardMetrics {
  accountsRequiringAttention: number;
  newProspects: number;
  needsReview: number;
  existingCustomers: number;
  duplicateAlerts: number;
  pendingApprovals: number;
  followUpsDue: number;
  stalledOpportunities: number;
  upsellOpportunities: number;
}

export interface IntegrationConfig {
  id: IntegrationSource | "linkedin" | "web_search" | "conferences";
  name: string;
  enabled: boolean;
  status: "connected" | "placeholder" | "disconnected";
  description: string;
}
