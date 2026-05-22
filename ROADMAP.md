# GTM SDR Agent — Product Roadmap

Internal AI GTM/SDR platform for B2B Higher Education software. This roadmap organizes delivery into phases that build on each other — each phase should be shippable before the next begins in earnest.

**Current state:** Phase 1 (MVP Foundation) is largely complete with mock data and placeholder integrations.

---

## Phase 1 — MVP Foundation

**Goal:** Prove the workflow in a usable web app — humans stay in control, AI explains its reasoning.

| Area | Scope |
|------|--------|
| Dashboard | Pipeline snapshot, priorities, pending approvals, conflict alerts |
| Prospect discovery | Signal categories, mock scan, product fit scoring |
| Accounts | List, filters, account profiles with lifecycle and CRM context |
| Action queue | Recommended actions with approve / reject / edit flow |
| Outreach drafts | Email drafts linked to actions, edit before send |
| Human approval workflow | Nothing sends or writes to CRM without explicit approval |
| Mock data | Institutions, actions, drafts, marketing insights for demos |

**Exit criteria:** Sales/marketing can run a full “day in the life” demo without live APIs.

---

## Phase 2 — Data Persistence

**Goal:** Replace in-memory mock state with durable storage and real user context.

- Database setup (e.g. PostgreSQL + Prisma or similar ORM)
- Persistent accounts, contacts, and lifecycle status
- Persistent outreach drafts and versions
- User sessions and role-based access (SDR, AE, admin)
- Saved approvals, reviewer notes, and audit history
- API layer backed by DB instead of client-only store

**Exit criteria:** Refreshing the browser or redeploying does not lose work; multiple users can use the app concurrently.

---

## Phase 3 — CRM Integrations

**Goal:** Ground every recommendation in real CRM state before suggesting outreach.

- HubSpot integration (OAuth, API client, sync jobs)
- Company and contact sync (bidirectional where appropriate)
- Duplicate detection across owners, sequences, and recent activity
- Lifecycle stage sync (prospect → opportunity → customer)
- Notes and tasks sync (create tasks on approval, log outcomes)

**Exit criteria:** Action queue checks HubSpot before recommending; duplicate-risk alerts reflect live data.

---

## Phase 4 — Communication Layer

**Goal:** Close the loop from draft → approved → sent, with visibility in one place.

- Gmail integration (read threads, last touch, reply detection)
- Email drafting assisted by agent (still human-edited)
- Human-approved sending (send only after approval + explicit confirm)
- Follow-up reminders tied to calendar or SLA rules
- Optional: sequence scheduling (still approval-gated)

**Exit criteria:** Approved draft can be sent from the app; reply status updates account timeline.

---

## Phase 5 — Customer Intelligence

**Goal:** Full customer-journey awareness — not just prospects.

- Customer history awareness (products owned, go-live dates, CSM notes)
- Meeting transcript ingestion (Gong, Zoom, or uploaded notes)
- Product ownership tracking (Orion, Prism, Helios, Atlas, Omnia)
- Upsell opportunity detection from usage, signals, and expansion fit
- Implementation account handling (ClickUp / project status)

**Exit criteria:** Account profile shows accurate customer vs prospect context and expansion plays.

---

## Phase 6 — Marketing Intelligence

**Goal:** Turn field signals into repeatable campaigns and content.

- Campaign recommendations from objection and trend analysis
- Objection tracking aggregated across calls and emails
- Webinar and content topic suggestions by persona and product
- Event follow-up workflows (conference lists, attendee matching)
- Exportable insights for marketing ops (not auto-posting without review)

**Exit criteria:** Marketing Insights module reflects real conversation data, not static mock cards.

---

## Phase 7 — LinkedIn Assistance

**Goal:** Support social selling without automating connection spam.

- Suggested LinkedIn outreach aligned to account context
- Profile matching for decision-makers at target institutions
- Connection and message status tracking
- Human-assisted messaging (draft + approve; no auto-send by default)
- Compliance with LinkedIn terms and internal policy

**Exit criteria:** LinkedIn drafts and status appear on account timeline; same approval rules as email.

---

## Phase 8 — Autonomous Agent Behaviors

**Goal:** Optional automation for mature teams — always configurable and auditable.

- Smarter recommendations (multi-signal ranking, confidence thresholds)
- Trigger-based actions (e.g. new RFP → task + draft proposal)
- Automated CRM updates after approval (not before)
- AI confidence scoring surfaced in UI
- Configurable automation rules per team (what can auto-run vs what cannot)

**Exit criteria:** Teams can enable narrow automations with audit logs; default remains human-in-the-loop.

---

## Technical Debt

Items to address incrementally alongside feature phases:

- **File watching / dev stability** — polling config for EMFILE issues on macOS; document dev setup
- **Client-only state** — migrate `app-store` to server actions + DB (Phase 2)
- **Route and chunk reliability** — keep client boundaries in `components/`, not co-located under `app/` pages
- **Type safety for agent outputs** — structured `AgentInsight` schema end-to-end
- **Testing** — critical paths: approval flow, draft linking, CRM guard rails
- **Auth & secrets** — no API keys in repo; env-based config per integration
- **Observability** — logging and error reporting for sync jobs and send failures

---

## Future Ideas

Not committed — evaluate after Phases 3–5:

- Slack / Teams notifications for pending approvals
- AE handoff workflow with packaged context
- Competitive intelligence feed (public news, peer wins)
- Multi-campus system hierarchy and roll-up reporting
- NPS / health score integration for customer success plays
- Custom product catalog per tenant (white-label institutions)
- Mobile-friendly approval queue for executives on the road

---

## Risks & Challenges

| Risk | Mitigation |
|------|------------|
| **Duplicate outreach** damages relationships | CRM + Gmail checks before recommend; high-severity blocks; owner resolution UX |
| **Over-automation** erodes trust | Human-in-the-loop default; Phase 8 rules opt-in only |
| **Data quality** from public signals | Human review stage; confidence labels; source citations |
| **Integration fragility** (HubSpot, Gmail API limits) | Retries, sync status UI, graceful degradation to read-only |
| **LinkedIn policy / compliance** | No auto-connect; legal review; assist-only mode |
| **Higher Ed buying committees** | Multi-contact account model; role-based messaging |
| **Scope creep across 5 products** | Product fit scoring and clear primary/secondary SKU per account |
| **Security & PII** | Least-privilege OAuth, audit logs, SOC2-minded storage in Phase 2+ |

---

## Suggested Sequencing

```
Phase 1 (done) → Phase 2 → Phase 3 → Phase 4
                      ↘ Phase 5 (parallel after 3)
                      ↘ Phase 6 (after 4–5 data exists)
Phase 7 (after 4) → Phase 8 (last)
```

Phases 5 and 6 can overlap once CRM and email data are reliable. Phase 8 should not start until approval, audit, and integration patterns are proven in production.

---

*Last updated: May 2026*
