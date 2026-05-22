"use client";

import {
  MOCK_ACCOUNTS,
  MOCK_ACTIONS,
  MOCK_DRAFTS,
  MOCK_MARKETING_INSIGHTS,
} from "../mock-data";
import type {
  ApprovalHistoryEntry,
  Institution,
  OutreachDraft,
  RecommendedAction,
} from "../types";

export interface AppState {
  accounts: Institution[];
  actions: RecommendedAction[];
  drafts: OutreachDraft[];
}

let state: AppState = {
  accounts: structuredClone(MOCK_ACCOUNTS),
  actions: structuredClone(MOCK_ACTIONS),
  drafts: structuredClone(MOCK_DRAFTS),
};

const listeners = new Set<() => void>();

export function getState(): AppState {
  return state;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((l) => l());
}

export function updateAction(
  actionId: string,
  update: Partial<RecommendedAction> & {
    approvalStatus?: RecommendedAction["approvalStatus"];
    reviewerNote?: string;
  }
) {
  const action = state.actions.find((a) => a.id === actionId);
  if (!action) return;

  Object.assign(action, update);

  if (update.approvalStatus) {
    const account = state.accounts.find((a) => a.id === action.accountId);
    if (account) {
      const entry: ApprovalHistoryEntry = {
        id: `hist_${Date.now()}`,
        actionId,
        status: update.approvalStatus,
        reviewerNote: update.reviewerNote,
        timestamp: new Date().toISOString(),
      };
      account.approvalHistory.unshift(entry);
    }
  }

  notify();
}

export function updateDraft(draftId: string, body: string, subject?: string) {
  const draft = state.drafts.find((d) => d.id === draftId);
  if (draft) {
    draft.body = body;
    if (subject !== undefined) draft.subject = subject;
    notify();
  }
}

export function getAccount(id: string): Institution | undefined {
  return state.accounts.find((a) => a.id === id);
}

export function getActionsForAccount(accountId: string): RecommendedAction[] {
  return state.actions.filter((a) => a.accountId === accountId);
}

export function getDraftsForAccount(accountId: string): OutreachDraft[] {
  return state.drafts.filter((d) => d.accountId === accountId);
}

export { MOCK_MARKETING_INSIGHTS };
