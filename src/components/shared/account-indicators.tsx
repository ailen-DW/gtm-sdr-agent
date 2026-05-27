"use client";

import { AlertTriangle, Calendar, TrendingUp, PauseCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAccountIndicators } from "@/lib/agent/insights";
import type { Institution } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function AccountIndicators({ account }: { account: Institution }) {
  const { isUpsell, needsFollowUp, hasDuplicateRisk, isStalled } =
    getAccountIndicators(account);

  if (!isUpsell && !needsFollowUp && !hasDuplicateRisk && !isStalled) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {hasDuplicateRisk && (
        <Badge variant="danger" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Duplicate risk
        </Badge>
      )}
      {needsFollowUp && (
        <Badge variant="warning" className="gap-1">
          <Calendar className="h-3 w-3" />
          Follow-up {formatDate(account.followUpDue)}
        </Badge>
      )}
      {isUpsell && (
        <Badge variant="success" className="gap-1">
          <TrendingUp className="h-3 w-3" />
          Upsell opportunity
        </Badge>
      )}
      {isStalled && (
        <Badge variant="warning" className="gap-1">
          <PauseCircle className="h-3 w-3" />
          Stalled
        </Badge>
      )}
    </div>
  );
}
