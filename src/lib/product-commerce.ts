/** Quote-first SKUs: show Request Quote as primary CTA instead of Add to Cart. */
export function isQuotePreferredProduct(
  slug: string,
  leadTime?: string,
  deploymentType?: string
): boolean {
  if (slug === "custom-cabinet") return true;
  if (deploymentType === "Custom Deployment") return true;
  if (leadTime?.toLowerCase().includes("quote")) return true;
  return false;
}
