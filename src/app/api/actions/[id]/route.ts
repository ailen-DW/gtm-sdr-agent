import { NextRequest, NextResponse } from "next/server";
import { MOCK_ACTIONS } from "@/lib/mock-data";

/** PATCH action approval — wire to HubSpot task creation after approval */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const action = MOCK_ACTIONS.find((a) => a.id === id);

  if (!action) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (body.approvalStatus) {
    action.approvalStatus = body.approvalStatus;
  }
  if (body.editedDraft) {
    action.editedDraft = body.editedDraft;
  }

  return NextResponse.json({
    action,
    message:
      "[MVP] State updated in response only — client store handles UI persistence.",
  });
}
