"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/hooks/use-app-store";
import { updateDraft } from "@/lib/store/app-store";
import { ACTION_TYPE_LABELS } from "@/lib/constants";
import { formatLabel } from "@/lib/utils";

export default function OutreachDraftsContent() {
  const searchParams = useSearchParams();
  const actionId = searchParams.get("action");

  return (
    <OutreachDraftsList actionId={actionId} />
  );
}

function OutreachDraftsList({ actionId }: { actionId: string | null }) {
  const { accounts, drafts, actions } = useAppStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const highlightRef = useRef<HTMLDivElement | null>(null);

  const linkedAction = actionId
    ? actions.find((a) => a.id === actionId)
    : undefined;

  const matchedDraft = actionId
    ? drafts.find((d) => d.actionId === actionId)
    : undefined;

  const sortedDrafts = useMemo(() => {
    if (!actionId || !matchedDraft) return drafts;
    return [
      matchedDraft,
      ...drafts.filter((d) => d.id !== matchedDraft.id),
    ];
  }, [drafts, actionId, matchedDraft]);

  useEffect(() => {
    if (matchedDraft && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setEditingId(matchedDraft.id);
      setEditBody(matchedDraft.body);
      setEditSubject(matchedDraft.subject ?? "");
    }
  }, [matchedDraft?.id]);

  function startEdit(draftId: string, body: string, subject?: string) {
    setEditingId(draftId);
    setEditBody(body);
    setEditSubject(subject ?? "");
  }

  function saveEdit(draftId: string) {
    updateDraft(draftId, editBody, editSubject);
    setEditingId(null);
  }

  if (actionId && !matchedDraft) {
    const account = linkedAction
      ? accounts.find((a) => a.id === linkedAction.accountId)
      : undefined;

    return (
      <Card className="border-amber-200 bg-amber-50/50">
        <CardBody className="py-8 text-center">
          <FileText className="mx-auto h-10 w-10 text-amber-600" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No draft for this action yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            {linkedAction ? (
              <>
                Action <span className="font-medium">{linkedAction.title}</span>
                {account && (
                  <>
                    {" "}
                    for <span className="font-medium">{account.name}</span>
                  </>
                )}{" "}
                does not have an outreach draft attached. You can approve from
                the queue or create messaging manually.
              </>
            ) : (
              <>We couldn&apos;t find action {actionId}. It may have been removed.</>
            )}
          </p>
          {linkedAction && (
            <p className="mt-2 text-xs text-slate-500">
              Type: {ACTION_TYPE_LABELS[linkedAction.type]} ·{" "}
              {formatLabel(linkedAction.approvalStatus)}
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/action-queue">
              <Button variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                Back to Action Queue
              </Button>
            </Link>
            {account && (
              <Link href={`/accounts/${account.id}`}>
                <Button variant="ghost">View account</Button>
              </Link>
            )}
            <Link href="/outreach-drafts">
              <Button variant="ghost">All drafts</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (drafts.length === 0) {
    return (
      <Card>
        <CardBody className="py-12 text-center">
          <FileText className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-4 text-sm font-medium text-slate-700">
            No outreach drafts yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Drafts appear when the agent recommends email or LinkedIn outreach.
          </p>
          <Link href="/action-queue" className="mt-4 inline-block">
            <Button variant="secondary">Go to Action Queue</Button>
          </Link>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {actionId && matchedDraft && (
        <p className="text-sm text-brand-700">
          Showing draft linked to your selected action — edit below, then return
          to the queue to approve.
        </p>
      )}

      {sortedDrafts.map((draft) => {
        const account = accounts.find((a) => a.id === draft.accountId);
        const contact = account?.contacts.find((c) => c.id === draft.contactId);
        const action = actions.find((a) => a.id === draft.actionId);
        const isHighlighted = draft.actionId === actionId;
        const isEditing = editingId === draft.id;

        return (
          <div
            key={draft.id}
            id={`draft-${draft.id}`}
            ref={isHighlighted ? highlightRef : undefined}
          >
            <Card
              className={
                isHighlighted
                  ? "ring-2 ring-brand-400 shadow-md"
                  : undefined
              }
            >
              <CardHeader
                title={account?.name ?? "Unknown institution"}
                description={`${contact?.name ?? "Contact"} · ${draft.channel}`}
                action={
                  action ? (
                    <Badge
                      variant={
                        action.approvalStatus === "pending"
                          ? "warning"
                          : action.approvalStatus === "approved"
                            ? "success"
                            : "danger"
                      }
                    >
                      {formatLabel(action.approvalStatus)}
                    </Badge>
                  ) : undefined
                }
              />
              <CardBody>
                {isEditing ? (
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-slate-500">
                      Subject
                    </label>
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                      placeholder="Subject line"
                    />
                    <label className="block text-xs font-medium text-slate-500">
                      Message
                    </label>
                    <textarea
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-900 shadow-sm"
                      rows={12}
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => saveEdit(draft.id)}>
                        Save edits
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-slate-800">
                      Subject: {draft.subject ?? "(no subject)"}
                    </p>
                    <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-slate-100 bg-slate-50 p-4 font-sans text-sm leading-relaxed text-slate-700">
                      {draft.body}
                    </pre>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          startEdit(draft.id, draft.body, draft.subject)
                        }
                      >
                        Edit draft
                      </Button>
                      {action && (
                        <Link href="/action-queue">
                          <Button variant="ghost">Back to queue</Button>
                        </Link>
                      )}
                      <Link href={`/accounts/${draft.accountId}`}>
                        <Button variant="ghost">View account</Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
