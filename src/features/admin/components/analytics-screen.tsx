"use client";

import { useState } from "react";
import { BarSeries, ErrorState, SimpleTable, StatCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { api, ApiError } from "@/lib/api";
import { DaysPicker } from "./days-picker";

interface Analytics {
  channels: { channel: string; visits: number; visitors: number; signups: number; conversion: number }[];
  topSources: { channel: string; source: string | null; visits: number; signups: number }[];
  topCampaigns: { campaign: string | null; source: string | null; medium: string | null; visits: number; visitors: number; signups: number }[];
  seoDaily: { day: string; visits: number }[];
  seoLandingPages: { path: string; visits: number }[];
  llmSources: { source: string | null; visits: number }[];
  shares?: {
    total: number;
    byChannel: Record<string, number>;
    topRooms: { roomId: string; count: number }[];
  };
  lastIndexNow?: {
    ok: boolean;
    status: number;
    count: number;
    host: string;
    submittedAt?: number;
    error?: string;
  } | null;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="display text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Body({ days }: { days: number }) {
  const { data, error, loading, reload } = useApi<Analytics>(`/admin/analytics?days=${days}`);
  const [submittingIndexNow, setSubmittingIndexNow] = useState(false);
  const [indexNowStatus, setIndexNowStatus] = useState<string | null>(null);

  const handleIndexNowSubmit = async () => {
    setSubmittingIndexNow(true);
    setIndexNowStatus(null);
    try {
      const res = await api<{ ok: boolean; status: number; count: number; error?: string }>("/admin/indexnow/submit", {
        method: "POST",
      });
      if (res.ok) {
        setIndexNowStatus(`Success! Submitted ${res.count} URLs to Microsoft Bing, Yahoo, Yandex & IndexNow engines.`);
        reload();
      } else {
        setIndexNowStatus(`Submission note: ${res.error || `HTTP ${res.status}`}`);
      }
    } catch (err) {
      setIndexNowStatus(err instanceof ApiError ? err.message : "Could not reach IndexNow API.");
    } finally {
      setSubmittingIndexNow(false);
    }
  };

  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-96" />;
  if (!data) return null;

  return (
    <div className="space-y-10">
      {/* Search Engine Instant Indexing */}
      <Block title="Search Engine Instant Indexing (IndexNow)">
        <div className="space-y-4 rounded-card border-2 border-edge bg-surface p-5 shadow-sticker">
          <p className="text-sm leading-relaxed text-muted">
            The IndexNow protocol instantly pushes all 50+ public pages, dynamic topic directories, and community groups
            directly to Microsoft Bing, Yahoo, Yandex, Naver, and Seznam search engines for rapid crawling in hours instead of waiting weeks.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-edge/60 pt-4">
            <div className="space-y-1">
              <div className="text-sm font-bold">
                {data.lastIndexNow?.ok
                  ? `Active: ${data.lastIndexNow.count} URLs pushed successfully (HTTP ${data.lastIndexNow.status})`
                  : data.lastIndexNow
                    ? `Notice: ${data.lastIndexNow.error || `HTTP ${data.lastIndexNow.status}`}`
                    : "Ready to submit 50+ sitemap URLs."}
              </div>
              {data.lastIndexNow?.submittedAt ? (
                <div className="text-xs text-muted">
                  Last submitted on {new Date(data.lastIndexNow.submittedAt).toLocaleString()}
                </div>
              ) : null}
            </div>

            <Button
              variant="brand"
              onClick={handleIndexNowSubmit}
              loading={submittingIndexNow}
            >
              Ping Bing, Yahoo & Yandex (IndexNow)
            </Button>
          </div>

          {indexNowStatus ? (
            <div className="rounded-ui border-2 border-edge bg-paper p-3 text-sm font-semibold">
              {indexNowStatus}
            </div>
          ) : null}
        </div>
      </Block>

      {/* Viral Shares & Invites */}
      <Block title="Viral Growth & Referral Shares">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total shares" value={data.shares?.total ?? 0} tone="brand" />
          <StatCard label="WhatsApp" value={data.shares?.byChannel?.whatsapp ?? 0} />
          <StatCard label="Telegram" value={data.shares?.byChannel?.telegram ?? 0} />
          <StatCard label="X / Twitter" value={data.shares?.byChannel?.twitter ?? 0} />
          <StatCard label="Reddit" value={data.shares?.byChannel?.reddit ?? 0} />
          <StatCard label="Link copies" value={data.shares?.byChannel?.copy ?? 0} />
          <StatCard label="Mobile sheet" value={data.shares?.byChannel?.native ?? 0} />
        </div>
        {data.shares?.topRooms && data.shares.topRooms.length > 0 ? (
          <div className="pt-2">
            <SimpleTable
              rows={data.shares.topRooms}
              rowKey={(r) => r.roomId}
              empty="No room shares recorded yet."
              columns={[
                { key: "r", label: "Shared Room / Group", render: (r) => <strong>{r.roomId === "global" ? "Global Chat" : r.roomId}</strong> },
                { key: "c", label: "Shares Triggered", align: "right", render: (r) => r.count },
              ]}
            />
          </div>
        ) : null}
      </Block>

      <Block title="Where visitors come from">
        <SimpleTable rows={data.channels} rowKey={(r) => r.channel} empty="No visits yet." columns={[
          { key: "c", label: "Channel", render: (r) => <strong>{r.channel}</strong> },
          { key: "v", label: "Visits", align: "right", render: (r) => r.visits },
          { key: "p", label: "Visitors", align: "right", render: (r) => r.visitors },
          { key: "s", label: "Sign-ups", align: "right", render: (r) => r.signups },
          { key: "r", label: "Conversion", align: "right", render: (r) => `${r.conversion}%` },
        ]} />
      </Block>

      <Block title="Your tracked links">
        <SimpleTable rows={data.topCampaigns} rowKey={(r) => `${r.campaign}-${r.source}-${r.medium}`} empty="No tracked-link visits yet." columns={[
          { key: "c", label: "Campaign", render: (r) => <strong>{r.campaign ?? "none"}</strong> },
          { key: "s", label: "Source / medium", render: (r) => `${r.source ?? "?"} / ${r.medium ?? "?"}` },
          { key: "v", label: "Visits", align: "right", render: (r) => r.visits },
          { key: "u", label: "Visitors", align: "right", render: (r) => r.visitors },
          { key: "g", label: "Sign-ups", align: "right", render: (r) => r.signups },
        ]} />
      </Block>

      <Block title="Search traffic (SEO)">
        {data.seoDaily.length ? <BarSeries data={data.seoDaily.map((d) => ({ label: d.day, value: d.visits }))} summary="Search visits per day" /> : <p className="text-muted">No search visits yet.</p>}
        <SimpleTable rows={data.seoLandingPages} rowKey={(r) => r.path} empty="No landing pages yet." columns={[
          { key: "p", label: "Top landing pages", render: (r) => r.path },
          { key: "v", label: "Visits", align: "right", render: (r) => r.visits },
        ]} />
      </Block>

      <Block title="From AI assistants">
        <SimpleTable rows={data.llmSources} rowKey={(r) => r.source ?? "unknown"} empty="No AI referrals yet." columns={[
          { key: "s", label: "Source", render: (r) => r.source ?? "unknown" },
          { key: "v", label: "Visits", align: "right", render: (r) => r.visits },
        ]} />
      </Block>

      <Block title="Top sources">
        <SimpleTable rows={data.topSources} rowKey={(r) => `${r.channel}-${r.source}`} empty="Nothing yet." columns={[
          { key: "c", label: "Channel", render: (r) => r.channel },
          { key: "s", label: "Source", render: (r) => r.source ?? "direct" },
          { key: "v", label: "Visits", align: "right", render: (r) => r.visits },
          { key: "g", label: "Sign-ups", align: "right", render: (r) => r.signups },
        ]} />
      </Block>
    </div>
  );
}

export function AnalyticsScreen() {
  const [days, setDays] = useState(7);
  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="display text-4xl">Traffic</h1>
      <DaysPicker value={days} onChange={setDays} />
      <Body key={days} days={days} />
    </div>
  );
}
