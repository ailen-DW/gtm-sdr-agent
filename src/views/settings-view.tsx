"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTEGRATION_CONFIGS } from "@/lib/integrations";
import { PRODUCTS, PRODUCT_IDS } from "@/lib/products";

export function SettingsView() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Integration placeholders and product configuration. Connect live APIs when ready."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Integrations"
            description="MVP — enable and connect in production"
          />
          <CardBody className="space-y-4">
            {INTEGRATION_CONFIGS.map((config) => (
              <div
                key={config.id}
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-100 p-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{config.name}</p>
                  <p className="text-sm text-slate-500">{config.description}</p>
                </div>
                <Badge variant="warning">{config.status}</Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Product catalog" />
          <CardBody className="space-y-4">
            {PRODUCT_IDS.map((id) => (
              <div key={id} className="border-b border-slate-50 pb-4 last:border-0">
                <p className="font-semibold text-slate-900">{PRODUCTS[id].name}</p>
                <p className="text-sm text-slate-600">{PRODUCTS[id].tagline}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {PRODUCTS[id].description}
                </p>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Human-in-the-loop policy" />
          <CardBody className="text-sm text-slate-600 space-y-2">
            <p>✓ All outreach requires explicit approval before send.</p>
            <p>✓ CRM writes are disabled until HubSpot adapter is connected.</p>
            <p>✓ Duplicate risk blocks automated outreach recommendations.</p>
            <p>
              To change policy later, update{" "}
              <code className="rounded bg-slate-100 px-1">src/lib/integrations</code>{" "}
              and approval middleware.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
