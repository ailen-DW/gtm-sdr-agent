/**
 * Integration layer — MVP uses placeholders; swap implementations for live APIs.
 */
import type { CRMRecord, IntegrationConfig, Institution } from "../types";

export interface IntegrationAdapter {
  id: IntegrationConfig["id"];
  searchInstitution(name: string): Promise<CRMRecord[]>;
  getContactHistory(email: string): Promise<CRMRecord[]>;
}

const PLACEHOLDER_NOTE =
  "[MVP] Placeholder integration — connect API credentials in Settings.";

export const INTEGRATION_CONFIGS: IntegrationConfig[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    enabled: false,
    status: "placeholder",
    description: "CRM contacts, deals, and activity history",
  },
  {
    id: "clickup",
    name: "ClickUp",
    enabled: false,
    status: "placeholder",
    description: "Implementation tasks and account project tracking",
  },
  {
    id: "gmail",
    name: "Gmail",
    enabled: false,
    status: "placeholder",
    description: "Email thread history and last-touch dates",
  },
  {
    id: "linkedin",
    name: "LinkedIn / Public Web",
    enabled: false,
    status: "placeholder",
    description: "Prospect research and public signals",
  },
  {
    id: "web_search",
    name: "Web Search",
    enabled: false,
    status: "placeholder",
    description: "News, RFPs, and public institution signals",
  },
  {
    id: "conferences",
    name: "Conference Lists",
    enabled: false,
    status: "placeholder",
    description: "EDUCAUSE, NACAC, and event attendee matching",
  },
];

/** Simulates cross-system CRM lookup before recommending actions */
export async function checkCRMIntelligence(
  institution: Institution
): Promise<{
  records: CRMRecord[];
  relationship: Institution["crmRelationship"];
  duplicateRisk?: Institution["duplicateRisk"];
}> {
  // In production: parallel fetch from hubspot, clickup, gmail adapters
  await simulateLatency(80);
  return {
    records: institution.crmRecords,
    relationship: institution.crmRelationship,
    duplicateRisk: institution.duplicateRisk,
  };
}

export async function syncFromHubSpot(
  _hubspotId: string
): Promise<CRMRecord | null> {
  await simulateLatency(120);
  return null;
}

function simulateLatency(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
