"use client";

import type { CustomerJourneyStageId } from "./journey-stages";
import type { StageDocument, OperationalTask } from "./journey-stage-types";

export interface StageOperationsBundle {
  pendingClientActions: string[];
  internalTasks: OperationalTask[];
  relatedDocuments: StageDocument[];
}

export const STAGE_OPERATIONS: Record<
  CustomerJourneyStageId,
  StageOperationsBundle
> = {
  prospect_identified: {
    pendingClientActions: ["None — pre-outreach"],
    internalTasks: [
      { id: "pi-t1", label: "ICP tier validation", status: "done", assignee: "SDR" },
      { id: "pi-t2", label: "Assign research owner", status: "in_progress", assignee: "SDR" },
    ],
    relatedDocuments: [
      { title: "Target account brief", system: "HubSpot", reference: "Company record" },
    ],
  },
  research_complete: {
    pendingClientActions: ["Awaiting first outreach touch"],
    internalTasks: [
      { id: "rc-t1", label: "Duplicate ownership check", status: "done", assignee: "SDR" },
      { id: "rc-t2", label: "Draft outreach angle", status: "pending", assignee: "SDR" },
    ],
    relatedDocuments: [
      { title: "Research checklist", system: "ClickUp", reference: "ACC research task" },
      { title: "Historical threads", system: "Gmail", reference: "3 indexed threads" },
    ],
  },
  outreach_active: {
    pendingClientActions: [
      "Review and respond to outreach (not yet sent — pending approval)",
    ],
    internalTasks: [
      { id: "oa-t1", label: "Approve outreach draft", status: "pending", assignee: "You" },
      { id: "oa-t2", label: "Enroll sequence step 1", status: "pending", assignee: "SDR" },
    ],
    relatedDocuments: [
      { title: "Outreach draft", system: "Gmail", reference: "Pending approval" },
      { title: "Sequence config", system: "HubSpot", reference: "Step 1 queued" },
    ],
  },
  discovery_scheduled: {
    pendingClientActions: [
      "Confirm discovery attendance",
      "Return pre-call questionnaire",
    ],
    internalTasks: [
      { id: "ds-t1", label: "Send agenda + customer story", status: "in_progress", assignee: "AE" },
      { id: "ds-t2", label: "Invite technical validator", status: "pending", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Discovery agenda", system: "Calendar", reference: "2026-05-28 hold" },
      { title: "Meeting prep", system: "ClickUp", reference: "Discovery prep doc" },
    ],
  },
  discovery_completed: {
    pendingClientActions: ["Schedule demo with technical stakeholder"],
    internalTasks: [
      { id: "dc-t1", label: "Log MEDDICC in CRM", status: "pending", assignee: "AE" },
      { id: "dc-t2", label: "Send recap email", status: "done", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Discovery notes", system: "HubSpot", reference: "Deal record" },
      { title: "Recap email", system: "Gmail", reference: "Sent post-call" },
    ],
  },
  demo_scheduled: {
    pendingClientActions: ["Confirm demo attendees", "Complete pre-demo questionnaire"],
    internalTasks: [
      { id: "dm-t1", label: "SE environment check", status: "in_progress", assignee: "SE" },
      { id: "dm-t2", label: "Demo storyline review", status: "done", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Demo runbook", system: "ClickUp", reference: "Demo prep" },
      { title: "Calendar hold", system: "Calendar", reference: "Demo slot" },
    ],
  },
  proposal_sent: {
    pendingClientActions: [
      "Executive review of proposal",
      "Budget committee decision",
    ],
    internalTasks: [
      { id: "ps-t1", label: "Executive follow-up call", status: "pending", assignee: "AE" },
      { id: "ps-t2", label: "Procurement intro", status: "pending", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Proposal PDF", system: "Gmail", reference: "Opened, no reply" },
      { title: "Deal record", system: "HubSpot", reference: "$120k Atlas" },
    ],
  },
  security_review: {
    pendingClientActions: [
      "Return SIG Lite questionnaire",
      "Legal review of DPA",
    ],
    internalTasks: [
      { id: "sr-t1", label: "Track questionnaire SLA", status: "in_progress", assignee: "Solutions" },
      { id: "sr-t2", label: "Security engineer escalation", status: "pending", assignee: "Solutions" },
    ],
    relatedDocuments: [
      { title: "SIG Lite", system: "ClickUp", reference: "InfoSec task" },
      { title: "DPA template", system: "Gmail", reference: "Delivered" },
    ],
  },
  contracting: {
    pendingClientActions: ["Legal sign-off on MSA", "Procurement portal submission"],
    internalTasks: [
      { id: "ct-t1", label: "Weekly legal standup", status: "in_progress", assignee: "Legal" },
      { id: "ct-t2", label: "CS start date confirmation", status: "pending", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Order form", system: "Gmail", reference: "Procurement portal" },
      { title: "Contract redlines", system: "HubSpot", reference: "Deal — Contract" },
    ],
  },
  kickoff: {
    pendingClientActions: ["Confirm kickoff attendees", "Sign implementation SOW"],
    internalTasks: [
      { id: "ko-t1", label: "Create CS project", status: "pending", assignee: "CS" },
      { id: "ko-t2", label: "Welcome pack delivery", status: "in_progress", assignee: "CS" },
    ],
    relatedDocuments: [
      { title: "Handoff notes", system: "HubSpot", reference: "Closed-won" },
      { title: "Onboarding template", system: "ClickUp", reference: "CS template" },
      { title: "Kickoff deck", system: "Basecamp", reference: "Project welcome" },
    ],
  },
  implementation: {
    pendingClientActions: [
      "Provide API credentials",
      "Assign technical sponsor",
    ],
    internalTasks: [
      { id: "im-t1", label: "Steering committee cadence", status: "in_progress", assignee: "CS" },
      { id: "im-t2", label: "Credential escalation", status: "pending", assignee: "CS" },
      { id: "im-t3", label: "Milestone 4 planning", status: "pending", assignee: "Implementation" },
    ],
    relatedDocuments: [
      { title: "Implementation plan", system: "ClickUp", reference: "78% complete" },
      { title: "API runbook", system: "Basecamp", reference: "Integration guide" },
    ],
  },
  live_customer: {
    pendingClientActions: ["Participate in QBR", "Confirm reference availability"],
    internalTasks: [
      { id: "lc-t1", label: "QBR scheduling", status: "pending", assignee: "CS" },
      { id: "lc-t2", label: "Health score review", status: "done", assignee: "CS" },
    ],
    relatedDocuments: [
      { title: "Adoption report", system: "HubSpot", reference: "82% licensed users" },
      { title: "Success plan", system: "ClickUp", reference: "FY26 plan" },
    ],
  },
  expansion_opportunity: {
    pendingClientActions: ["Expansion discovery meeting", "Intro to student services buying center"],
    internalTasks: [
      { id: "ex-t1", label: "CS coordination before outreach", status: "in_progress", assignee: "AE" },
      { id: "ex-t2", label: "Multi-thread map", status: "pending", assignee: "AE" },
    ],
    relatedDocuments: [
      { title: "Expansion deal", system: "HubSpot", reference: "Atlas early stage" },
      { title: "Adoption / NPS", system: "ClickUp", reference: "Prism NPS 9" },
    ],
  },
  renewal_risk: {
    pendingClientActions: ["Executive sponsorship check-in"],
    internalTasks: [
      { id: "rr-t1", label: "Monthly health review", status: "pending", assignee: "CS" },
      { id: "rr-t2", label: "120-day value assessment prep", status: "pending", assignee: "CS" },
    ],
    relatedDocuments: [
      { title: "Renewal forecast", system: "HubSpot", reference: "Monitor only" },
    ],
  },
};
