import { Suspense } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { AccountsList } from "./accounts-list";

export default function AccountsPage() {
  return (
    <>
      <PageHeader
        title="Accounts"
        description="Every institution with lifecycle stage, product fit, outreach history, and AI recommendations — filter by what needs attention."
      />
      <Suspense fallback={<p className="text-sm text-slate-500">Loading...</p>}>
        <AccountsList />
      </Suspense>
    </>
  );
}
