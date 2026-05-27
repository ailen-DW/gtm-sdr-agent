"use client";

import type { Institution } from "@/lib/types";
import {
  getCrmValidation,
  getLinkedInWorkflow,
  getStakeholdersForAccount,
} from "@/lib/sdr/mock-data";
import { CrmValidationPanel } from "./crm-validation-panel";
import { LinkedInWorkflowPanel } from "./linkedin-workflow-panel";
import { StakeholderDiscoveryPanel } from "./stakeholder-discovery-panel";

export function SdrAccountWorkspace({ account }: { account: Institution }) {
  const validation = getCrmValidation(account);
  const stakeholders = getStakeholdersForAccount(account.id);
  const linkedInSteps = getLinkedInWorkflow(account.id);

  return (
    <section id="sdr" className="scroll-mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-900">
          SDR execution workspace
        </h2>
        <p className="text-xs text-slate-500">
          Research, stakeholders, LinkedIn workflow, and CRM checks — mock demo
        </p>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            CRM validation
          </h3>
          <CrmValidationPanel validation={validation} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Stakeholder discovery
            </h3>
            <StakeholderDiscoveryPanel stakeholders={stakeholders} />
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              LinkedIn outreach workflow
            </h3>
            <LinkedInWorkflowPanel steps={linkedInSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}
