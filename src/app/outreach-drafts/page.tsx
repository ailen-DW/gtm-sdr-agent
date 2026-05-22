"use client";

import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import OutreachDraftsContent from "@/components/outreach/outreach-drafts-content";

function OutreachDraftsFallback() {
  return (
    <div className="space-y-4">
      <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
      <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
    </div>
  );
}

export default function OutreachDraftsPage() {
  return (
    <>
      <PageHeader
        title="Outreach Drafts"
        description="Personalized email and LinkedIn drafts for Higher Ed leaders. Edit before approval — nothing sends automatically."
      />
      <Suspense fallback={<OutreachDraftsFallback />}>
        <OutreachDraftsContent />
      </Suspense>
    </>
  );
}
