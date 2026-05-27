import type { Contact } from "./types";

export type ContactRoleSlot = "primary" | "technical" | "executive";

export interface ClassifiedContacts {
  primary?: Contact;
  technical?: Contact;
  executive?: Contact;
}

const TECHNICAL =
  /\b(cio|cto|chief information|it director|director of it|information technology|technical lead|integration)\b/i;
const EXECUTIVE =
  /\b(chancellor|president|chief executive|provost|executive sponsor)\b/i;
const VP_EXEC = /\b(vp|vice president)\b/i;

function isExecutive(contact: Contact): boolean {
  if (EXECUTIVE.test(contact.title)) return true;
  if (VP_EXEC.test(contact.title) && /student success|enrollment|operations/i.test(contact.title))
    return false;
  return VP_EXEC.test(contact.title) && /chief|executive|system|university/i.test(contact.title);
}

function isTechnical(contact: Contact): boolean {
  return TECHNICAL.test(contact.title);
}

/** Classify contacts for account summary (mock — title-based heuristics). */
export function classifyAccountContacts(contacts: Contact[]): ClassifiedContacts {
  const primary = contacts.find((c) => c.isPrimary) ?? contacts[0];
  const used = new Set<string>();

  if (primary) used.add(primary.id);

  let executive = contacts.find((c) => isExecutive(c) && !used.has(c.id));
  if (executive) used.add(executive.id);
  if (!executive && primary && isExecutive(primary)) {
    executive = primary;
  }

  let technical = contacts.find((c) => isTechnical(c) && !used.has(c.id));
  if (technical) used.add(technical.id);
  if (!technical && primary && isTechnical(primary)) {
    technical = primary;
  }

  const secondary = contacts.find((c) => !used.has(c.id));
  if (!technical && secondary) technical = secondary;

  return { primary, technical, executive };
}
