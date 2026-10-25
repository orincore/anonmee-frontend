import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const api = process.env.INTERNAL_API_URL || SITE.api || "http://127.0.0.1:4110";
    const res = await fetch(`${api}/c/${encodeURIComponent(code)}`, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
    });
    const location = res.headers.get("location");
    if (location) {
      return NextResponse.redirect(new URL(location, request.url), 302);
    }
  } catch (err) {
    console.error("Short link /c/ redirect failed", err);
  }
  return NextResponse.redirect(new URL("/", request.url), 302);
}
