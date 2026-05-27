import type { CustomerJourneyStageId } from "./journey-stages";
import type { JourneyMeetingSummary } from "./journey-stage-types";

/** Realistic mock meeting summaries per lifecycle stage */
export const STAGE_MEETING_SUMMARIES: Record<
  CustomerJourneyStageId,
  JourneyMeetingSummary[]
> = {
  prospect_identified: [],
  research_complete: [
    {
      title: "Internal account planning",
      date: "2026-05-11",
      attendees: "SDR + Manager",
      summary:
        "Aligned on ICP fit and primary product hypothesis. No external meeting yet.",
      source: "ClickUp",
    },
  ],
  outreach_active: [
    {
      title: "Email thread review",
      date: "2026-05-14",
      attendees: "SDR",
      summary:
        "Historical Gmail threads reviewed — last meaningful reply Jan 2025. Re-engagement angle required.",
      source: "Gmail",
    },
  ],
  discovery_scheduled: [
    {
      title: "Discovery call (scheduled)",
      date: "2026-05-28",
      attendees: "VP Enrollment, AE",
      summary:
        "Calendar hold confirmed. Agenda sent — focus on aid verification workflow and peer outcomes.",
      source: "HubSpot",
    },
  ],
  discovery_completed: [
    {
      title: "Discovery call recap",
      date: "2026-05-15",
      attendees: "VP Ops, Director of Admissions, AE",
      summary:
        "Pain validated around manual fraud review and aid cycle pressure. Budget owner likely FinAid + Enrollment joint committee.",
      source: "HubSpot",
    },
  ],
  demo_scheduled: [
    {
      title: "Demo prep sync",
      date: "2026-03-25",
      attendees: "AE, SE",
      summary:
        "Demo storyline tailored to student services automation. Champion confirmed attendance.",
      source: "ClickUp",
    },
  ],
  proposal_sent: [
    {
      title: "Demo follow-up",
      date: "2026-03-28",
      attendees: "VP Student Services, AE",
      summary:
        "Positive reception on Atlas workflow agents. Requested formal proposal for budget committee.",
      source: "HubSpot",
    },
  ],
  security_review: [
    {
      title: "InfoSec kickoff",
      date: "2026-04-12",
      attendees: "CISO delegate, Solutions Consultant",
      summary:
        "SIG questionnaire requested. FERPA-aligned DPA template shared.",
      source: "Gmail",
    },
  ],
  contracting: [
    {
      title: "Procurement alignment",
      date: "2026-04-18",
      attendees: "Procurement, Legal, AE",
      summary:
        "Redlines on liability cap — standard playbook. Target signature by fiscal year end.",
      source: "HubSpot",
    },
  ],
  kickoff: [
    {
      title: "Sales-to-CS handoff",
      date: "2025-11-22",
      attendees: "AE, CSM, Implementation Lead",
      summary:
        "Scope, stakeholders, and success criteria documented for Orion rollout.",
      source: "ClickUp",
    },
  ],
  implementation: [
    {
      title: "Implementation standup",
      date: "2026-05-10",
      attendees: "CIO, CSM, Technical Lead",
      summary:
        "Milestone 3 complete. API credential delay blocking final integration — escalation opened.",
      source: "ClickUp",
    },
  ],
  live_customer: [
    {
      title: "QBR — adoption review",
      date: "2026-03-01",
      attendees: "VP Enrollment, CSM",
      summary:
        "Adoption at 82% of licensed users. Customer willing to be reference for Orion fraud use case.",
      source: "HubSpot",
    },
  ],
  expansion_opportunity: [
    {
      title: "Expansion discovery",
      date: "2026-05-18",
      attendees: "VP Student Success, AE",
      summary:
        "Interest in Atlas for student services automation. Prism team satisfied — separate buying center.",
      source: "HubSpot",
    },
  ],
  renewal_risk: [],
};
