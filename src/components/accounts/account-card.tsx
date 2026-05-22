import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import { AccountIndicators } from "@/components/shared/account-indicators";
import { LifecycleBadge, CRMBadge } from "@/components/shared/status-badge";
import { ProductBadge, ProductFitBar } from "@/components/shared/product-badge";
import type { Institution } from "@/lib/types";
import { getTopProducts } from "@/lib/agent/scoring";

export function AccountCard({ account }: { account: Institution }) {
  const topProducts = getTopProducts(account.productFit, 2);
  const topScore = account.productFit.length
    ? Math.max(...account.productFit.map((f) => f.score))
    : 0;

  return (
    <Link href={`/accounts/${account.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardBody>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-900">
                {account.name}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">{account.location}</p>

              <div className="mt-3">
                <AccountIndicators account={account} />
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <LifecycleBadge status={account.lifecycleStatus} />
                <CRMBadge relationship={account.crmRelationship} />
              </div>

              {topProducts.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Top product fit
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {topProducts.map((p) => (
                      <ProductBadge key={p} productId={p} />
                    ))}
                  </div>
                  <div className="mt-2 max-w-xs">
                    <ProductFitBar score={topScore} />
                  </div>
                </div>
              )}
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
