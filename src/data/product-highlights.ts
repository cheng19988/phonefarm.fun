/** One-line procurement summary — reference-style bullet strip on product pages */
export const PRODUCT_HIGHLIGHTS: Record<string, string> = {
  "android-phone-farm":
    "20 nodes · Entry Exynos/Android 7 class · centralized PSU · active cooling · ADB-ready starter lab",
  "phone-farm-box":
    "20 nodes · Pro industrial chassis · 4-fan ducted cooling · 450–550W PSU · 24/7 QA & automation",
  "motherboard-box":
    "20 headless Android motherboard nodes · high-density 2U · centralized power · ADB automation",
  "samsung-s8-plus-20-node-farm":
    "20 nodes · Snapdragon 835 · 4+64GB · enhanced cooling · modular tray · batch orchestration ready",
  "samsung-s9-plus-20-node-farm":
    "20 nodes · Snapdragon 845 · 128GB class · heavy workload QA · enterprise hot-swap PSU layout",
  "samsung-s10-plus-20-node-farm":
    "20 nodes · Snapdragon 855 · dev & regression testing · pro cooling · stable USB backplane",
  "samsung-note8-20-node-farm":
    "20 nodes · Note 8 class · 6+128GB · continuous operations · high-capacity automation cluster",
  "exynos-n5-entry-20-node-farm":
    "20 nodes · Exynos 7420 · Android 7 baseline · budget entry automation · MOQ 1 sample friendly",
  "snapdragon-n8-multitask-20-node-farm":
    "20 nodes · Snapdragon 835 · 6GB RAM class · multi-task parallel runs · mid-tier price point",
  "samsung-s8-reliable-20-node-farm":
    "20 nodes · S8 Snapdragon 835 · 4+64GB · stable 24/7 hub · cost between entry and S8+ Pro",
  "samsung-n9-professional-20-node-farm":
    "20 nodes · Snapdragon 845 pro · 128GB · multi-app device labs · batch automation ready",
  "real-device-phone-farm":
    "20 nodes · turnkey bundle · power + cooling + USB + network · single-PO lab stand-up",
  "iphone-phone-farm":
    "10–20 customer device slots · mixed-platform QA rack · centralized charging & USB routing",
};

export function getProductHighlight(slug: string, fallback?: string) {
  return PRODUCT_HIGHLIGHTS[slug] ?? fallback ?? "";
}
