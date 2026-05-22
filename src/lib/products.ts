import type { ProductId } from "./types";

export interface ProductDefinition {
  id: ProductId;
  name: string;
  tagline: string;
  description: string;
  idealSignals: string[];
  buyerPersonas: string[];
}

export const PRODUCTS: Record<ProductId, ProductDefinition> = {
  orion: {
    id: "orion",
    name: "Orion",
    tagline: "AI fraud detection for admissions & financial aid",
    description:
      "Detects fraudulent applications, enrollment manipulation, and financial aid abuse across admissions, enrollment, and aid workflows.",
    idealSignals: [
      "fraud_concerns",
      "financial_aid_issues",
      "enrollment_challenges",
    ],
    buyerPersonas: [
      "VP Enrollment",
      "Director of Admissions",
      "Financial Aid Director",
    ],
  },
  prism: {
    id: "prism",
    name: "Prism",
    tagline: "Document intelligence for transcripts & records",
    description:
      "Automates transcript intake, verification, and document processing with AI-powered document intelligence.",
    idealSignals: ["transcript_processing", "rfp", "job_posting"],
    buyerPersonas: [
      "Registrar",
      "Director of Records",
      "AVP Academic Operations",
    ],
  },
  helios: {
    id: "helios",
    name: "Helios",
    tagline: "AI workflow platform & Illuminate migration path",
    description:
      "Modern platform for AI agents and workflows; primary migration path from Illuminate for institutions modernizing operations.",
    idealSignals: ["ai_initiatives", "leadership_change", "rfp"],
    buyerPersonas: ["CIO", "CTO", "VP IT", "Chief Digital Officer"],
  },
  atlas: {
    id: "atlas",
    name: "Atlas",
    tagline: "Automation agents for repetitive workflows",
    description:
      "Deploys automation agents for high-volume, repetitive administrative and student services workflows.",
    idealSignals: ["job_posting", "enrollment_challenges", "ai_initiatives"],
    buyerPersonas: [
      "VP Student Services",
      "Director of Operations",
      "Process Improvement Lead",
    ],
  },
  omnia: {
    id: "omnia",
    name: "Omnia",
    tagline: "Executive AI assistant & conversational intelligence",
    description:
      "Executive-facing AI assistant device and hub for leadership briefings, campus intelligence, and conversational analytics.",
    idealSignals: ["ai_initiatives", "leadership_change", "conference"],
    buyerPersonas: ["President", "Provost", "Chancellor", "VP Strategy"],
  },
};

export const PRODUCT_IDS: ProductId[] = [
  "orion",
  "prism",
  "helios",
  "atlas",
  "omnia",
];

export function getProductName(id: ProductId): string {
  return PRODUCTS[id].name;
}
