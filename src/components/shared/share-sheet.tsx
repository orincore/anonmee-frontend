"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  RedditLogo,
  ShareNetwork,
  TelegramLogo,
  TwitterLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SITE } from "@/lib/site";

export interface ShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  text: string;
  url: string;
  roomId?: string;
}

export function trackShareEvent(channel: string, roomId?: string, url?: string) {
  // 1. Report to backend analytics
  try {
    fetch(`${SITE.api}/track/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channel,
        roomId: roomId || "unknown",
        url: url || (typeof window !== "undefined" ? window.location.href : ""),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }

  // 2. Report to Google Tag Manager / GA4
  try {
    if (typeof window !== "undefined") {
      const dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
      if (Array.isArray(dataLayer)) {
        dataLayer.push({
          event: "share",
          method: channel,
          content_type: roomId === "global" ? "global_chat" : "group_chat",
          item_id: roomId || "general",
        });
      }
    }
  } catch {
    // ignore
  }
}

export function buildShareUrl(baseUrl: string, channel: string, roomId?: string): string {
  try {
    const origin = typeof window !== "undefined" ? window.location.origin : SITE.url;
    const resolved = baseUrl.startsWith("http") ? baseUrl : `${origin}${baseUrl.startsWith("/") ? "" : "/"}${baseUrl}`;
    const u = new URL(resolved);
    u.searchParams.set("utm_source", channel);
    u.searchParams.set("utm_medium", "viral_share");
    if (roomId) {
      u.searchParams.set("utm_campaign", roomId === "global" ? "global_chat" : `group_${roomId}`);
    }
    return u.toString();
  } catch {
    return baseUrl;
  }
}

export async function triggerShare(opts: {
  title: string;
  text: string;
  url: string;
  roomId?: string;
  onFallback: () => void;
}) {
  const nativeUrl = buildShareUrl(opts.url, "native", opts.roomId);
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: opts.title,
        text: opts.text,
        url: nativeUrl,
      });
      trackShareEvent("native", opts.roomId, nativeUrl);
      return;
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        // User voluntarily closed the native sheet
        return;
      }
    }
  }
  // Fallback to desktop/in-app modal sheet
  opts.onFallback();
}

export function ShareSheet({ open, onOpenChange, title, text, url, roomId }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const cleanCopyUrl = buildShareUrl(url, "copy", roomId);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCopyUrl);
      trackShareEvent("copy", roomId, cleanCopyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleSocialClick = (channel: "whatsapp" | "telegram" | "twitter" | "reddit") => {
    const shareUrl = buildShareUrl(url, channel, roomId);
    trackShareEvent(channel, roomId, shareUrl);

    let targetHref = "";
    if (channel === "whatsapp") {
      targetHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`;
    } else if (channel === "telegram") {
      targetHref = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    } else if (channel === "twitter") {
      targetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    } else if (channel === "reddit") {
      targetHref = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title || text)}`;
    }

    if (targetHref && typeof window !== "undefined") {
      window.open(targetHref, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        title="Share & Invite"
        description="Invite friends or your community to chat anonymously — zero photos, 100% private."
        className="max-w-md"
      >
        <div className="space-y-5">
          {/* Social Channels 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialClick("whatsapp")}
              className="flex items-center gap-3 rounded-card border-2 border-edge bg-surface p-3.5 text-left transition-all hover:bg-line/40 hover:shadow-sticker-sm active:scale-[0.98]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                <WhatsappLogo weight="fill" className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">WhatsApp</div>
                <div className="truncate text-xs text-muted">Chats & Status</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick("telegram")}
              className="flex items-center gap-3 rounded-card border-2 border-edge bg-surface p-3.5 text-left transition-all hover:bg-line/40 hover:shadow-sticker-sm active:scale-[0.98]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-500">
                <TelegramLogo weight="fill" className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">Telegram</div>
                <div className="truncate text-xs text-muted">Groups & DMs</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick("twitter")}
              className="flex items-center gap-3 rounded-card border-2 border-edge bg-surface p-3.5 text-left transition-all hover:bg-line/40 hover:shadow-sticker-sm active:scale-[0.98]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-line text-fg">
                <TwitterLogo weight="fill" className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">X (Twitter)</div>
                <div className="truncate text-xs text-muted">Post to feed</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleSocialClick("reddit")}
              className="flex items-center gap-3 rounded-card border-2 border-edge bg-surface p-3.5 text-left transition-all hover:bg-line/40 hover:shadow-sticker-sm active:scale-[0.98]"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400">
                <RedditLogo weight="fill" className="size-6" />
              </div>
              <div className="min-w-0">
                <div className="font-bold">Reddit</div>
                <div className="truncate text-xs text-muted">Share to sub</div>
              </div>
            </button>
          </div>

          {/* Copy Link Bar */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted">
              Or copy link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={cleanCopyUrl}
                className="min-w-0 flex-1 rounded-ui border-2 border-edge bg-paper px-3 py-2 text-sm text-muted focus:outline-none"
              />
              <Button
                variant={copied ? "primary" : "secondary"}
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <>
                    <Check weight="bold" className="size-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy weight="bold" className="size-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  roomId?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export function ShareButton({
  title,
  text,
  url,
  roomId,
  variant = "ghost",
  size = "icon",
  className,
  ariaLabel = "Share",
  children,
}: ShareButtonProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleClick = () => {
    triggerShare({
      title,
      text,
      url,
      roomId,
      onFallback: () => setSheetOpen(true),
    });
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {children ?? <ShareNetwork aria-hidden weight="bold" className="size-6" />}
      </Button>

      <ShareSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={title}
        text={text}
        url={url}
        roomId={roomId}
      />
    </>
  );
}
