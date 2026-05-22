# GTM SDR Agent — Higher Ed

Internal AI GTM/SDR web app for B2B Higher Education software. MVP ships with mock data and placeholder integrations for HubSpot, ClickUp, Gmail, LinkedIn, and public web search.

## Features

- **Prospect Discovery** — Signal-based prospecting with product fit scoring (Orion, Prism, Helios, Atlas, Omnia)
- **CRM Intelligence** — Cross-system awareness before recommending actions
- **Recommended Actions** — Agent-suggested next steps with rationale
- **Human-in-the-Loop** — Approve, reject, or edit before any send/CRM update
- **Outreach Drafts** — Personalized Higher Ed messaging
- **Marketing Insights** — Objections, trends, and campaign ideas
- **Pipeline Dashboard** — Unified workflow visibility

## Quick start

```bash
cd gtm-sdr-agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
  app/                    # Next.js App Router pages + API routes
  components/             # UI, layout, domain components
  lib/
    types.ts              # Core data models
    products.ts           # Product definitions
    mock-data.ts          # MVP seed data
    agent/
      scoring.ts          # Product fit scoring
      recommendations.ts  # Mock agent logic
    integrations/         # Adapter placeholders (HubSpot, etc.)
    store/                # Client state for approvals (MVP)
```

### Connecting real APIs

1. Implement adapters in `src/lib/integrations/` (see `index.ts`).
2. Replace `checkCRMIntelligence()` with parallel API calls.
3. Point API routes at your database and agent worker.
4. Enable integrations in **Settings**.

### API routes (MVP)

- `GET /api/accounts` — Accounts + agent recommendations
- `GET /api/actions` — Recommended actions
- `PATCH /api/actions/[id]` — Approval updates (placeholder persistence)

## Human-in-the-loop

By default, the agent **never** sends email or writes to CRM. All actions flow through the **Action Queue** for approval.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide icons
