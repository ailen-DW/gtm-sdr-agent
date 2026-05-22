import { PRODUCTS } from "../products";
import type {
  Institution,
  ProductFitScore,
  ProductId,
  PublicSignal,
  SignalCategory,
} from "../types";

const SIGNAL_PRODUCT_MAP: Partial<Record<SignalCategory, ProductId[]>> = {
  fraud_concerns: ["orion"],
  financial_aid_issues: ["orion"],
  enrollment_challenges: ["orion", "atlas"],
  transcript_processing: ["prism"],
  rfp: ["prism", "helios"],
  ai_initiatives: ["helios", "atlas", "omnia"],
  leadership_change: ["helios", "omnia"],
  job_posting: ["prism", "atlas"],
  conference: ["omnia", "orion"],
};

export function scoreProductFit(
  signals: PublicSignal[],
  crmRelationship: Institution["crmRelationship"],
  existingProducts: ProductId[] = []
): ProductFitScore[] {
  const scores: ProductFitScore[] = [];
  const signalCategories = new Set(signals.map((s) => s.category));

  for (const productId of Object.keys(PRODUCTS) as ProductId[]) {
    let score = 35;
    const matchedSignals: SignalCategory[] = [];

    for (const [cat, products] of Object.entries(SIGNAL_PRODUCT_MAP)) {
      if (
        products?.includes(productId) &&
        signalCategories.has(cat as SignalCategory)
      ) {
        score += 18;
        matchedSignals.push(cat as SignalCategory);
      }
    }

    if (crmRelationship === "existing_customer" && existingProducts.includes(productId)) {
      score = Math.min(score, 25);
    }
    if (crmRelationship === "expansion_candidate") {
      score += existingProducts.includes(productId) ? 5 : 15;
    }
    if (crmRelationship === "implementation_account") {
      score = Math.max(score - 20, 10);
    }

    score = Math.min(100, Math.max(0, score));

    const rationale =
      matchedSignals.length > 0
        ? `Strong fit based on ${matchedSignals.join(", ").replace(/_/g, " ")} signals.`
        : score >= 50
          ? "Moderate fit from institutional profile and sector patterns."
          : "Limited public signals; recommend deeper research.";

    scores.push({ productId, score, rationale });
  }

  return scores.sort((a, b) => b.score - a.score);
}

export function getTopProducts(
  fit: ProductFitScore[],
  limit = 2
): ProductId[] {
  return fit
    .filter((f) => f.score >= 55)
    .slice(0, limit)
    .map((f) => f.productId);
}
