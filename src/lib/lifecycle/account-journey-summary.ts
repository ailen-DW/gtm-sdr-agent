import type { Institution } from "../types";
import type { SourceSystem, StageRiskBlocker } from "./journey-stage-types";
import { getAccountJourney } from "./mock-journey-data";

export interface AccountOperationalSummary {
  currentStageLabel: string;
  currentOwnerTeam: string;
  currentOwnerName: string;
  nextRecommendedAction: string;
  openRisks: StageRiskBlocker[];
  linkedSystems: SourceSystem[];
}

export function getAccountOperationalSummary(
  account: Institution
): AccountOperationalSummary {
  const journey = getAccountJourney(account);
  const current = journey.stages.find(
    (s) => s.stageId === journey.currentStageId
  );

  if (!current) {
    return {
      currentStageLabel: "—",
      currentOwnerTeam: "—",
      currentOwnerName: "—",
      nextRecommendedAction: "—",
      openRisks: [],
      linkedSystems: [],
    };
  }

  const linkedSystems = Array.from(
    new Set<SourceSystem>([
      ...current.sourceBadges,
      ...current.sourceReferences.map((r) => r.system),
    ])
  );

  const openRisks = [...current.risks];
  if (account.duplicateRisk && account.duplicateRisk.severity !== "low") {
    openRisks.push({
      category: "duplicate_risk",
      title: "Account-level duplicate risk",
      description: account.duplicateRisk.message,
      severity:
        account.duplicateRisk.severity === "high"
          ? "high"
          : account.duplicateRisk.severity === "medium"
            ? "medium"
            : "low",
    });
  }
  if (account.isStalled && current.stageId !== "proposal_sent") {
    openRisks.push({
      category: "delayed_response",
      title: "Stalled opportunity",
      description: "Deal velocity below threshold — executive review suggested.",
      severity: "medium",
    });
  }

  return {
    currentStageLabel: current.label,
    currentOwnerTeam: current.responsibleOwner,
    currentOwnerName: current.owner,
    nextRecommendedAction: current.nextOwnerAction,
    openRisks,
    linkedSystems,
  };
}
