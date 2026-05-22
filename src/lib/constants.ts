import type { ActionType, LifecycleStatus } from "./types";

export const LIFECYCLE_LABELS: Record<LifecycleStatus, string> = {
  new_prospect: "New Prospect",
  researching: "Researching",
  needs_human_review: "Needs Human Review",
  ready_for_outreach: "Ready for Outreach",
  in_sequence: "In Sequence",
  replied: "Replied",
  meeting_booked: "Meeting Booked",
  passed_to_ae: "Passed to AE",
  active_opportunity: "Active Opportunity",
  customer: "Customer",
  implementation: "Implementation",
  live: "Live",
  expansion_opportunity: "Expansion Opportunity",
  do_not_contact: "Do Not Contact",
};

/** Ordered stages for the lifecycle stepper (prospect → customer journey) */
export const LIFECYCLE_PIPELINE: LifecycleStatus[] = [
  "new_prospect",
  "researching",
  "needs_human_review",
  "ready_for_outreach",
  "in_sequence",
  "replied",
  "meeting_booked",
  "passed_to_ae",
  "active_opportunity",
  "customer",
  "implementation",
  "live",
  "expansion_opportunity",
];

export const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  cold_outreach: "Cold outreach",
  re_engagement: "Re-engagement",
  webinar_invitation: "Webinar invitation",
  conference_follow_up: "Conference follow-up",
  upsell_opportunity: "Upsell opportunity",
  customer_success_check_in: "Customer success check-in",
  no_action: "Wait / monitor",
};

export const APPROVAL_REQUIRED_ACTIONS: ActionType[] = [
  "cold_outreach",
  "re_engagement",
  "webinar_invitation",
  "conference_follow_up",
  "upsell_opportunity",
  "customer_success_check_in",
];
