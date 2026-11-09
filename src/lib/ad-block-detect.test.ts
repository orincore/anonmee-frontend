import { describe, expect, it } from "vitest";
import { decideAdBlock } from "./ad-block-detect";

const probes = (o: { hidden?: boolean; reachable?: boolean; online?: boolean }) => ({
  baitHidden: async () => o.hidden ?? false,
  adNetworkReachable: async () => o.reachable ?? true,
  online: () => o.online ?? true,
});

describe("decideAdBlock", () => {
  it("lets people in when nothing is blocked", async () => {
    expect(await decideAdBlock(probes({}))).toBe(false);
  });
  it("blocks when the bait element is hidden", async () => {
    expect(await decideAdBlock(probes({ hidden: true }))).toBe(true);
  });
  it("blocks when the ad network cannot be reached", async () => {
    expect(await decideAdBlock(probes({ reachable: false }))).toBe(true);
  });
  it("never blocks someone who is offline", async () => {
    expect(await decideAdBlock(probes({ hidden: true, reachable: false, online: false }))).toBe(false);
  });
});
