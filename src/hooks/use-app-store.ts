"use client";

import { useSyncExternalStore } from "react";
import { getState, subscribe } from "@/lib/store/app-store";

export function useAppStore() {
  return useSyncExternalStore(subscribe, getState, getState);
}
