"use client";

export interface DeviceInfo {
  deviceId: string;
  deviceFingerprint: string;
}

let cachedDeviceInfo: DeviceInfo | null = null;

function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 60;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.textBaseline = "alphabetic";
    ctx.font = "14px 'Arial', sans-serif";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Anonmee-Security-Device 🛡️ 18+", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Anonmee-Security-Device 🛡️ 18+", 4, 17);
    return canvas.toDataURL();
  } catch {
    return "";
  }
}

function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return "";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "";
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "";
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "";
    return `${vendor}~${renderer}`;
  } catch {
    return "";
  }
}

function getHardwareSignals(): string {
  try {
    const screenStr = `${screen.width}x${screen.height}x${screen.colorDepth}@${window.devicePixelRatio || 1}`;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const offset = new Date().getTimezoneOffset();
    const cores = navigator.hardwareConcurrency || 0;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 0;
    const touch = navigator.maxTouchPoints || 0;
    const lang = navigator.languages ? navigator.languages.join(",") : navigator.language || "";
    const platform = navigator.platform || "";
    return [screenStr, tz, offset, cores, mem, touch, lang, platform].join("|");
  } catch {
    return "";
  }
}

function getOrCreateDeviceId(): string {
  try {
    let id = localStorage.getItem("anon_did");
    if (!id || id.length < 16) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("anon_did", id);
    }
    document.cookie = `anon_did=${id}; path=/; max-age=315360000; SameSite=Lax`;
    return id;
  } catch {
    return "";
  }
}

async function sha256Hex(str: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(32, "0");
  }
}

/**
 * Returns high-entropy device fingerprint & persistent device ID.
 * Survives incognito / private browsing and stops multi-account bot registration.
 */
export async function getDeviceInfo(): Promise<DeviceInfo> {
  if (typeof window === "undefined") {
    return { deviceId: "", deviceFingerprint: "" };
  }
  if (cachedDeviceInfo) return cachedDeviceInfo;

  const deviceId = getOrCreateDeviceId();
  const canvas = getCanvasFingerprint();
  const webgl = getWebGLFingerprint();
  const hardware = getHardwareSignals();

  const rawFingerprint = [canvas, webgl, hardware].join("|||");
  const deviceFingerprint = await sha256Hex(rawFingerprint);

  cachedDeviceInfo = { deviceId, deviceFingerprint };
  return cachedDeviceInfo;
}
