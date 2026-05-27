"use client";

import { useMemo, useState } from "react";
import { Radar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { AccountCard } from "@/components/accounts/account-card";
import { LeadDiscoveryFeed } from "@/components/sdr/lead-discovery-feed";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/hooks/use-app-store";
import { getDiscoveryLeads } from "@/lib/sdr/mock-data";

export function ProspectDiscoveryView() {
  const { accounts } = useAppStore();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  const leads = useMemo(() => getDiscoveryLeads(), []);

  const prospects = accounts.filter((a) =>
    ["new_prospect", "researching", "ready_for_outreach", "needs_human_review"].includes(
      a.lifecycleStatus
    )
  );

  async function runDiscoveryScan() {
    setScanning(true);
    setScanComplete(false);
    await new Promise((r) => setTimeout(r, 900));
    setScanning(false);
    setScanComplete(true);
  }

  return (
    <>
      <PageHeader
        title="Lead Discovery"
        description="AI-assisted outbound workspace — find institutions, validate CRM, discover stakeholders, and prepare outreach for approval."
        action={
          <Button onClick={runDiscoveryScan} disabled={scanning}>
            <Radar className="h-4 w-4" />
            {scanning ? "Scanning signals…" : "Refresh discovery feed"}
          </Button>
        }
      />

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Discovery feed</h2>
          <span className="text-xs text-slate-500">
            {leads.length} institutions · mock sources
          </span>
        </div>
        {scanComplete ? (
          <LeadDiscoveryFeed leads={leads} />
        ) : (
          <p className="text-sm text-slate-500">Loading latest signals…</p>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">
          Prospects in pipeline
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {prospects.map((a) => (
            <AccountCard key={a.id} account={a} />
          ))}
        </div>
      </section>
    </>
  );
}
