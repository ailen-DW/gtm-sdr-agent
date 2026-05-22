"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  Mail,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/hooks/use-app-store";

const icons = {
  LayoutDashboard,
  Search,
  Building2,
  ListChecks,
  Mail,
  Lightbulb,
  Settings,
};

const links = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" as const },
  { href: "/prospect-discovery", label: "Prospect Discovery", icon: "Search" as const },
  { href: "/accounts", label: "Accounts", icon: "Building2" as const },
  { href: "/action-queue", label: "Action Queue", icon: "ListChecks" as const },
  { href: "/outreach-drafts", label: "Outreach Drafts", icon: "Mail" as const },
  { href: "/marketing-insights", label: "Marketing Insights", icon: "Lightbulb" as const },
  { href: "/settings", label: "Settings", icon: "Settings" as const },
];

export function Sidebar() {
  const pathname = usePathname();
  const { actions } = useAppStore();
  const pending = actions.filter((a) => a.approvalStatus === "pending").length;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">GTM Agent</p>
          <p className="text-xs text-slate-500">Higher Ed SDR</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {links.map((item) => {
          const Icon = icons[item.icon];
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/action-queue" && pending > 0 && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  {pending}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 px-5 py-4">
        <p className="text-xs font-medium text-slate-700">You&apos;re in control</p>
        <p className="mt-1 text-xs text-slate-500">
          AI recommends · you approve before send
        </p>
      </div>
    </aside>
  );
}
