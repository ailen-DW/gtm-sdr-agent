"use client";

import { useMemo, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { classifyAccountContacts } from "@/lib/account-contacts";
import { getAccountOperationalSummary } from "@/lib/lifecycle/account-journey-summary";
import type { Institution } from "@/lib/types";

function ContactSlot({
  label,
  contact,
}: {
  label: string;
  contact?: { name: string; title: string; email?: string };
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      {contact ? (
        <>
          <p className="mt-0.5 truncate text-sm font-medium text-slate-900">
            {contact.name}
          </p>
          <p className="truncate text-xs text-slate-500">{contact.title}</p>
          {contact.email && (
            <p className="truncate text-xs text-brand-600">{contact.email}</p>
          )}
        </>
      ) : (
        <p className="mt-0.5 text-xs text-slate-400">Not identified</p>
      )}
    </div>
  );
}

function SummaryCell({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm ${className ?? ""}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function AccountSummaryGrid({ account }: { account: Institution }) {
  const summary = useMemo(
    () => getAccountOperationalSummary(account),
    [account]
  );
  const contacts = useMemo(
    () => classifyAccountContacts(account.contacts),
    [account.contacts]
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
      <SummaryCell title="Key contacts" className="sm:col-span-2 xl:col-span-2">
        <div className="grid gap-3 sm:grid-cols-3">
          <ContactSlot label="Primary" contact={contacts.primary} />
          <ContactSlot label="Technical" contact={contacts.technical} />
          <ContactSlot label="Executive sponsor" contact={contacts.executive} />
        </div>
      </SummaryCell>

      <SummaryCell title="Current owner">
        <p className="text-sm font-medium text-slate-900">
          {summary.currentOwnerTeam}
        </p>
        <p className="text-xs text-slate-500">{summary.currentOwnerName}</p>
      </SummaryCell>

      <SummaryCell title="Current stage">
        <p className="text-sm font-medium text-slate-900">
          {summary.currentStageLabel}
        </p>
      </SummaryCell>

      <SummaryCell title="Next recommended action" className="sm:col-span-2 xl:col-span-2">
        <p className="text-sm leading-snug text-slate-800">
          {summary.nextRecommendedAction}
        </p>
      </SummaryCell>

      <SummaryCell title="Open risks / blockers" className="sm:col-span-2 xl:col-span-2">
        {summary.openRisks.length === 0 ? (
          <p className="text-xs text-emerald-700">None flagged</p>
        ) : (
          <ul className="space-y-1">
            {summary.openRisks.slice(0, 3).map((r, i) => (
              <li key={i} className="text-xs text-slate-700">
                <span className="font-medium">{r.title}</span>
                <span className="text-slate-400"> · {r.severity}</span>
              </li>
            ))}
            {summary.openRisks.length > 3 && (
              <li className="text-xs text-slate-400">
                +{summary.openRisks.length - 3} more in stage detail
              </li>
            )}
          </ul>
        )}
      </SummaryCell>

      <SummaryCell title="Linked systems" className="sm:col-span-2 xl:col-span-2">
        <div className="flex flex-wrap gap-1.5">
          {summary.linkedSystems.length === 0 ? (
            <span className="text-xs text-slate-400">—</span>
          ) : (
            summary.linkedSystems.map((s) => (
              <Badge key={s} variant="muted" className="text-[10px]">
                {s}
              </Badge>
            ))
          )}
        </div>
      </SummaryCell>
    </div>
  );
}
