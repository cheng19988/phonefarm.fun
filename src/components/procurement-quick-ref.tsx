import Link from "next/link";
import { PROCUREMENT_ROWS } from "@/data/procurement-guide";

export function ProcurementQuickRef() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden mb-12 md:mb-14">
      <div className="px-5 py-4 md:px-6 md:py-5 border-b border-zinc-200 bg-zinc-50/80">
        <p className="eyebrow !mb-1">B2B buyer checklist</p>
        <h2 className="font-display font-bold text-xl md:text-2xl text-zinc-900">
          Size, power, models, lead time &amp; support — at a glance
        </h2>
        <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
          Standard 20-node phone farm box reference specs from PhoneFarm Fun (Guangzhou factory). Confirm your exact configuration on quote.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="compare-table text-sm w-full">
          <tbody>
            {PROCUREMENT_ROWS.map((row) => (
              <tr key={row.topic}>
                <th className="text-left font-semibold text-zinc-700 w-[38%] sm:w-[32%] align-top py-3 px-5 md:px-6 bg-zinc-50/50">
                  {row.topic}
                </th>
                <td className="text-zinc-800 py-3 px-5 md:px-6 leading-relaxed">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-4 md:px-6 border-t border-zinc-200 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <Link href="/blog/phone-farm-box-buyer-checklist" className="text-[var(--accent)] font-medium hover:underline">
          Full buyer guide →
        </Link>
        <Link href="/warranty" className="text-zinc-600 hover:text-[var(--accent)]">
          Warranty &amp; RMA →
        </Link>
        <Link href="/shipping" className="text-zinc-600 hover:text-[var(--accent)]">
          Shipping estimates →
        </Link>
        <Link href="/services/remote-control-configuration" className="text-zinc-600 hover:text-[var(--accent)]">
          Remote setup service →
        </Link>
      </div>
    </div>
  );
}
