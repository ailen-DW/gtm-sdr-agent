import type { Institution, RecommendedAction, OutreachDraft } from "../types";
import type {
  CrmValidation,
  DiscoveredStakeholder,
  DiscoveryLead,
  LinkedInWorkflowStep,
  OutreachApprovalPackage,
  SdrQueueItem,
} from "./types";

export const DISCOVERY_LEADS: DiscoveryLead[] = [
  {
    id: "lead_001",
    institutionName: "Harborview University",
    location: "Seattle, WA",
    whySelected:
      "New provost mandate on enrollment integrity + public fraud task force aligns with Orion ICP.",
    buyingSignals: [
      "Enrollment fraud task force announced",
      "New Provost — integrity focus",
      "Peer institution RFP for aid verification",
    ],
    discoverySource: "Higher Ed News",
    sourceDetail: "Campus press · Chronicle of Higher Ed mention",
    confidenceScore: 86,
    recommendedProducts: ["orion", "prism"],
  },
  {
    id: "lead_002",
    institutionName: "Riverside State University",
    location: "Columbus, OH",
    whySelected:
      "Already in CRM as ready for outreach — state audit amplifies urgency for aid workflows.",
    buyingSignals: [
      "State aid verification audit",
      "Board AI operations roadmap",
    ],
    discoverySource: "CRM Signal",
    sourceDetail: "HubSpot · lifecycle ready_for_outreach",
    confidenceScore: 91,
    recommendedProducts: ["orion", "helios"],
    accountId: "acc_001",
  },
  {
    id: "lead_003",
    institutionName: "Coastal Community College District",
    location: "San Diego, CA",
    whySelected:
      "Conference attendee + LinkedIn hiring surge in student services automation.",
    buyingSignals: [
      "EDUCAUSE session attendance",
      "3 Director-level hires in 60 days",
    ],
    discoverySource: "Conference List",
    sourceDetail: "EDUCAUSE 2026 · Booth scan + session list",
    confidenceScore: 79,
    recommendedProducts: ["atlas", "prism"],
  },
  {
    id: "lead_004",
    institutionName: "Midwest Technical Institute",
    location: "Chicago, IL",
    whySelected:
      "Website spike on fraud detection content + job posting for verification analyst.",
    buyingSignals: [
      "3× pricing page visits — fraud SKU",
      "Job posting: Verification Analyst",
    ],
    discoverySource: "Website Activity",
    sourceDetail: "Marketing site analytics (mock)",
    confidenceScore: 74,
    recommendedProducts: ["orion"],
  },
  {
    id: "lead_005",
    institutionName: "Lakeview Community College",
    location: "Madison, WI",
    whySelected:
      "Dormant lead re-surfaced via LinkedIn — registrar engaged with competitor content.",
    buyingSignals: [
      "LinkedIn engagement on aid integrity post",
      "Historical webinar attendee 2024",
    ],
    discoverySource: "LinkedIn",
    sourceDetail: "Social listening · Registrar profile activity",
    confidenceScore: 82,
    recommendedProducts: ["prism"],
    accountId: "acc_002",
  },
  {
    id: "lead_006",
    institutionName: "Summit Technical College",
    location: "Denver, CO",
    whySelected:
      "Stalled opportunity — article on budget committee timing creates re-engagement window.",
    buyingSignals: [
      "Budget committee article (local news)",
      "Prior demo interest — Atlas",
    ],
    discoverySource: "Article",
    sourceDetail: "Denver Business Journal · May 2026",
    confidenceScore: 77,
    recommendedProducts: ["atlas"],
    accountId: "acc_004",
  },
];

const STAKEHOLDERS: Record<string, DiscoveredStakeholder[]> = {
  acc_001: [
    {
      id: "stk_001",
      name: "Dr. Maria Chen",
      title: "VP Enrollment Management",
      department: "Enrollment Management",
      linkedInStatus: "not_contacted",
      inHubSpot: true,
      hubSpotNote: "Primary contact",
    },
    {
      id: "stk_002",
      name: "James Okonkwo",
      title: "Director of Financial Aid",
      department: "Financial Aid",
      linkedInStatus: "pending_connection",
      inHubSpot: true,
      hubSpotNote: "Secondary — no sequence yet",
    },
    {
      id: "stk_003",
      name: "Dr. Priya Nair",
      title: "CIO",
      department: "Information Technology",
      linkedInStatus: "not_contacted",
      inHubSpot: false,
      hubSpotNote: "Discovered via LinkedIn — not in CRM",
    },
  ],
  acc_002: [
    {
      id: "stk_004",
      name: "Patricia Alvarez",
      title: "Registrar",
      department: "Registrar",
      linkedInStatus: "connected",
      inHubSpot: true,
      hubSpotNote: "Dormant — last touch Jan 2025",
    },
  ],
  acc_004: [
    {
      id: "stk_005",
      name: "Angela Brooks",
      title: "VP Student Services",
      department: "Student Services",
      linkedInStatus: "replied",
      inHubSpot: true,
    },
    {
      id: "stk_006",
      name: "Michael Torres",
      title: "Director of IT",
      department: "Technology",
      linkedInStatus: "meeting_booked",
      inHubSpot: true,
      hubSpotNote: "Technical validator",
    },
  ],
  acc_005: [
    {
      id: "stk_007",
      name: "Chancellor Elena Vasquez",
      title: "Chancellor",
      department: "Executive",
      linkedInStatus: "connected",
      inHubSpot: true,
      hubSpotNote: "AE Tom connected — duplicate risk",
    },
    {
      id: "stk_008",
      name: "Dr. Alan Pierce",
      title: "VP Enrollment",
      department: "Enrollment",
      linkedInStatus: "not_contacted",
      inHubSpot: true,
    },
  ],
  acc_006: [
    {
      id: "stk_009",
      name: "Rachel Nguyen",
      title: "VP Student Success",
      department: "Student Success",
      linkedInStatus: "connected",
      inHubSpot: true,
    },
  ],
};

const LINKEDIN_WORKFLOWS: Record<string, LinkedInWorkflowStep[]> = {
  acc_001: [
    {
      id: "li_1",
      label: "Suggested connection request",
      status: "approved",
      preview:
        "Hi James — I follow Riverside State's work on aid verification. Would value connecting.",
      date: "2026-05-19",
    },
    {
      id: "li_2",
      label: "Connection approved by you",
      status: "completed",
      date: "2026-05-20",
    },
    {
      id: "li_3",
      label: "Pending acceptance",
      status: "pending",
      date: "2026-05-20",
    },
    {
      id: "li_4",
      label: "Accepted connection",
      status: "suggested",
    },
    {
      id: "li_5",
      label: "Suggested follow-up message",
      status: "suggested",
      preview:
        "Thanks for connecting, James. Given the state audit news, happy to share how peers reduced manual review load with Orion.",
    },
  ],
  acc_002: [
    {
      id: "li_6",
      label: "Suggested connection request",
      status: "completed",
      preview: "Connected with Patricia Alvarez",
      date: "2025-01-10",
    },
    {
      id: "li_7",
      label: "Accepted connection",
      status: "completed",
      date: "2025-01-12",
    },
    {
      id: "li_8",
      label: "Suggested follow-up message",
      status: "suggested",
      preview:
        "Patricia — saw your team at the 2024 webinar. Prism may fit transcript automation goals when timing opens.",
    },
  ],
  acc_004: [
    {
      id: "li_9",
      label: "Suggested connection request",
      status: "completed",
      date: "2026-03-01",
    },
    {
      id: "li_10",
      label: "Accepted connection",
      status: "completed",
      date: "2026-03-02",
    },
    {
      id: "li_11",
      label: "Suggested follow-up message",
      status: "approved",
      preview: "Following up on Atlas proposal — any update from budget committee?",
      date: "2026-05-18",
    },
  ],
};

const CRM_VALIDATIONS: Record<string, CrmValidation> = {
  acc_001: {
    accountId: "acc_001",
    duplicateRisk: false,
    checks: [
      { id: "c1", label: "Existing customer?", result: "clear", detail: "Net-new prospect" },
      { id: "c2", label: "Existing opportunity?", result: "clear", detail: "No open deal" },
      { id: "c3", label: "Previous outreach detected?", result: "warning", detail: "Last reply Jan 2025 — re-engagement angle" },
      { id: "c4", label: "Existing implementation?", result: "clear", detail: "No active SKU" },
      { id: "c5", label: "Duplicate risk?", result: "clear", detail: "Single owner" },
    ],
  },
  acc_002: {
    accountId: "acc_002",
    duplicateRisk: true,
    checks: [
      { id: "c1", label: "Existing customer?", result: "clear", detail: "Prospect" },
      { id: "c2", label: "Existing opportunity?", result: "clear", detail: "No active opp" },
      { id: "c3", label: "Previous outreach detected?", result: "warning", detail: "SDR email Jan 2025" },
      { id: "c4", label: "Existing implementation?", result: "clear", detail: "None" },
      { id: "c5", label: "Duplicate risk?", result: "block", detail: "Medium — verify ownership before send" },
    ],
  },
  acc_003: {
    accountId: "acc_003",
    duplicateRisk: false,
    checks: [
      { id: "c1", label: "Existing customer?", result: "block", detail: "Orion customer — expansion only" },
      { id: "c2", label: "Existing opportunity?", result: "warning", detail: "Helios expansion signal" },
      { id: "c3", label: "Previous outreach detected?", result: "clear", detail: "CS-led" },
      { id: "c4", label: "Existing implementation?", result: "block", detail: "Implementation 78% — Orion live" },
      { id: "c5", label: "Duplicate risk?", result: "clear", detail: "CS owns relationship" },
    ],
  },
  acc_004: {
    accountId: "acc_004",
    duplicateRisk: false,
    checks: [
      { id: "c1", label: "Existing customer?", result: "clear", detail: "Prospect" },
      { id: "c2", label: "Existing opportunity?", result: "warning", detail: "Proposal stage — stalled 45d" },
      { id: "c3", label: "Previous outreach detected?", result: "warning", detail: "Multiple threads — last open May 2026" },
      { id: "c4", label: "Existing implementation?", result: "clear", detail: "None" },
      { id: "c5", label: "Duplicate risk?", result: "clear", detail: "Single AE owner" },
    ],
  },
  acc_005: {
    accountId: "acc_005",
    duplicateRisk: true,
    checks: [
      { id: "c1", label: "Existing customer?", result: "clear", detail: "Prospect" },
      { id: "c2", label: "Existing opportunity?", result: "warning", detail: "Two open deals — different owners" },
      { id: "c3", label: "Previous outreach detected?", result: "block", detail: "Exec intro sent yesterday (unsynced)" },
      { id: "c4", label: "Existing implementation?", result: "clear", detail: "None" },
      { id: "c5", label: "Duplicate risk?", result: "block", detail: "High — hold SDR touches" },
    ],
  },
  acc_006: {
    accountId: "acc_006",
    duplicateRisk: false,
    checks: [
      { id: "c1", label: "Existing customer?", result: "block", detail: "Prism customer" },
      { id: "c2", label: "Existing opportunity?", result: "warning", detail: "Atlas expansion early stage" },
      { id: "c3", label: "Previous outreach detected?", result: "clear", detail: "Expansion discovery scheduled" },
      { id: "c4", label: "Existing implementation?", result: "block", detail: "Prism live" },
      { id: "c5", label: "Duplicate risk?", result: "clear", detail: "Coordinate with CS" },
    ],
  },
};

export function getDiscoveryLeads(): DiscoveryLead[] {
  return DISCOVERY_LEADS;
}

export function getStakeholdersForAccount(accountId: string): DiscoveredStakeholder[] {
  return STAKEHOLDERS[accountId] ?? [];
}

export function getLinkedInWorkflow(accountId: string): LinkedInWorkflowStep[] {
  return LINKEDIN_WORKFLOWS[accountId] ?? [];
}

export function getCrmValidation(account: Institution): CrmValidation {
  const preset = CRM_VALIDATIONS[account.id];
  if (preset) return preset;

  const duplicate = account.duplicateRisk && account.duplicateRisk.severity !== "low";
  return {
    accountId: account.id,
    duplicateRisk: Boolean(duplicate),
    checks: [
      {
        id: "c1",
        label: "Existing customer?",
        result: ["customer", "implementation", "live"].includes(account.lifecycleStatus)
          ? "block"
          : "clear",
        detail: account.crmRelationship,
      },
      {
        id: "c2",
        label: "Existing opportunity?",
        result: account.lifecycleStatus === "active_opportunity" ? "warning" : "clear",
        detail: account.lifecycleStatus,
      },
      {
        id: "c3",
        label: "Previous outreach detected?",
        result: account.followUpDue ? "warning" : "clear",
        detail: account.followUpDue ? "Follow-up due" : "None flagged",
      },
      {
        id: "c4",
        label: "Existing implementation?",
        result: account.lifecycleStatus === "implementation" ? "block" : "clear",
        detail: account.lifecycleStatus,
      },
      {
        id: "c5",
        label: "Duplicate risk?",
        result: duplicate ? "block" : "clear",
        detail: account.duplicateRisk?.message ?? "None",
      },
    ],
  };
}

export function getOutreachApprovalPackage(
  actionId: string,
  drafts: OutreachDraft[]
): OutreachApprovalPackage | undefined {
  const email = drafts.find((d) => d.actionId === actionId && d.channel === "email");
  const linkedin = drafts.find((d) => d.actionId === actionId && d.channel === "linkedin");

  if (!email && !linkedin) return undefined;

  return {
    actionId,
    accountId: email?.accountId ?? linkedin!.accountId,
    emailDraft: email
      ? { subject: email.subject ?? "", body: email.body }
      : undefined,
    linkedInDraft: linkedin ? { body: linkedin.body } : undefined,
    cadence: [
      { day: 1, channel: "email", action: "Initial personalized email" },
      { day: 3, channel: "linkedin", action: "Connection request (if not connected)" },
      { day: 5, channel: "linkedin", action: "Follow-up message if accepted" },
      { day: 8, channel: "email", action: "Value-add bump — peer outcome" },
      { day: 12, channel: "email", action: "Break-up or meeting ask" },
    ],
  };
}

export function buildSdrQueue(
  accounts: Institution[],
  actions: RecommendedAction[]
): SdrQueueItem[] {
  const items: SdrQueueItem[] = [];

  actions
    .filter((a) => a.approvalStatus === "pending")
    .forEach((a) => {
      const acc = accounts.find((x) => x.id === a.accountId);
      items.push({
        id: `q_ap_${a.id}`,
        category: "approval",
        title: a.title,
        subtitle: acc?.name ?? "Unknown",
        accountId: a.accountId,
        priority: a.priority,
        href: `/action-queue?focus=${a.id}`,
      });
    });

  accounts
    .filter((a) => a.followUpDue)
    .forEach((a) => {
      items.push({
        id: `q_fu_${a.id}`,
        category: "follow_up",
        title: "Follow-up due",
        subtitle: a.name,
        accountId: a.id,
        priority: "high",
        href: `/accounts/${a.id}`,
      });
    });

  accounts.forEach((a) => {
    const pending = getStakeholdersForAccount(a.id).filter(
      (s) => s.linkedInStatus === "pending_connection"
    );
    if (pending.length > 0) {
      items.push({
        id: `q_li_${a.id}`,
        category: "linkedin",
        title: `${pending.length} LinkedIn pending`,
        subtitle: a.name,
        accountId: a.id,
        priority: "medium",
        href: `/accounts/${a.id}#sdr`,
      });
    }
  });

  accounts
    .filter(
      (a) =>
        a.lifecycleStatus === "needs_human_review" ||
        a.duplicateRisk?.severity === "high" ||
        a.isStalled
    )
    .forEach((a) => {
      items.push({
        id: `q_hp_${a.id}`,
        category: "high_priority",
        title: "Needs attention",
        subtitle: a.name,
        accountId: a.id,
        priority: "high",
        href: `/accounts/${a.id}`,
      });
    });

  accounts.forEach((a) => {
    const hasMeetingPrep = getStakeholdersForAccount(a.id).some(
      (s) => s.linkedInStatus === "meeting_booked"
    );
    if (!hasMeetingPrep) return;
    items.push({
      id: `q_mp_${a.id}`,
      category: "meeting_prep",
      title: "Meeting prep",
      subtitle: a.name,
      accountId: a.id,
      priority: "medium",
      href: `/accounts/${a.id}#sdr`,
    });
  });

  const order = { high: 0, medium: 1, low: 2 };
  return items.sort((a, b) => order[a.priority] - order[b.priority]);
}
