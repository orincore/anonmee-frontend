"use client";

import { useState } from "react";
import { BarSeries, ErrorState, SimpleTable } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useApi } from "@/hooks/use-api";
import { DaysPicker } from "./days-picker";

interface Analytics {
  channels: { channel: string; visits: number; visitors: number; signups: number; conversion: number }[];
  topSources: { channel: string; source: string | null; visits: number; signups: number }[];
  topCampaigns: { campaign: string | null; source: string | null; medium: string | null; visits: number; visitors: number; signups: number }[];
  seoDaily: { day: string; visits: number }[];
  seoLandingPages: { path: string; visits: number }[];
  llmSources: { source: string | null; visits: number }[];
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="space-y-3"><h2 className="display text-2xl">{title}</h2>{children}</section>;
}

function Body({ days }: { days: number }) {
  const { data, error, loading, reload } = useApi<Analytics>(`/admin/analytics?days=${days}`);
  if (error && !data) return <ErrorState message={error} onRetry={reload} />;
  if (loading && !data) return <Skeleton className="h-96" />;
  if (!data) return null;
  return (
    <div className="space-y-10">
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
