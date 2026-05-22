import type { Institution, OutreachTimelineEvent } from "./types";

/** MVP: derive timeline from CRM records + mock touches */
export function getOutreachHistory(account: Institution): OutreachTimelineEvent[] {
  const events: OutreachTimelineEvent[] = [];

  if (account.hubspotId) {
    events.push({
      id: `${account.id}_hs`,
      type: "crm_note",
      title: "HubSpot record synced",
      detail: account.crmRecords.find((r) => r.source === "hubspot")?.summary,
      occurredAt: "2026-05-01",
    });
  }

  const gmail = account.crmRecords.find((r) => r.source === "gmail");
  if (gmail) {
    events.push({
      id: `${account.id}_gmail`,
      type: "email_sent",
      title: "Prior email thread",
      detail: gmail.summary,
      actor: "SDR",
      occurredAt: "2025-01-14",
    });
  }

  const meeting = account.crmRecords.find((r) => r.source === "meeting_notes");
  if (meeting) {
    events.push({
      id: `${account.id}_mtg`,
      type: "meeting",
      title: "Product demo",
      detail: meeting.summary,
      occurredAt: "2026-03-28",
    });
  }

  if (account.signals.some((s) => s.category === "conference")) {
    events.push({
      id: `${account.id}_conf`,
      type: "crm_note",
      title: "Conference touchpoint",
      detail: account.signals.find((s) => s.category === "conference")?.title,
      occurredAt: "2026-04-05",
    });
  }

  if (account.lifecycleStatus === "in_sequence") {
    events.push({
      id: `${account.id}_seq`,
      type: "sequence_started",
      title: "Outreach sequence started",
      detail: "Awaiting reply — step 2 scheduled",
      occurredAt: "2026-05-10",
    });
  }

  if (account.approvalHistory.length > 0) {
    const latest = account.approvalHistory[0];
    events.push({
      id: latest.id,
      type: "crm_note",
      title: `Action ${latest.status}`,
      detail: latest.reviewerNote,
      actor: "You",
      occurredAt: latest.timestamp.slice(0, 10),
    });
  }

  return events.sort(
    (a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime()
  );
}
