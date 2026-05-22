"use client";

import { useState } from "react";
import { Search, Radar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { AccountCard } from "@/components/accounts/account-card";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/hooks/use-app-store";
import { scoreProductFit, getTopProducts } from "@/lib/agent/scoring";
import { recommendNextAction } from "@/lib/agent/recommendations";
import { formatLabel } from "@/lib/utils";
import type { Institution } from "@/lib/types";

const MOCK_DISCOVERY_RESULTS: Omit<Institution, "id">[] = [
  {
    name: "Harborview University",
    type: "university",
    location: "Seattle, WA",
    enrollment: 19000,
    summary:
      "New discovery: leadership change + enrollment fraud task force announced.",
    lifecycleStatus: "new_prospect",
    crmRelationship: "cold_prospect",
    productFit: [],
    primaryProducts: [],
    signals: [
      {
        id: "new_sig_1",
        category: "leadership_change",
        title: "New Provost focuses on enrollment integrity",
        summary: "Press release Q2 2026.",
        detectedAt: "2026-05-20",
      },
      {
        id: "new_sig_2",
        category: "fraud_concerns",
        title: "Enrollment fraud task force formed",
        summary: "Campus news.",
        detectedAt: "2026-05-19",
      },
    ],
    contacts: [
      {
        id: "new_con_1",
        name: "Dr. Samuel Reed",
        title: "Provost",
        isPrimary: true,
      },
    ],
    crmRecords: [],
    tags: ["discovered"],
    notes: [],
    approvalHistory: [],
  },
];

export function ProspectDiscoveryView() {
  const { accounts } = useAppStore();
  const [scanning, setScanning] = useState(false);
  const [discovered, setDiscovered] = useState<Institution[]>([]);

  const prospects = accounts.filter((a) =>
    ["new_prospect", "researching", "ready_for_outreach", "needs_human_review"].includes(
      a.lifecycleStatus
    )
  );

  async function runDiscoveryScan() {
    setScanning(true);
    await new Promise((r) => setTimeout(r, 1200));
    const enriched = MOCK_DISCOVERY_RESULTS.map((raw, i) => {
      const fit = scoreProductFit(raw.signals, raw.crmRelationship);
      const inst: Institution = {
        ...raw,
        id: `disc_${i}`,
        productFit: fit,
        primaryProducts: getTopProducts(fit),
      };
      return inst;
    });
    setDiscovered(enriched);
    setScanning(false);
  }

  return (
    <>
      <PageHeader
        title="Prospect Discovery"
        description="Find colleges and universities with public signals — fraud, AI, enrollment, transcripts, RFPs, jobs, conferences, and leadership changes."
        action={
          <Button onClick={runDiscoveryScan} disabled={scanning}>
            <Radar className="h-4 w-4" />
            {scanning ? "Scanning..." : "Run discovery scan"}
          </Button>
        }
      />

      <Card className="mb-8">
        <CardHeader
          title="Signal categories monitored"
          description="MVP uses mock web search — connect LinkedIn & web APIs in Settings"
        />
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {[
              "fraud_concerns",
              "ai_initiatives",
              "enrollment_challenges",
              "financial_aid_issues",
              "transcript_processing",
              "rfp",
              "job_posting",
              "conference",
              "leadership_change",
            ].map((s) => (
              <Badge key={s} variant="info">
                {formatLabel(s)}
              </Badge>
            ))}
          </div>
        </CardBody>
      </Card>

      {discovered.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Latest scan results
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {discovered.map((inst) => {
              const rec = recommendNextAction(inst);
              return (
                <Card key={inst.id}>
                  <CardBody>
                    <div className="flex items-start gap-3">
                      <Search className="h-5 w-5 text-brand-500" />
                      <div>
                        <h3 className="font-semibold">{inst.name}</h3>
                        <p className="text-sm text-slate-500">{inst.location}</p>
                        <p className="mt-2 text-sm text-slate-600">
                          {inst.summary}
                        </p>
                        <p className="mt-2 text-xs text-brand-700">
                          Agent: {rec.action.title}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                          Add to CRM after human review (MVP preview only)
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Prospects in pipeline
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {prospects.map((a) => (
            <AccountCard key={a.id} account={a} />
          ))}
        </div>
      </section>
    </>
  );
}
