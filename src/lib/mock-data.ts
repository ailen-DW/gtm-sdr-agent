import type {
  DashboardMetrics,
  Institution,
  MarketingInsight,
  OutreachDraft,
  RecommendedAction,
} from "./types";

export const MOCK_ACCOUNTS: Institution[] = [
  {
    id: "acc_001",
    name: "Riverside State University",
    type: "university",
    location: "Columbus, OH",
    enrollment: 28000,
    website: "https://riverside-state.example.edu",
    summary:
      "Large public research university with recent financial aid audit findings and active AI strategy workgroup.",
    lifecycleStatus: "ready_for_outreach",
    crmRelationship: "cold_prospect",
    productFit: [
      { productId: "orion", score: 88, rationale: "Fraud/aid signals" },
      { productId: "helios", score: 72, rationale: "AI initiatives" },
      { productId: "prism", score: 45, rationale: "Moderate transcript volume" },
      { productId: "atlas", score: 40, rationale: "" },
      { productId: "omnia", score: 55, rationale: "Leadership AI interest" },
    ],
    primaryProducts: [],
    signals: [
      {
        id: "sig_001",
        category: "fraud_concerns",
        title: "State audit flags aid verification gaps",
        summary: "Regional news coverage of audit recommendations.",
        detectedAt: "2026-05-18",
      },
      {
        id: "sig_002",
        category: "ai_initiatives",
        title: "Board-approved AI operations roadmap",
        summary: "Public board minutes reference 18-month AI plan.",
        detectedAt: "2026-05-10",
      },
    ],
    contacts: [
      {
        id: "con_001",
        name: "Dr. Maria Chen",
        title: "VP Enrollment Management",
        email: "mchen@riverside-state.example.edu",
        isPrimary: true,
      },
      {
        id: "con_002",
        name: "James Okonkwo",
        title: "Director of Financial Aid",
        email: "jokonkwo@riverside-state.example.edu",
      },
    ],
    crmRecords: [],
    tags: ["high-fit", "orion"],
    notes: [],
    approvalHistory: [],
    followUpDue: "2026-05-24",
  },
  {
    id: "acc_002",
    name: "Lakeview Community College",
    type: "community_college",
    location: "Madison, WI",
    enrollment: 6200,
    summary:
      "Mid-size community college evaluating transcript automation; existing HubSpot contact from 2024 webinar.",
    lifecycleStatus: "needs_human_review",
    crmRelationship: "dormant_lead",
    productFit: [
      { productId: "prism", score: 91, rationale: "RFP for document processing" },
      { productId: "atlas", score: 68, rationale: "Enrollment ops hiring" },
      { productId: "orion", score: 35, rationale: "" },
      { productId: "helios", score: 42, rationale: "" },
      { productId: "omnia", score: 20, rationale: "" },
    ],
    primaryProducts: [],
    signals: [
      {
        id: "sig_003",
        category: "rfp",
        title: "RFP: High-volume transcript processing",
        summary: "Public procurement portal listing due June 2026.",
        detectedAt: "2026-05-20",
      },
      {
        id: "sig_004",
        category: "job_posting",
        title: "Hiring: Registrar Operations Manager",
        summary: "Job post emphasizes workflow automation.",
        detectedAt: "2026-05-15",
      },
    ],
    contacts: [
      {
        id: "con_003",
        name: "Patricia Alvarez",
        title: "Registrar",
        email: "palvarez@lakeview-cc.example.edu",
        isPrimary: true,
      },
    ],
    crmRecords: [
      {
        source: "hubspot",
        externalId: "hs_88231",
        lastSyncedAt: "2026-05-01",
        summary: "Contact created 2024-09; last email opened 2025-01; no meetings.",
      },
      {
        source: "gmail",
        summary: "3 email threads; last outbound 2025-01-14.",
      },
    ],
    hubspotId: "hs_88231",
    duplicateRisk: {
      severity: "medium",
      message: "SDR Sarah M. emailed 2025-01; no AE assignment.",
      conflictingContacts: ["palvarez@lakeview-cc.example.edu"],
    },
    tags: ["dormant", "prism", "needs-review"],
    notes: [
      {
        id: "note_001",
        author: "Agent",
        content: "Strong Prism fit — verify RFP timeline before outreach.",
        createdAt: "2026-05-21",
      },
    ],
    approvalHistory: [],
  },
  {
    id: "acc_003",
    name: "Northgate University",
    type: "university",
    location: "Boston, MA",
    enrollment: 14500,
    summary: "Existing Orion customer in implementation; Helios expansion opportunity.",
    lifecycleStatus: "implementation",
    crmRelationship: "implementation_account",
    productFit: [
      { productId: "orion", score: 30, rationale: "Already customer" },
      { productId: "helios", score: 85, rationale: "Illuminate migration RFP" },
      { productId: "prism", score: 60, rationale: "" },
      { productId: "atlas", score: 55, rationale: "" },
      { productId: "omnia", score: 70, rationale: "Provost AI briefing pilot" },
    ],
    primaryProducts: ["orion"],
    signals: [
      {
        id: "sig_005",
        category: "rfp",
        title: "Campus platform modernization RFP",
        summary: "References Illuminate replacement.",
        detectedAt: "2026-05-12",
      },
    ],
    contacts: [
      {
        id: "con_004",
        name: "David Kim",
        title: "CIO",
        email: "dkim@northgate.example.edu",
        isPrimary: true,
      },
    ],
    crmRecords: [
      {
        source: "hubspot",
        externalId: "hs_12001",
        summary: "Customer — Orion deal closed 2025-11.",
      },
      {
        source: "clickup",
        summary: "Implementation project 78% complete; 2 open tasks.",
      },
    ],
    hubspotId: "hs_12001",
    tags: ["customer", "expansion", "helios"],
    notes: [],
    approvalHistory: [],
  },
  {
    id: "acc_004",
    name: "Summit Technical College",
    type: "college",
    location: "Denver, CO",
    enrollment: 3100,
    summary: "Met at EDUCAUSE regional — active opportunity, stalled 45 days.",
    lifecycleStatus: "active_opportunity",
    crmRelationship: "active_opportunity",
    productFit: [
      { productId: "atlas", score: 82, rationale: "Workflow automation focus" },
      { productId: "orion", score: 65, rationale: "" },
      { productId: "prism", score: 50, rationale: "" },
      { productId: "helios", score: 48, rationale: "" },
      { productId: "omnia", score: 35, rationale: "" },
    ],
    primaryProducts: [],
    signals: [
      {
        id: "sig_006",
        category: "conference",
        title: "EDUCAUSE Regional — booth conversation",
        summary: "Requested Atlas demo follow-up.",
        detectedAt: "2026-04-05",
      },
    ],
    contacts: [
      {
        id: "con_005",
        name: "Angela Brooks",
        title: "VP Student Services",
        email: "abrooks@summit-tech.example.edu",
        isPrimary: true,
      },
    ],
    crmRecords: [
      {
        source: "hubspot",
        summary: "Deal stage: Proposal; amount $120k; close date pushed.",
      },
      {
        source: "meeting_notes",
        summary: "Demo 2026-03-28 — positive; awaiting budget committee.",
      },
    ],
    isStalled: true,
    tags: ["stalled", "atlas", "conference"],
    notes: [],
    approvalHistory: [],
    followUpDue: "2026-05-22",
  },
  {
    id: "acc_005",
    name: "Westfield University System",
    type: "system",
    location: "Austin, TX",
    enrollment: 52000,
    summary: "Multi-campus system; duplicate outreach risk across two AEs.",
    lifecycleStatus: "in_sequence",
    crmRelationship: "active_opportunity",
    productFit: [
      { productId: "orion", score: 75, rationale: "System-wide fraud initiative" },
      { productId: "omnia", score: 78, rationale: "Chancellor AI council" },
      { productId: "helios", score: 70, rationale: "" },
      { productId: "prism", score: 55, rationale: "" },
      { productId: "atlas", score: 45, rationale: "" },
    ],
    primaryProducts: [],
    signals: [
      {
        id: "sig_007",
        category: "leadership_change",
        title: "New Chancellor appointed",
        summary: "Press release highlights digital transformation.",
        detectedAt: "2026-05-01",
      },
    ],
    contacts: [
      {
        id: "con_006",
        name: "Chancellor Elena Vasquez",
        title: "Chancellor",
        email: "evasquez@westfield.example.edu",
        isPrimary: true,
      },
    ],
    crmRecords: [
      { source: "hubspot", summary: "Two open deals — different owners." },
      { source: "gmail", summary: "AE Tom sent exec intro 2026-05-19." },
    ],
    duplicateRisk: {
      severity: "high",
      message: "Two AEs actively engaged; exec intro sent yesterday without SDR coordination.",
    },
    tags: ["duplicate-risk", "system"],
    notes: [],
    approvalHistory: [],
  },
  {
    id: "acc_006",
    name: "Pinecrest College",
    type: "college",
    location: "Portland, OR",
    enrollment: 4800,
    summary: "Live Prism customer — expansion to Atlas for student services.",
    lifecycleStatus: "expansion_opportunity",
    crmRelationship: "expansion_candidate",
    productFit: [
      { productId: "prism", score: 40, rationale: "Current product" },
      { productId: "atlas", score: 88, rationale: "Student services automation RFI" },
      { productId: "orion", score: 50, rationale: "" },
      { productId: "helios", score: 45, rationale: "" },
      { productId: "omnia", score: 30, rationale: "" },
    ],
    primaryProducts: ["prism"],
    signals: [
      {
        id: "sig_008",
        category: "job_posting",
        title: "Director of Student Success — automation mandate",
        summary: "JD mentions workflow agents.",
        detectedAt: "2026-05-17",
      },
    ],
    contacts: [
      {
        id: "con_007",
        name: "Rachel Nguyen",
        title: "VP Student Success",
        email: "rnguyen@pinecrest.example.edu",
        isPrimary: true,
      },
    ],
    crmRecords: [
      { source: "hubspot", summary: "Customer since 2024; NPS 9." },
    ],
    tags: ["customer", "upsell", "atlas"],
    notes: [],
    approvalHistory: [],
  },
];

export const MOCK_ACTIONS: RecommendedAction[] = [
  {
    id: "act_001",
    accountId: "acc_001",
    contactId: "con_001",
    type: "cold_outreach",
    title: "Personalized cold outreach — Orion + aid audit",
    rationale:
      "CRM status: cold prospect. Lifecycle: ready for outreach. Active signals: State audit flags aid verification gaps; Board-approved AI operations roadmap.",
    priority: "high",
    suggestedProducts: ["orion", "helios"],
    approvalStatus: "pending",
    createdAt: "2026-05-21T10:00:00Z",
    dueDate: "2026-05-24",
  },
  {
    id: "act_002",
    accountId: "acc_004",
    contactId: "con_005",
    type: "re_engagement",
    title: "Stalled opportunity — multi-threaded re-engagement",
    rationale:
      "Deal stalled 45 days post-demo. Conference follow-up still relevant.",
    priority: "high",
    suggestedProducts: ["atlas"],
    approvalStatus: "pending",
    createdAt: "2026-05-21T11:30:00Z",
    dueDate: "2026-05-22",
  },
  {
    id: "act_003",
    accountId: "acc_005",
    contactId: "con_006",
    type: "no_action",
    title: "Hold — duplicate outreach risk",
    rationale:
      "Two AEs actively engaged. Resolve ownership before any SDR action.",
    priority: "high",
    suggestedProducts: ["orion", "omnia"],
    approvalStatus: "pending",
    createdAt: "2026-05-20T09:00:00Z",
  },
  {
    id: "act_004",
    accountId: "acc_006",
    contactId: "con_007",
    type: "upsell_opportunity",
    title: "Atlas expansion — student services RFI",
    rationale:
      "Live Prism customer with strong Atlas fit from job posting signal.",
    priority: "medium",
    suggestedProducts: ["atlas"],
    approvalStatus: "approved",
    createdAt: "2026-05-19T14:00:00Z",
  },
];

export const MOCK_DRAFTS: OutreachDraft[] = [
  {
    id: "draft_001",
    accountId: "acc_001",
    contactId: "con_001",
    channel: "email",
    subject: "Riverside State — aid verification gaps & Orion",
    body: `Hi Maria,

I noticed state audit flags around aid verification gaps at Riverside State and thought it might connect to work we're doing with peer institutions on Orion.

We've helped similar universities reduce manual review load and improve decision confidence without adding headcount. If a 20-minute conversation would be useful, I'd welcome the chance to share what peers are doing.

Would next Tuesday or Thursday work for a brief call?

Best,
[Your name]`,
    actionId: "act_001",
    createdAt: "2026-05-21T10:00:00Z",
  },
  {
    id: "draft_002",
    accountId: "acc_004",
    contactId: "con_005",
    channel: "email",
    subject: "Reconnecting — Summit Technical & Atlas",
    body: `Hi Angela,

It's been a while since our EDUCAUSE conversation. Given shifts in student services operations, I wanted to reopen the Atlas discussion in case budget timing has improved.

Happy to share a short update on outcomes peer colleges have seen — no pressure if priorities have moved.

Open to a quick call?

Best,
[Your name]`,
    actionId: "act_002",
    createdAt: "2026-05-21T11:30:00Z",
  },
];

export const MOCK_MARKETING_INSIGHTS: MarketingInsight[] = [
  {
    id: "mkt_001",
    type: "objection",
    title: "“We already have fraud rules in our SIS”",
    description:
      "Prospects conflate basic rule-based checks with ML fraud detection across applications and aid.",
    frequency: 12,
    suggestedCampaigns: [
      "Webinar: Beyond SIS rules — modern fraud detection",
      "One-pager: Orion vs. native SIS controls",
    ],
    relatedProducts: ["orion"],
  },
  {
    id: "mkt_002",
    type: "confusion",
    title: "Helios vs. Illuminate — migration timeline questions",
    description:
      "Multiple prospects unclear on coexistence period and data migration scope.",
    frequency: 8,
    suggestedCampaigns: [
      "LinkedIn carousel: 90-day Illuminate migration path",
      "Customer story: Northgate-style phased rollout",
    ],
    relatedProducts: ["helios"],
  },
  {
    id: "mkt_003",
    type: "trend",
    title: "Rising RFP volume for transcript automation",
    description:
      "Community colleges and regional universities issuing transcript processing RFPs in Q2.",
    frequency: 15,
    suggestedCampaigns: [
      "Email sequence: Prism for mid-size registrars",
      "Conference talk proposal: Document intelligence benchmarks",
    ],
    relatedProducts: ["prism"],
  },
  {
    id: "mkt_004",
    type: "question",
    title: "Who owns AI purchasing — IT or academic affairs?",
    description:
      "Buying committee fragmentation slowing Omnia and Helios deals.",
    frequency: 6,
    suggestedCampaigns: [
      "Executive roundtable invite (Omnia)",
      "Buying guide: AI governance in Higher Ed",
    ],
    relatedProducts: ["omnia", "helios"],
  },
];

export function getDashboardMetrics(
  accounts: Institution[],
  actions: RecommendedAction[]
): DashboardMetrics {
  return {
    newProspects: accounts.filter((a) => a.lifecycleStatus === "new_prospect")
      .length,
    needsReview: accounts.filter(
      (a) => a.lifecycleStatus === "needs_human_review"
    ).length,
    existingCustomers: accounts.filter((a) =>
      ["customer", "implementation", "live", "expansion_opportunity"].includes(
        a.lifecycleStatus
      )
    ).length,
    duplicateAlerts: accounts.filter(
      (a) => a.duplicateRisk && a.duplicateRisk.severity !== "low"
    ).length,
    pendingApprovals: actions.filter((a) => a.approvalStatus === "pending")
      .length,
    followUpsDue: accounts.filter((a) => a.followUpDue).length,
    stalledOpportunities: accounts.filter((a) => a.isStalled).length,
    upsellOpportunities: accounts.filter(
      (a) => a.lifecycleStatus === "expansion_opportunity"
    ).length,
  };
}
