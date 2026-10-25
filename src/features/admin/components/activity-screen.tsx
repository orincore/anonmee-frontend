"use client";

import {
  CaretLeft,
  CaretRight,
  Clock,
  ChatCircleText,
  Fire,
  MagnifyingGlass,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState, ErrorState, GENDER_LABEL, SimpleTable, StatCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TextField } from "@/components/ui/text-field";
import type { Gender } from "@/contracts";
import { useApi } from "@/hooks/use-api";
import { formatDateTime } from "@/lib/format";
import { DaysPicker } from "./days-picker";

export interface ActivityAnalytics {
  summary: {
    totalScreenTimeSeconds: number;
    averageScreenTimePerUserSeconds: number;
    todayScreenTimeSeconds: number;
    onlineUsersNow: number;
    activeUsersPeriod: number;
    activeUsersToday: number;
    totalMessagesSent: number;
  };
  daily: {
    day: string;
    screenTimeSeconds: number;
    activeUsers: number;
    avgMinutesPerUser: number;
    messagesSent: number;
  }[];
  hourlyActivity: {
    hour: number;
    label: string;
    count: number;
  }[];
  users: {
    id: string;
    username: string;
    email: string;
    gender: Gender;
    age: number;
    totalScreenTimeSeconds: number;
    todayScreenTimeSeconds: number;
    messagesSent: number;
    lastSeenAt: number | null;
    createdAt: number;
    isOnline: boolean;
  }[];
  totalUsers: number;
  page: number;
  totalPages: number;
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${seconds}s`;
}

function Block({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="display text-2xl">{title}</h2>
        {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function ActivityContent({ days, page, search, onPageChange }: { days: number; page: number; search: string; onPageChange: (p: number) => void }) {
  const query = new URLSearchParams({
    days: String(days),
    page: String(page),
    limit: "15",
    ...(search ? { search } : {}),
  }).toString();

  const { data, error, loading, reload } = useApi<ActivityAnalytics>(`/admin/activity?${query}`);

  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-96" />;
  if (!data) return null;

  const { summary, daily, hourlyActivity, users, totalUsers, totalPages } = data;
  const maxDailySeconds = Math.max(1, ...daily.map((d) => d.screenTimeSeconds));
  const maxHourlyCount = Math.max(1, ...hourlyActivity.map((h) => h.count));

  return (
    <div className="space-y-10">
      {/* 1. Summary headline stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Screen Time"
          value={formatDuration(summary.totalScreenTimeSeconds)}
          note="Across all registered users"
          tone="accent"
        />
        <StatCard
          label="Avg Screen Time / User"
          value={formatDuration(summary.averageScreenTimePerUserSeconds)}
          note="Average lifetime per user"
          tone="plain"
        />
        <StatCard
          label="Screen Time Today"
          value={formatDuration(summary.todayScreenTimeSeconds)}
          note={`${summary.activeUsersToday} active users today`}
          tone="pop"
        />
        <StatCard
          label="Online Right Now"
          value={summary.onlineUsersNow}
          note={`${summary.activeUsersPeriod} active in period`}
          tone="brand"
        />
      </div>

      {/* 2. Daily screen time trend */}
      <Block
        title="Daily Screen Time & Usage Trend"
        subtitle={`Active screen time and participant volume per day (last ${days} days)`}
      >
        <div className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
          <div className="flex h-44 items-end gap-1.5 sm:gap-2">
            {daily.map((d) => {
              const heightPercent = Math.max(4, Math.round((d.screenTimeSeconds / maxDailySeconds) * 100));
              return (
                <div
                  key={d.day}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end"
                >
                  {/* Tooltip on hover */}
                  <div className="pointer-events-none absolute -top-14 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md border-2 border-edge bg-fg px-2.5 py-1 text-xs font-bold text-bg shadow-sticker-sm group-hover:block">
                    <div>{d.day}</div>
                    <div className="text-[11px] font-normal opacity-90">
                      {formatDuration(d.screenTimeSeconds)} · {d.activeUsers} users · {d.messagesSent} msgs
                    </div>
                  </div>

                  <span
                    className="w-full rounded-t-sm border-x-2 border-t-2 border-edge bg-accent transition-all duration-150 group-hover:bg-pop"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between font-mono text-xs text-muted">
            <span>{daily[0]?.day}</span>
            <span className="hidden sm:inline">Hover over bars for user and message counts</span>
            <span>{daily[daily.length - 1]?.day}</span>
          </div>
        </div>
      </Block>

      {/* 3. Hourly peak distribution */}
      <Block
        title="24-Hour Peak Activity Distribution"
        subtitle="Historical messaging and usage volume by hour of day (UTC/server time)"
      >
        <div className="rounded-card border-2 border-edge bg-surface p-6 shadow-sticker-sm">
          <div className="flex h-32 items-end gap-1">
            {hourlyActivity.map((h) => {
              const heightPercent = Math.max(4, Math.round((h.count / maxHourlyCount) * 100));
              return (
                <div
                  key={h.hour}
                  className="group relative flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div className="pointer-events-none absolute -top-10 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-edge bg-fg px-2 py-0.5 text-xs font-bold text-bg shadow-sm group-hover:block">
                    {h.label}: {h.count} msgs
                  </div>
                  <span
                    className="w-full rounded-t-sm border-x border-t border-edge bg-pop/80 transition-all duration-150 group-hover:bg-pop"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs text-muted">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>
      </Block>

      {/* 4. Per-User screen time ranking table */}
      <Block
        title="User Screen Time Directory"
        subtitle={`Showing ${users.length} of ${totalUsers} users, sorted by total screen time`}
      >
        {users.length === 0 ? (
          <EmptyState
            icon={User}
            title="No users match this search"
            body="Try clearing your search query."
          />
        ) : (
          <div className="space-y-4">
            <SimpleTable
              rows={users}
              rowKey={(u) => u.id}
              columns={[
                {
                  key: "u",
                  label: "User",
                  render: (u) => (
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="flex size-8 items-center justify-center rounded-full border-2 border-edge bg-surface font-mono font-bold uppercase shadow-sticker-sm">
                          {u.username.slice(0, 1)}
                        </div>
                        {u.isOnline ? (
                          <span
                            title="Online now"
                            className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-emerald-500"
                          />
                        ) : null}
                      </div>
                      <div>
                        <Link
                          href={`/admin/users/${u.id}`}
                          className="font-bold underline underline-offset-2 hover:text-accent"
                        >
                          {u.username}
                        </Link>
                        <div className="text-xs text-muted">{u.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "tot",
                  label: "Total Screen Time",
                  render: (u) => (
                    <div className="inline-flex items-center gap-1.5 font-bold">
                      <Clock weight="bold" className="size-4 text-accent" />
                      <span>{formatDuration(u.totalScreenTimeSeconds)}</span>
                    </div>
                  ),
                },
                {
                  key: "tod",
                  label: "Today",
                  render: (u) => (
                    <span className="font-mono text-sm font-semibold">
                      {formatDuration(u.todayScreenTimeSeconds)}
                    </span>
                  ),
                },
                {
                  key: "msgs",
                  label: "Today's Messages",
                  align: "right",
                  render: (u) => (
                    <span className="font-mono text-sm">
                      {u.messagesSent}
                    </span>
                  ),
                },
                {
                  key: "status",
                  label: "Status / Last Seen",
                  render: (u) => (
                    u.isOnline ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                        Online Now
                      </span>
                    ) : (
                      <span className="text-xs text-muted">
                        {u.lastSeenAt ? formatDateTime(u.lastSeenAt) : "Never"}
                      </span>
                    )
                  ),
                },
                {
                  key: "demo",
                  label: "Gender, Age",
                  render: (u) => (
                    <span className="text-sm text-muted">
                      {GENDER_LABEL[u.gender] || u.gender}, {u.age}
                    </span>
                  ),
                },
                {
                  key: "act",
                  label: "",
                  align: "right",
                  render: (u) => (
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="rounded-full border border-edge px-3 py-1 text-xs font-bold hover:bg-line"
                    >
                      Inspect
                    </Link>
                  ),
                },
              ]}
            />

            {/* Pagination bar */}
            {totalPages > 1 ? (
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-muted">
                  Page {page} of {totalPages} ({totalUsers} total)
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                  >
                    <CaretLeft weight="bold" className="size-4" />
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                  >
                    Next
                    <CaretRight weight="bold" className="size-4" />
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </Block>
    </div>
  );
}

export function ActivityScreen() {
  const [days, setDays] = useState(7);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(text.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [text]);

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
    setPage(1);
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="display text-4xl">User Screen Time & Activity</h1>
          <p className="text-muted">
            Real-time active tab duration, usage trends, and activity metrics across Anonmee.
          </p>
        </div>
        <DaysPicker value={days} onChange={handleDaysChange} />
      </div>

      <div className="max-w-md">
        <TextField
          label="Search directory"
          placeholder="Filter by username or email..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <ActivityContent
        key={`${days}-${page}-${search}`}
        days={days}
        page={page}
        search={search}
        onPageChange={setPage}
      />
    </div>
  );
}
