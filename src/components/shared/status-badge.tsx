import { Badge } from "@/components/ui/badge";
import { LIFECYCLE_LABELS } from "@/lib/constants";
import type { LifecycleStatus } from "@/lib/types";
import { formatLabel } from "@/lib/utils";

const lifecycleVariant: Record<
  LifecycleStatus,
  "default" | "success" | "warning" | "danger" | "info" | "muted"
> = {
  new_prospect: "info",
  researching: "muted",
  needs_human_review: "warning",
  ready_for_outreach: "info",
  in_sequence: "info",
  replied: "success",
  meeting_booked: "success",
  passed_to_ae: "success",
  active_opportunity: "info",
  customer: "success",
  implementation: "warning",
  live: "success",
  expansion_opportunity: "success",
  do_not_contact: "danger",
};

export function LifecycleBadge({ status }: { status: LifecycleStatus }) {
  return (
    <Badge variant={lifecycleVariant[status]}>
      {LIFECYCLE_LABELS[status]}
    </Badge>
  );
}

export function CRMBadge({ relationship }: { relationship: string }) {
  const variant =
    relationship === "existing_customer" ||
    relationship === "implementation_account"
      ? "success"
      : relationship === "dormant_lead"
        ? "warning"
        : relationship === "expansion_candidate"
          ? "info"
          : "default";
  return <Badge variant={variant}>{formatLabel(relationship)}</Badge>;
}

export function PriorityBadge({
  priority,
}: {
  priority: "low" | "medium" | "high";
}) {
  const variant =
    priority === "high"
      ? "danger"
      : priority === "medium"
        ? "warning"
        : "muted";
  return <Badge variant={variant}>{priority} priority</Badge>;
}
