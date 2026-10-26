"use client";

import { useState } from "react";
import { BarSeries, ErrorState, StatCard } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { DaysPicker } from "./days-picker";

interface Overview {
  totalUsers: number; newUsers: number; newUsersPrevious: number; bannedUsers: number; onlineNow: number;
  matches: number; averageWaitMs: number; matchSuccessRate: number | null; groupsCreated: number; messagesSent: number; openReports: number;
  daily: { day: string; users: number; matches: number }[];
  viralShares?: number;
}

function Body({ days }: { days: number }) {
  const { data, error, loading, reload } = useApi<Overview>(`/admin/overview?days=${days}`);
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="h-28" />)}</div>;
  if (!data) return null;
  const delta = data.newUsers - data.newUsersPrevious;
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={data.totalUsers} tone="brand" note={`${data.bannedUsers} banned`} />
        <StatCard label="New users" value={data.newUsers} note={`${delta >= 0 ? "+" : ""}${delta} vs the period before`} />
        <StatCard label="Online now" value={data.onlineNow} tone="accent" />
        <StatCard label="Open reports" value={data.openReports} tone={data.openReports ? "pop" : "plain"} />
        <StatCard label="Matches" value={data.matches} />
        <StatCard label="Average wait" value={`${(data.averageWaitMs / 1000).toFixed(1)}s`} />
        <StatCard label="Chats that lasted a minute" value={data.matchSuccessRate === null ? "n/a" : `${data.matchSuccessRate}%`} />
        <StatCard label="Messages in groups" value={data.messagesSent} note={`${data.groupsCreated} new groups`} />
        <StatCard label="Viral shares & invites" value={data.viralShares ?? 0} tone="pop" note="WhatsApp, Telegram, X, Reddit" />
      </div>
      <section className="space-y-3">
        <h2 className="display text-2xl">New users per day</h2>
        <BarSeries data={data.daily.map((d) => ({ label: d.day, value: d.users }))} summary="New users per day" />
      </section>
      <section className="space-y-3">
        <h2 className="display text-2xl">Matches per day</h2>
        <BarSeries data={data.daily.map((d) => ({ label: d.day, value: d.matches }))} summary="Matches per day" />
      </section>
    </div>
  );
}

export function OverviewScreen() {
  const [days, setDays] = useState(7);
  return (
    <div className="space-y-6">
      <h1 className="display text-4xl">Overview</h1>
      <DaysPicker value={days} onChange={setDays} />
      <Body key={days} days={days} />
    </div>
  );
}
