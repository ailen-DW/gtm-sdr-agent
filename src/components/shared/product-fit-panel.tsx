import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { ProductBadge, ProductFitBar } from "@/components/shared/product-badge";
import type { ProductFitScore } from "@/lib/types";

export function ProductFitPanel({ fit }: { fit: ProductFitScore[] }) {
  const sorted = [...fit].sort((a, b) => b.score - a.score);

  return (
    <Card>
      <CardHeader
        title="Product fit"
        description="Scored from public signals and CRM context"
      />
      <CardBody className="space-y-4">
        {sorted.map((f) => (
          <div key={f.productId}>
            <div className="mb-1.5 flex items-center justify-between">
              <ProductBadge productId={f.productId} />
              <span className="text-xs text-slate-500">
                {f.score >= 75 ? "Strong" : f.score >= 55 ? "Moderate" : "Low"}
              </span>
            </div>
            <ProductFitBar score={f.score} />
            {f.rationale && (
              <p className="mt-1 text-xs text-slate-500">{f.rationale}</p>
            )}
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
