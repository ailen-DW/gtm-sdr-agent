import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";

export function AccountsAttentionKpi({ count }: { count: number }) {
  return (
    <Link href="/accounts?filter=attention" className="mb-6 block">
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50/80 to-white transition-shadow hover:shadow-md">
        <CardBody className="flex items-center justify-between gap-4 py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
              <AlertCircle className="h-5 w-5 text-amber-700" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                Executive priority
              </p>
              <p className="mt-0.5 text-lg font-semibold text-slate-900">
                Accounts requiring attention
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Follow-ups, duplicates, stalled deals, or human review flagged
              </p>
            </div>
          </div>
          <p className="text-4xl font-bold tabular-nums text-amber-700">{count}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
