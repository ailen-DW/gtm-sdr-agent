"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductBadge } from "@/components/shared/product-badge";
import { MOCK_MARKETING_INSIGHTS } from "@/lib/store/app-store";
import { formatLabel } from "@/lib/utils";

export function MarketingInsightsView() {
  return (
    <>
      <PageHeader
        title="Marketing Insights"
        description="Objections, questions, product confusion, and trends detected across conversations — with campaign recommendations."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {MOCK_MARKETING_INSIGHTS.map((insight) => (
          <Card key={insight.id}>
            <CardHeader
              title={insight.title}
              description={`${formatLabel(insight.type)} · ${insight.frequency} mentions`}
            />
            <CardBody>
              <p className="text-sm text-slate-600">{insight.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {insight.relatedProducts.map((p) => (
                  <ProductBadge key={p} productId={p} />
                ))}
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Suggested campaigns
                </p>
                <ul className="mt-2 space-y-2">
                  {insight.suggestedCampaigns.map((c) => (
                    <li
                      key={c}
                      className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-900"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader title="Agent marketing recommendations" />
        <CardBody className="space-y-3 text-sm text-slate-600">
          <p>
            <Badge variant="info">LinkedIn</Badge> Publish a 5-post series on
            transcript RFP trends targeting registrars (Prism).
          </p>
          <p>
            <Badge variant="info">Webinar</Badge> Co-host with a customer on
            Illuminate → Helios migration timelines.
          </p>
          <p>
            <Badge variant="info">Email sequence</Badge> 3-touch nurture for
            dormant leads with fraud/aid signals (Orion).
          </p>
        </CardBody>
      </Card>
    </>
  );
}
