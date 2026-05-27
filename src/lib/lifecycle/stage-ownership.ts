import type { CustomerJourneyStageId } from "./journey-stages";

export interface StageOwnership {
  /** Team/function accountable for this stage (e.g. SDR, AE) */
  responsibleOwner: string;
  /** Single headline action for the accountable owner */
  nextOwnerAction: string;
}

/** Mock accountable owner + next action per lifecycle stage */
export const STAGE_OWNERSHIP: Record<CustomerJourneyStageId, StageOwnership> = {
  prospect_identified: {
    responsibleOwner: "SDR",
    nextOwnerAction: "Qualify account and assign research owner",
  },
  research_complete: {
    responsibleOwner: "SDR",
    nextOwnerAction: "Complete account research checklist",
  },
  outreach_active: {
    responsibleOwner: "SDR",
    nextOwnerAction: "Approve outreach draft",
  },
  discovery_scheduled: {
    responsibleOwner: "AE",
    nextOwnerAction: "Review meeting prep",
  },
  discovery_completed: {
    responsibleOwner: "AE",
    nextOwnerAction: "Send discovery recap and schedule demo",
  },
  demo_scheduled: {
    responsibleOwner: "AE",
    nextOwnerAction: "Confirm demo attendees and environment",
  },
  proposal_sent: {
    responsibleOwner: "Sales + Leadership",
    nextOwnerAction: "Follow up on proposal",
  },
  security_review: {
    responsibleOwner: "Solutions + Legal",
    nextOwnerAction: "Track security questionnaire turnaround",
  },
  contracting: {
    responsibleOwner: "Sales + Legal",
    nextOwnerAction: "Resolve contract redlines",
  },
  kickoff: {
    responsibleOwner: "Implementation Team",
    nextOwnerAction: "Confirm kickoff attendees and timeline",
  },
  implementation: {
    responsibleOwner: "Implementation Team",
    nextOwnerAction: "Review onboarding progress",
  },
  live_customer: {
    responsibleOwner: "Customer Success",
    nextOwnerAction: "Prepare quarterly business review",
  },
  expansion_opportunity: {
    responsibleOwner: "AE + Customer Success",
    nextOwnerAction: "Coordinate expansion discovery with CS",
  },
  renewal_risk: {
    responsibleOwner: "Customer Success",
    nextOwnerAction: "Review renewal health and sponsorship",
  },
};
