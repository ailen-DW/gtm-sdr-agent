"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  CheckSquare,
  TrendingUp,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Institution } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function TodayPriorities({
  pendingCount,
  followUps,
  duplicates,
  upsells,
}: {
  pendingCount: number;
  followUps: Institution[];
  duplicates: Institution[];
  upsells: Institution[];
}) {
  const items = [
    {
      icon: CheckSquare,
      label: "Approvals waiting",
      count: pendingCount,
      href: "/action-queue",
      color: "text-brand-600 bg-brand-50",
      show: pendingCount > 0,
    },
    {
      icon: Calendar,
      label: "Follow-ups due",
      count: followUps.length,
      href: "/accounts?filter=followup",
      color: "text-amber-700 bg-amber-50",
      show: followUps.length > 0,
    },
    {
      icon: AlertTriangle,
      label: "Duplicate risks",
      count: duplicates.length,
      href: "/accounts?filter=duplicate",
      color: "text-red-700 bg-red-50",
      show: duplicates.length > 0,
    },
    {
      icon: TrendingUp,
      label: "Upsell opportunities",
      count: upsells.length,
      href: "/accounts?filter=upsell",
      color: "text-emerald-700 bg-emerald-50",
      show: upsells.length > 0,
    },
  ].filter((i) => i.show);

  return (
    <section className="mb-8">
      <SectionHeader
        title="Today's priorities"
        description="What needs your attention before the AI takes any outbound action"
      />
      {items.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-sm text-slate-500">
              No urgent items — review the pipeline below or run prospect discovery.
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardBody className="flex items-center gap-3 py-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-slate-900">
                        {item.count}
                      </p>
                      <p className="text-xs font-medium text-slate-600">
                        {item.label}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
      {followUps.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {followUps.slice(0, 3).map((a) => (
            <li key={a.id}>
              <Link
                href={`/accounts/${a.id}`}
                className="hover:text-brand-600"
              >
                {a.name}
              </Link>
              <span className="text-slate-400">
                {" "}
                — due {formatDate(a.followUpDue)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
