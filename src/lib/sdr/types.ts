import type { ProductId } from "../types";

export type DiscoverySource =
  | "LinkedIn"
  | "Higher Ed News"
  | "Conference List"
  | "Article"
  | "Website Activity"
  | "CRM Signal";

export type StakeholderOutreachStatus =
  | "not_contacted"
  | "pending_connection"
  | "connected"
  | "replied"
  | "meeting_booked";

export type LinkedInWorkflowStepStatus =
  | "suggested"
  | "approved"
  | "pending"
  | "accepted"
  | "completed";

export type SdrQueueCategory =
  | "approval"
  | "follow_up"
  | "linkedin"
  | "high_priority"
  | "meeting_prep";

export interface DiscoveryLead {
  id: string;
  institutionName: string;
  location: string;
  whySelected: string;
  buyingSignals: string[];
  discoverySource: DiscoverySource;
  sourceDetail: string;
  confidenceScore: number;
  recommendedProducts: ProductId[];
  accountId?: string;
}

export interface DiscoveredStakeholder {
  id: string;
  name: string;
  title: string;
  department: string;
  linkedInStatus: StakeholderOutreachStatus;
  inHubSpot: boolean;
  hubSpotNote?: string;
  linkedInUrl?: string;
}

export interface LinkedInWorkflowStep {
  id: string;
  label: string;
  status: LinkedInWorkflowStepStatus;
  preview?: string;
  date?: string;
}

export interface CrmValidationCheck {
  id: string;
  label: string;
  result: "clear" | "warning" | "block";
  detail: string;
}

export interface CrmValidation {
  accountId: string;
  checks: CrmValidationCheck[];
  duplicateRisk: boolean;
}

export interface SdrQueueItem {
  id: string;
  category: SdrQueueCategory;
  title: string;
  subtitle: string;
  accountId: string;
  priority: "high" | "medium" | "low";
  href: string;
}

export interface OutreachCadenceStep {
  day: number;
  channel: "email" | "linkedin";
  action: string;
}

export interface OutreachApprovalPackage {
  actionId: string;
  accountId: string;
  emailDraft?: { subject: string; body: string };
  linkedInDraft?: { body: string };
  cadence: OutreachCadenceStep[];
}
