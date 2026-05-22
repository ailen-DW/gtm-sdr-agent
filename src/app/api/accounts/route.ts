import { NextResponse } from "next/server";
import { MOCK_ACCOUNTS } from "@/lib/mock-data";
import { recommendNextAction } from "@/lib/agent/recommendations";

/** GET accounts with agent recommendations */
export async function GET() {
  const enriched = MOCK_ACCOUNTS.map((account) => ({
    account,
    recommendation: recommendNextAction(account),
  }));
  return NextResponse.json({ accounts: enriched });
}
