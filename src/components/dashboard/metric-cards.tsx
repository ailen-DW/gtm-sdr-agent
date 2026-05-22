import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import type { DashboardMetrics } from "@/lib/types";

const metrics: {
  key: keyof DashboardMetrics;
  label: string;
  href: string;
  color: string;
}[] = [
  { key: "newProspects", label: "New Prospects", href: "/prospect-discovery", color: "text-brand-600" },
  { key: "needsReview", label: "Needs Review", href: "/accounts?filter=review", color: "text-amber-600" },
  { key: "pendingApprovals", label: "Pending Approvals", href: "/action-queue", color: "text-red-600" },
  { key: "duplicateAlerts", label: "Duplicate Alerts", href: "/accounts?filter=duplicate", color: "text-red-600" },
  { key: "followUpsDue", label: "Follow-ups Due", href: "/action-queue", color: "text-amber-600" },
  { key: "stalledOpportunities", label: "Stalled Opps", href: "/accounts?filter=stalled", color: "text-slate-600" },
  { key: "upsellOpportunities", label: "Upsell Opportunities", href: "/accounts?filter=upsell", color: "text-emerald-600" },
  { key: "existingCustomers", label: "Customers", href: "/accounts?filter=customer", color: "text-emerald-600" },
];

export function MetricCards({ data }: { data: DashboardMetrics }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map((m) => (
        <Link key={m.key} href={m.href}>
          <Card className="transition-shadow hover:shadow-md">
            <CardBody className="py-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {m.label}
              </p>
              <p className={`mt-1 text-3xl font-semibold ${m.color}`}>
                {data[m.key]}
              </p>
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  );
}
