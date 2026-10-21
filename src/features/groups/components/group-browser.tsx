"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useState } from "react";
import { EmptyState, ErrorState, GroupCard } from "@/components/shared";
import { Skeleton } from "@/components/ui/skeleton";
import { useGroupBrowse } from "../hooks/use-group-browse";

/**
 * Every open group, newest first. Virtualised against the page scroll, so thousands of groups stay light:
 * only the cards near the screen exist, and the next page loads as you approach the end.
 */
export function GroupBrowser({ topic }: { topic?: string }) {
  const { groups, loading, error, hasMore, loadMore, retry } = useGroupBrowse(topic);
  // Where the list starts on the page, so the window virtualiser knows how far down it is.
  const [top, setTop] = useState(0);
  const listRef = useCallback((el: HTMLDivElement | null) => {
    if (el) setTop(el.offsetTop);
  }, []);
  const virt = useWindowVirtualizer({ count: groups.length, estimateSize: () => 200, overscan: 6, scrollMargin: top });
  const items = virt.getVirtualItems();
  const last = items[items.length - 1]?.index ?? -1;

  useEffect(() => {
    if (hasMore && !loading && last >= groups.length - 4) loadMore();
  }, [last, groups.length, hasMore, loading, loadMore]);

  if (error && groups.length === 0) return <ErrorState message={error} onRetry={retry} />;
  if (!loading && groups.length === 0) {
    return <EmptyState icon={MagnifyingGlass} title="Nothing here yet" body={topic ? "No groups on this topic yet. Start the first one." : "No groups yet. Start the first one."} />;
  }
  return (
    <div ref={listRef}>
      <div className="relative w-full" style={{ height: virt.getTotalSize() }}>
        {items.map((v) => (
          <div key={v.key} data-index={v.index} ref={virt.measureElement} className="absolute left-0 top-0 w-full pb-4" style={{ transform: `translateY(${v.start - top}px)` }}>
            <GroupCard group={groups[v.index]} />
          </div>
        ))}
      </div>
      {loading ? <div className="space-y-4 pt-2"><Skeleton className="h-44" /><Skeleton className="h-44" /></div> : null}
      {error && groups.length > 0 ? <ErrorState message={error} onRetry={retry} className="mt-4" /> : null}
    </div>
  );
}
