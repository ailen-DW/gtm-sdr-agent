"use client";

import type { CustomerJourneyStageId } from "./journey-stages";
import type { StageIntelligenceBundle } from "./journey-stage-types";

export const STAGE_INTELLIGENCE: Record<
  CustomerJourneyStageId,
  StageIntelligenceBundle
> = {
  prospect_identified: {
    aiInsight: {
      whyItMatters:
        "Early qualification prevents wasted outreach and protects territory hygiene before sequences start.",
      signalsDetected: [
        "ICP tier match — public university, 8k+ enrollment",
        "Inbound web form + EDUCAUSE list overlap",
        "Orion fit score 82 from agent scan",
      ],
      confidenceScore: 78,
    },
    recommendedActions: [
      {
        id: "pi-1",
        label: "Validate economic buyer in HubSpot org chart",
        priority: "high",
      },
      {
        id: "pi-2",
        label: "Assign research owner with 48h SLA",
        priority: "high",
      },
      {
        id: "pi-3",
        label: "Tag primary product SKU before first touch",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "No named economic buyer",
        description:
          "Only general admissions inbox identified — map VP FinAid or CIO before outreach.",
        severity: "high",
      },
    ],
    relatedActivity: {
      lastCrmUpdate: {
        summary: "Company created — tier tag pending review",
        date: "2026-05-08",
        source: "HubSpot",
      },
      lastLinkedIn: {
        summary: "VP Enrollment viewed company page (no connection yet)",
        date: "2026-05-07",
        source: "LinkedIn",
      },
    },
    sourceBadges: ["HubSpot", "LinkedIn"],
  },
  research_complete: {
    aiInsight: {
      whyItMatters:
        "Complete research de-risks personalization and surfaces duplicate ownership before sequences fire.",
      signalsDetected: [
        "RFP / audit language in public filings",
        "3 historical Gmail threads — last reply >90 days",
        "No active duplicate owner in HubSpot",
      ],
      confidenceScore: 84,
    },
    recommendedActions: [
      {
        id: "rc-1",
        label: "Route to human review if duplicate risk ≥ medium",
        priority: "high",
      },
      {
        id: "rc-2",
        label: "Draft outreach angle tied to top product fit",
        priority: "high",
      },
      {
        id: "rc-3",
        label: "Log research checklist complete in ClickUp",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "delayed_response",
        title: "Dormant CRM history",
        description:
          "Last meaningful HubSpot activity >90 days — re-engagement narrative required.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Internal account planning — ICP fit and Orion hypothesis aligned",
        date: "2026-05-11",
        source: "ClickUp",
      },
      lastEmail: {
        summary: "Thread search indexed 3 historical conversations",
        date: "2026-05-12",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Contact timeline enriched — research task closed",
        date: "2026-05-12",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "Gmail", "ClickUp"],
  },
  outreach_active: {
    aiInsight: {
      whyItMatters:
        "Timely, signal-based outreach improves reply rates and avoids generic check-ins that stall pipeline.",
      signalsDetected: [
        "State aid audit news — Orion angle validated",
        "Outreach draft pending approval (not sent)",
        "Sequence step 1 queued post-approval",
      ],
      confidenceScore: 81,
    },
    recommendedActions: [
      {
        id: "oa-1",
        label: "Approve email draft in Action Queue",
        priority: "high",
      },
      {
        id: "oa-2",
        label: "Multi-thread to FinAid if Orion fit is high",
        priority: "medium",
      },
      {
        id: "oa-3",
        label: "Schedule 5-day no-reply follow-up",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "duplicate_risk",
        title: "Competing AE outreach",
        description:
          "Another rep may be active on parent system — confirm ownership before send.",
        severity: "medium",
      },
      {
        category: "delayed_response",
        title: "Prior thread dormant",
        description:
          "Last reply Jan 2025 — subject line must reference new public signal.",
        severity: "low",
      },
    ],
    relatedActivity: {
      lastEmail: {
        summary:
          "Draft generated — awaiting human approval (not sent to prospect)",
        date: "2026-05-21",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Sequence enrollment staged — step 1 after approval",
        date: "2026-05-20",
        source: "HubSpot",
      },
      lastLinkedIn: {
        summary: "Connection request queued for VP Enrollment",
        date: "2026-05-19",
        source: "LinkedIn",
      },
    },
    sourceBadges: ["HubSpot", "Gmail", "LinkedIn", "ClickUp"],
  },
  discovery_scheduled: {
    aiInsight: {
      whyItMatters:
        "Discovery quality sets MEDDICC accuracy and reduces demo no-shows by aligning stakeholders early.",
      signalsDetected: [
        "Calendar hold confirmed with VP Enrollment",
        "Agenda sent 24h ahead",
        "Technical validator not yet invited",
      ],
      confidenceScore: 76,
    },
    recommendedActions: [
      {
        id: "ds-1",
        label: "Send agenda + customer story 24h before call",
        priority: "high",
      },
      {
        id: "ds-2",
        label: "Add IT / implementation stakeholder to invite",
        priority: "high",
      },
      {
        id: "ds-3",
        label: "Log discovery template in HubSpot",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "Technical validator missing",
        description:
          "Only business attendee confirmed — invite CIO delegate for Helios path.",
        severity: "medium",
      },
      {
        category: "delayed_response",
        title: "Executive calendar slip risk",
        description: "Confirm attendance 24h prior — reschedule playbook ready.",
        severity: "low",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Discovery call scheduled — aid verification workflow on agenda",
        date: "2026-05-28",
        source: "Calendar",
      },
      lastCrmUpdate: {
        summary: "Meeting activity logged — calendar invite sent",
        date: "2026-05-19",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "Calendar", "Gmail"],
  },
  discovery_completed: {
    aiInsight: {
      whyItMatters:
        "Documented pain and buying process unlock accurate demo scoping and mutual action plans.",
      signalsDetected: [
        "Manual fraud review pain validated",
        "Joint FinAid + Enrollment budget committee",
        "Demo next step verbally agreed",
      ],
      confidenceScore: 88,
    },
    recommendedActions: [
      {
        id: "dc-1",
        label: "Schedule demo with technical validator present",
        priority: "high",
      },
      {
        id: "dc-2",
        label: "Summarize MEDDICC in HubSpot within 24h",
        priority: "high",
      },
      {
        id: "dc-3",
        label: "Draft mutual action plan for champion review",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "Budget owner unclear",
        description:
          "Fiscal year constraints not confirmed — validate committee timeline.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Discovery recap — fraud review pain, joint committee as budget owner",
        date: "2026-05-15",
        source: "HubSpot",
      },
      lastEmail: {
        summary: "Recap email sent to champion post-call",
        date: "2026-05-15",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Discovery notes saved on deal record",
        date: "2026-05-15",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "Gmail", "Calendar"],
  },
  demo_scheduled: {
    aiInsight: {
      whyItMatters:
        "A tailored demo with the right attendees accelerates technical validation and proposal timing.",
      signalsDetected: [
        "Demo storyline aligned to top 2 SKUs",
        "SE allocated — environment ready",
        "Champion confirmed attendance",
      ],
      confidenceScore: 79,
    },
    recommendedActions: [
      {
        id: "dm-1",
        label: "Confirm SE allocation and demo tenant",
        priority: "high",
      },
      {
        id: "dm-2",
        label: "Send pre-demo questionnaire to champion",
        priority: "medium",
      },
      {
        id: "dm-3",
        label: "Prepare competitor battlecard if named",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "Stakeholder no-show risk",
        description: "Only one attendee confirmed — secure 2+ roles on calendar.",
        severity: "high",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Demo prep sync — student services storyline; calendar hold confirmed",
        date: "2026-03-28",
        source: "Calendar",
      },
      lastCrmUpdate: {
        summary: "Deal moved to Demo — amount and close date on file",
        date: "2026-03-20",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "ClickUp", "Calendar"],
  },
  proposal_sent: {
    aiInsight: {
      whyItMatters:
        "Post-proposal momentum determines close rate; stalled deals need executive alignment and blocker triage.",
      signalsDetected: [
        "Proposal opened — no reply 45 days",
        "Close date pushed twice in HubSpot",
        "Budget committee cited as blocker",
      ],
      confidenceScore: 72,
    },
    recommendedActions: [
      {
        id: "ps-1",
        label: "Executive alignment call if no reply in 14 days",
        priority: "high",
      },
      {
        id: "ps-2",
        label: "Offer phased rollout if budget constrained",
        priority: "medium",
      },
      {
        id: "ps-3",
        label: "Confirm legal / procurement timeline",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "delayed_response",
        title: "No executive response",
        description:
          "Champion opened proposal but no reply since 2026-04-12 — budget committee delay.",
        severity: "high",
      },
      {
        category: "missing_stakeholders",
        title: "Economic buyer not engaged",
        description:
          "VP Student Services engaged; CFO / procurement not on thread.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Demo follow-up — strong Atlas interest; formal proposal requested",
        date: "2026-03-28",
        source: "HubSpot",
      },
      lastEmail: {
        summary: "Proposal thread opened, no reply — 45 days idle",
        date: "2026-05-18",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Deal stage Proposal — close date pushed to Q3",
        date: "2026-05-01",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "Gmail", "Calendar"],
  },
  security_review: {
    aiInsight: {
      whyItMatters:
        "Security clearance is often the longest pole; proactive DPA/SIG handling prevents quarter slip.",
      signalsDetected: [
        "SIG Lite questionnaire in progress",
        "FERPA-aligned DPA template delivered",
        "InfoSec kickoff held",
      ],
      confidenceScore: 85,
    },
    recommendedActions: [
      {
        id: "sr-1",
        label: "Track SIG questionnaire SLA (2–3 weeks)",
        priority: "high",
      },
      {
        id: "sr-2",
        label: "Loop security engineer for architecture questions",
        priority: "medium",
      },
      {
        id: "sr-3",
        label: "Attach standard Higher Ed security pack",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "security_concerns",
        title: "Questionnaire turnaround",
        description:
          "Institution has not returned SIG Lite — contracting blocked until complete.",
        severity: "high",
      },
      {
        category: "delayed_response",
        title: "InfoSec thread idle",
        description: "No response on DPA follow-up in 9 business days.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary: "InfoSec kickoff — SIG requested, DPA template shared",
        date: "2026-04-12",
        source: "Gmail",
      },
      lastEmail: {
        summary: "DPA template delivered — awaiting legal review",
        date: "2026-04-12",
        source: "Gmail",
      },
      lastCrmUpdate: {
        summary: "Security review task created in ClickUp",
        date: "2026-04-10",
        source: "ClickUp",
      },
    },
    sourceBadges: ["ClickUp", "Gmail", "HubSpot"],
  },
  contracting: {
    aiInsight: {
      whyItMatters:
        "Contract velocity directly impacts forecast accuracy and implementation start dates.",
      signalsDetected: [
        "MSA redlines on liability cap",
        "Forecast commit this quarter",
        "Procurement alignment call completed",
      ],
      confidenceScore: 80,
    },
    recommendedActions: [
      {
        id: "ct-1",
        label: "Weekly legal standup until signatures",
        priority: "high",
      },
      {
        id: "ct-2",
        label: "Confirm CS implementation start date",
        priority: "medium",
      },
      {
        id: "ct-3",
        label: "Align fiscal year end acceleration angle",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "delayed_response",
        title: "Legal redline cycle",
        description:
          "Liability cap under review — standard playbook; expect 1–2 week delay.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Procurement alignment — redlines on cap, FY end signature target",
        date: "2026-04-18",
        source: "HubSpot",
      },
      lastCrmUpdate: {
        summary: "Deal stage Contract — forecast commit",
        date: "2026-04-15",
        source: "HubSpot",
      },
      lastEmail: {
        summary: "Order form sent to procurement portal",
        date: "2026-04-16",
        source: "Gmail",
      },
    },
    sourceBadges: ["HubSpot", "Gmail", "ClickUp"],
  },
  kickoff: {
    aiInsight: {
      whyItMatters:
        "A strong kickoff preserves buyer momentum and sets adoption benchmarks for expansion and renewal.",
      signalsDetected: [
        "Closed-won logged — Orion primary SKU",
        "CS onboarding template ready",
        "Handoff notes complete",
      ],
      confidenceScore: 91,
    },
    recommendedActions: [
      {
        id: "ko-1",
        label: "Send welcome pack + implementation timeline",
        priority: "high",
      },
      {
        id: "ko-2",
        label: "Create ClickUp project from CS template",
        priority: "high",
      },
      {
        id: "ko-3",
        label: "Align kickoff attendees with discovery stakeholders",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "Implementation sponsor TBD",
        description:
          "CIO delegate not yet assigned — risk to Q3 start window.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Kickoff hold on calendar — handoff notes shared with CS (pending customer confirm)",
        date: "2025-11-25",
        source: "Calendar",
      },
      lastCrmUpdate: {
        summary: "Closed-won — Orion, implementation owner assigned",
        date: "2025-11-20",
        source: "HubSpot",
      },
      lastEmail: {
        summary: "Welcome pack sent to champion",
        date: "2025-11-23",
        source: "Gmail",
      },
    },
    sourceBadges: ["HubSpot", "ClickUp", "Calendar"],
  },
  implementation: {
    aiInsight: {
      whyItMatters:
        "Implementation health predicts go-live success, expansion timing, and renewal risk.",
      signalsDetected: [
        "78% milestone completion in ClickUp",
        "API credential delay — 2 open tasks",
        "Helios RFP language — phase-2 signal",
      ],
      confidenceScore: 86,
    },
    recommendedActions: [
      {
        id: "im-1",
        label: "Bi-weekly steering committee until go-live",
        priority: "high",
      },
      {
        id: "im-2",
        label: "Escalate API credential blocker to CIO",
        priority: "high",
      },
      {
        id: "im-3",
        label: "Document Helios expansion triggers in success plan",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "delayed_response",
        title: "Technical task delay",
        description:
          "API credentials outstanding 12 days — blocks final integration milestone.",
        severity: "high",
      },
      {
        category: "security_concerns",
        title: "Integration security review",
        description:
          "SSO config pending InfoSec sign-off on service account scope.",
        severity: "medium",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Implementation standup — milestone 3 done; API delay escalated",
        date: "2026-05-10",
        source: "ClickUp",
      },
      lastCrmUpdate: {
        summary: "Customer health green — Orion active",
        date: "2026-05-10",
        source: "HubSpot",
      },
      lastEmail: {
        summary: "Credential request reminder sent to IT",
        date: "2026-05-28",
        source: "Gmail",
      },
    },
    sourceBadges: ["ClickUp", "HubSpot", "Gmail", "Calendar"],
  },
  live_customer: {
    aiInsight: {
      whyItMatters:
        "Live customers with strong adoption are reference candidates and expansion anchors.",
      signalsDetected: [
        "Adoption 82% of licensed users",
        "NPS stable — green health score",
        "QBR completed — reference willingness",
      ],
      confidenceScore: 93,
    },
    recommendedActions: [
      {
        id: "lc-1",
        label: "Maintain quarterly business review cadence",
        priority: "medium",
      },
      {
        id: "lc-2",
        label: "Capture testimonial when KPIs proven",
        priority: "low",
      },
      {
        id: "lc-3",
        label: "Monitor health score monthly",
        priority: "low",
      },
    ],
    risks: [],
    relatedActivity: {
      lastMeeting: {
        summary: "QBR — 82% adoption; reference candidate for Orion fraud",
        date: "2026-03-01",
        source: "HubSpot",
      },
      lastCrmUpdate: {
        summary: "Health score green — adoption 82%",
        date: "2026-05-01",
        source: "HubSpot",
      },
      lastLinkedIn: {
        summary: "Champion posted product milestone (engagement signal)",
        date: "2026-04-20",
        source: "LinkedIn",
      },
    },
    sourceBadges: ["HubSpot", "Calendar", "LinkedIn"],
  },
  expansion_opportunity: {
    aiInsight: {
      whyItMatters:
        "Expansion on live accounts is highest-yield revenue when coordinated with CS and timed to hiring signals.",
      signalsDetected: [
        "Atlas fit while Prism live",
        "Student services hiring surge on LinkedIn",
        "Prism NPS 9 — separate buying center",
      ],
      confidenceScore: 82,
    },
    recommendedActions: [
      {
        id: "ex-1",
        label: "Expansion discovery with VP Student Success",
        priority: "high",
      },
      {
        id: "ex-2",
        label: "Coordinate with CS before executive outreach",
        priority: "high",
      },
      {
        id: "ex-3",
        label: "Multi-thread beyond single champion",
        priority: "medium",
      },
    ],
    risks: [
      {
        category: "missing_stakeholders",
        title: "Single-threaded champion",
        description:
          "Only VP Student Success engaged — need CIO or procurement for Atlas.",
        severity: "high",
      },
    ],
    relatedActivity: {
      lastMeeting: {
        summary:
          "Expansion discovery — Atlas interest; Prism team satisfied",
        date: "2026-05-18",
        source: "HubSpot",
      },
      lastLinkedIn: {
        summary: "3 new student services leadership hires — outreach trigger",
        date: "2026-05-16",
        source: "LinkedIn",
      },
      lastCrmUpdate: {
        summary: "Expansion deal created — Atlas early stage",
        date: "2026-05-17",
        source: "HubSpot",
      },
    },
    sourceBadges: ["HubSpot", "LinkedIn", "ClickUp"],
  },
  renewal_risk: {
    aiInsight: {
      whyItMatters:
        "Proactive renewal monitoring prevents surprise churn and triggers save plays before the 120-day window.",
      signalsDetected: [
        "Not at active risk — health green",
        "Adoption above 60% threshold",
        "Executive sponsor engaged in last QBR",
      ],
      confidenceScore: 90,
    },
    recommendedActions: [
      {
        id: "rr-1",
        label: "Monthly executive sponsorship check",
        priority: "medium",
      },
      {
        id: "rr-2",
        label: "Pre-renewal value assessment 120 days out",
        priority: "medium",
      },
      {
        id: "rr-3",
        label: "Activate save playbook if health drops below yellow",
        priority: "low",
      },
    ],
    risks: [
      {
        category: "other",
        title: "Churn threshold watch",
        description:
          "If adoption falls below 60% before renewal window, escalate to CSM director.",
        severity: "low",
      },
    ],
    relatedActivity: {
      lastCrmUpdate: {
        summary: "Renewal forecast — not at risk, monitor only",
        date: "2026-05-01",
        source: "HubSpot",
      },
      lastMeeting: {
        summary: "Health review — no intervention required",
        date: "2026-04-15",
        source: "Calendar",
      },
    },
    sourceBadges: ["HubSpot", "Calendar"],
  },
};
