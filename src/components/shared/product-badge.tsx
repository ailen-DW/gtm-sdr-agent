import { Badge } from "@/components/ui/badge";
import { getProductName } from "@/lib/products";
import type { ProductId } from "@/lib/types";

const colors: Record<ProductId, string> = {
  orion: "bg-violet-50 text-violet-700 ring-violet-200",
  prism: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  helios: "bg-amber-50 text-amber-800 ring-amber-200",
  atlas: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  omnia: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function ProductBadge({ productId }: { productId: ProductId }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${colors[productId]}`}
    >
      {getProductName(productId)}
    </span>
  );
}

export function ProductFitBar({ score }: { score: number }) {
  const color =
    score >= 75 ? "bg-emerald-500" : score >= 55 ? "bg-brand-500" : "bg-slate-300";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-8 text-right text-xs text-slate-500">{score}</span>
    </div>
  );
}
