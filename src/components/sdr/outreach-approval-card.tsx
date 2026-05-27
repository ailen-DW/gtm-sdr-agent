"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/shared/status-badge";
import { ProductBadge } from "@/components/shared/product-badge";
import { updateAction, updateDraft } from "@/lib/store/app-store";
import { getOutreachApprovalPackage } from "@/lib/sdr/mock-data";
import { ACTION_TYPE_LABELS } from "@/lib/constants";
import type { RecommendedAction, OutreachDraft } from "@/lib/types";
import type { OutreachApprovalPackage } from "@/lib/sdr/types";
import { formatDate } from "@/lib/utils";

export function OutreachApprovalCard({
  action,
  institutionName,
  drafts,
}: {
  action: RecommendedAction;
  institutionName: string;
  drafts: OutreachDraft[];
}) {
  const pkg = getOutreachApprovalPackage(action.id, drafts);
  const emailDraft = drafts.find(
    (d) => d.actionId === action.id && d.channel === "email"
  );
  const linkedInDraft = drafts.find(
    (d) => d.actionId === action.id && d.channel === "linkedin"
  );

  const [emailBody, setEmailBody] = useState(emailDraft?.body ?? "");
  const [emailSubject, setEmailSubject] = useState(emailDraft?.subject ?? "");
  const [linkedInBody, setLinkedInBody] = useState(linkedInDraft?.body ?? "");
  const [editing, setEditing] = useState(false);
  const [variationNote, setVariationNote] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const isPending = action.approvalStatus === "pending";

  function saveDrafts() {
    if (emailDraft) updateDraft(emailDraft.id, emailBody, emailSubject);
    if (linkedInDraft) updateDraft(linkedInDraft.id, linkedInBody);
    setEditing(false);
  }

  function handle(status: "approved" | "rejected") {
    if (editing) saveDrafts();
    updateAction(action.id, {
      approvalStatus: status,
      reviewerNote: note || undefined,
    });
  }

  function requestVariation() {
    setVariationNote(
      "New draft variation queued (mock) — agent will regenerate within 15 minutes."
    );
  }

  return (
    <Card
      className={
        isPending ? "border-amber-200 ring-1 ring-amber-100" : "border-slate-200"
      }
    >
      <CardBody className="space-y-3 py-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              href={`/accounts/${action.accountId}`}
              className="text-sm font-semibold text-slate-900 hover:text-brand-600"
            >
              {institutionName}
            </Link>
            <p className="mt-0.5 text-sm font-medium text-slate-800">{action.title}</p>
            <p className="text-xs text-slate-500">
              {ACTION_TYPE_LABELS[action.type]}
              {action.dueDate && ` · Due ${formatDate(action.dueDate)}`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <PriorityBadge priority={action.priority} />
            {isPending ? (
              <Badge variant="warning">Awaiting approval</Badge>
            ) : (
              <Badge
                variant={
                  action.approvalStatus === "approved" ? "success" : "danger"
                }
              >
                {action.approvalStatus}
              </Badge>
            )}
            {action.suggestedProducts.map((p) => (
              <ProductBadge key={p} productId={p} />
            ))}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
          {action.rationale}
        </p>

        {pkg && (
          <div className="grid gap-3 lg:grid-cols-2">
            <DraftBlock
              title="Email draft"
              editing={editing}
              subject={emailSubject}
              body={emailBody}
              onSubjectChange={setEmailSubject}
              onBodyChange={setEmailBody}
              emptyLabel="No email draft"
            />
            <DraftBlock
              title="LinkedIn draft"
              editing={editing}
              body={linkedInBody}
              onBodyChange={setLinkedInBody}
              emptyLabel="No LinkedIn draft"
            />
          </div>
        )}

        {pkg && (
          <CadenceStrip cadence={pkg.cadence} />
        )}

        {variationNote && (
          <p className="rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-800">
            {variationNote}
          </p>
        )}

        {isPending && (
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <textarea
              className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs"
              rows={1}
              placeholder="Optional approval note…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              <Button className="px-3 py-1.5 text-xs" onClick={() => handle("approved")}>
                Approve outreach
              </Button>
              <Button
                className="px-3 py-1.5 text-xs"
                variant="secondary"
                onClick={() => {
                  setEditing(!editing);
                  if (editing) saveDrafts();
                }}
              >
                {editing ? "Save edits" : "Edit draft"}
              </Button>
              <Button
                className="px-3 py-1.5 text-xs"
                variant="secondary"
                onClick={requestVariation}
              >
                Request variation
              </Button>
              <Button
                className="px-3 py-1.5 text-xs"
                variant="danger"
                onClick={() => handle("rejected")}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

function DraftBlock({
  title,
  editing,
  subject,
  body,
  onSubjectChange,
  onBodyChange,
  emptyLabel,
}: {
  title: string;
  editing: boolean;
  subject?: string;
  body: string;
  onSubjectChange?: (v: string) => void;
  onBodyChange: (v: string) => void;
  emptyLabel: string;
}) {
  if (!body && !subject) {
    return (
      <div className="rounded-md border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-400">
        {title}: {emptyLabel}
      </div>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase text-slate-500">{title}</p>
      {editing ? (
        <div className="mt-1 space-y-1">
          {onSubjectChange && (
            <input
              className="w-full rounded border border-slate-200 px-2 py-1 text-xs"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              placeholder="Subject"
            />
          )}
          <textarea
            className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-sans"
            rows={4}
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
          />
        </div>
      ) : (
        <>
          {subject && (
            <p className="mt-1 text-xs font-medium text-slate-800">{subject}</p>
          )}
          <pre className="mt-1 max-h-24 overflow-y-auto whitespace-pre-wrap font-sans text-xs text-slate-600">
            {body}
          </pre>
        </>
      )}
    </div>
  );
}

function CadenceStrip({
  cadence,
}: {
  cadence: OutreachApprovalPackage["cadence"];
}) {
  return (
    <div className="rounded-md border border-slate-100 bg-white px-3 py-2">
      <p className="text-[10px] font-semibold uppercase text-slate-500">
        Suggested follow-up cadence
      </p>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {cadence.map((step) => (
          <span
            key={step.day}
            className="inline-flex items-center gap-1 rounded bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600 ring-1 ring-slate-100"
          >
            <span className="font-semibold text-slate-800">D{step.day}</span>
            {step.channel} · {step.action}
          </span>
        ))}
      </div>
    </div>
  );
}
