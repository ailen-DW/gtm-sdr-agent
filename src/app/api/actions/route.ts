import { NextResponse } from "next/server";
import { MOCK_ACTIONS } from "@/lib/mock-data";

/** GET all recommended actions — replace with DB + agent worker in production */
export async function GET() {
  return NextResponse.json({ actions: MOCK_ACTIONS });
}
