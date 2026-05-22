import {
  Calendar,
  Mail,
  MessageSquare,
  Phone,
  StickyNote,
  UserPlus,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { OutreachTimelineEvent, OutreachEventType } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const eventMeta: Record<
  OutreachEventType,
  { icon: typeof Mail; label: string }
> = {
  email_sent: { icon: Mail, label: "Email" },
  email_opened: { icon: Mail, label: "Opened" },
  reply_received: { icon: MessageSquare, label: "Reply" },
  meeting: { icon: Calendar, label: "Meeting" },
  linkedin: { icon: UserPlus, label: "LinkedIn" },
  call: { icon: Phone, label: "Call" },
  sequence_started: { icon: Mail, label: "Sequence" },
  crm_note: { icon: StickyNote, label: "CRM" },
};

export function OutreachTimeline({ events }: { events: OutreachTimelineEvent[] }) {
  return (
    <Card>
      <CardHeader
        title="Outreach history"
        description="Email, meetings, and CRM activity — cross-system timeline"
      />
      <CardBody>
        {events.length === 0 ? (
          <p className="text-sm text-slate-500">No outreach history recorded yet.</p>
        ) : (
          <ol className="relative border-l border-slate-200 pl-6">
            {events.map((event, i) => {
              const meta = eventMeta[event.type];
              const Icon = meta.icon;
              return (
                <li key={event.id} className={i < events.length - 1 ? "mb-6" : ""}>
                  <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-white ring-2 ring-brand-200">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-medium uppercase text-slate-500">
                      {meta.label}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDate(event.occurredAt)}
                    </span>
                    {event.actor && (
                      <span className="text-xs text-slate-400">· {event.actor}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {event.title}
                  </p>
                  {event.detail && (
                    <p className="mt-0.5 text-sm text-slate-500">{event.detail}</p>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </CardBody>
    </Card>
  );
}
