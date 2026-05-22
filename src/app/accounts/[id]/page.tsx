"use client";

import { useParams } from "next/navigation";
import { AccountProfile } from "@/components/accounts/account-profile";
import { useAppStore } from "@/hooks/use-app-store";

export default function AccountDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { accounts } = useAppStore();
  const account = accounts.find((a) => a.id === id);

  if (!account) {
    return (
      <p className="text-slate-500">Account not found.</p>
    );
  }

  return <AccountProfile account={account} />;
}
