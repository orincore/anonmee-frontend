import Link from "next/link";
import React from "react";
import { SITE } from "@/lib/site";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  /** Whether to output the JSON-LD schema tag inline (default true). */
  embedSchema?: boolean;
}

/**
 * Accessible Breadcrumb navigation with automated Google-compliant BreadcrumbList JSON-LD schema.
 */
export function Breadcrumbs({ items, className = "", embedSchema = true }: BreadcrumbsProps) {
  const schemaList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.name,
      item: item.href ? (item.href.startsWith("http") ? item.href : `${SITE.url}${item.href}`) : undefined,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: schemaList,
  };

  return (
    <>
      {embedSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted ${className}`}
      >
        <Link href="/" className="transition-colors hover:text-fg">
          Home
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <span className="select-none opacity-40">/</span>
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.name}
                </Link>
              ) : (
                <span className="max-w-[280px] truncate text-fg sm:max-w-none" aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
