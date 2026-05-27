"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIReasoningCard } from "@/components/shared/ai-reasoning-card";
import { PriorityBadge } from "@/components/shared/status-badge";
import { ProductBadge } from "@/components/shared/product-badge";
import { buildAgentInsight } from "@/lib/agent/insights";
import { ACTION_TYPE_LABELS } from "@/lib/constants";
import { updateAction } from "@/lib/store/app-store";
import { getAccount } from "@/lib/store/app-store";
import type { RecommendedAction } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function ActionQueueItem({
  action,
  institutionName,
  compactReasoning = false,
  hideInstitutionLink = false,
}: {
  action: RecommendedAction;
  institutionName: string;
  /** Shorter context on account detail — no full reasoning card */
  compactReasoning?: boolean;
  hideInstitutionLink?: boolean;
}) {
  const [note, setNote] = useState("");
  const [expanded, setExpanded] = useState(action.approvalStatus === "pending");
  const account = getAccount(action.accountId);
  const insight = buildAgentInsight(
    account ?? {
      id: action.accountId,
      name: institutionName,
      type: "university",
      location: "",
      summary: "",
      lifecycleStatus: "researching",
      crmRelationship: "cold_prospect",
      productFit: [],
      primaryProducts: [],
      signals: [],
      contacts: [],
      crmRecords: [],
      tags: [],
      notes: [],
      approvalHistory: [],
    },
    action
  );

  const isPending = action.approvalStatus === "pending";

  function handle(status: "approved" | "rejected") {
    updateAction(action.id, {
      approvalStatus: status,
      reviewerNote: note || undefined,
    });
    setExpanded(false);
  }

  return (
    <Card
      className={
        isPending ? "border-amber-200 ring-1 ring-amber-100" : "border-slate-200"
      }
    >
      <CardBody className={compactReasoning ? "space-y-2 py-3" : "space-y-4"}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {hideInstitutionLink ? (
                <span className="font-semibold text-slate-900">{action.title}</span>
              ) : (
                <Link
                  href={`/accounts/${action.accountId}`}
                  className="font-semibold text-slate-900 hover:text-brand-600"
                >
                  {institutionName}
                </Link>
              )}
              <PriorityBadge priority={action.priority} />
              {isPending ? (
                <Badge variant="warning">Awaiting your approval</Badge>
              ) : (
                <Badge
                  variant={
                    action.approvalStatus === "approved" ? "success" : "danger"
                  }
                >
                  {action.approvalStatus}
                </Badge>
              )}
            </div>
            {!hideInstitutionLink && (
              <p className="mt-1 text-sm font-medium text-slate-800">
                {action.title}
              </p>
            )}
            <p className="mt-0.5 text-xs text-slate-500">
              {ACTION_TYPE_LABELS[action.type]}
              {action.dueDate && ` · Due ${formatDate(action.dueDate)}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {action.suggestedProducts.map((p) => (
              <ProductBadge key={p} productId={p} />
            ))}
          </div>
        </div>

        {compactReasoning ? (
          <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
            {action.rationale}
          </p>
        ) : (
          <AIReasoningCard insight={insight} compact />
        )}

        {isPending && (
          <div className={cn("border-t border-slate-100", compactReasoning ? "pt-2" : "pt-4")}>
            {!expanded ? (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                Review and decide →
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-600">
                  You control what gets sent. Approve only when the recommendation
                  and draft look right.
                </p>
                <textarea
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  rows={2}
                  placeholder="Optional note (visible in approval history)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handle("approved")}>Approve</Button>
                  <Button variant="danger" onClick={() => handle("rejected")}>
                    Reject
                  </Button>
                  <Link href={`/outreach-drafts?action=${action.id}`}>
                    <Button variant="secondary">Edit draft first</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
