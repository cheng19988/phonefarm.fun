type ContactPayload = {
  name: string;
  country: string;
  whatsapp: string;
  phone: string;
  email: string;
  deviceQuantity: string;
  quantity?: string;
  productInterest: string;
  platform?: string;
  connectionMode?: string;
  budget: string;
  message: string;
  preShipmentPhotos?: boolean;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function line(label: string, value: string) {
  if (!value.trim()) return null;
  return `<b>${label}:</b> ${escapeHtml(value.trim())}`;
}

export function formatContactSubmission(data: ContactPayload) {
  return [
    "<b>New B2B quote request — PhoneFarm Fun</b>",
    "",
    ...[
      line("Name", data.name),
      line("Email", data.email),
      line("WhatsApp / Telegram", data.whatsapp),
      line("Phone", data.phone),
      line("Shipping country", data.country),
      line("Product interest", data.productInterest),
      line("Node count", data.deviceQuantity),
      line("Units / chassis", data.quantity ?? ""),
      line("Platform", data.platform ?? ""),
      line("Connection mode", data.connectionMode ?? ""),
      line("Budget", data.budget),
      data.preShipmentPhotos ? line("Pre-shipment photos", "Requested") : null,
      line("Message", data.message),
    ].filter(Boolean),
  ].join("\n");
}

/** Sends a Telegram message when TELEGRAM_BOT_TOKEN + TELEGRAM_NOTIFY_CHAT_ID are set. */
export async function notifyTelegram(html: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
