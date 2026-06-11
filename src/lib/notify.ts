type ContactPayload = {
  name: string;
  country: string;
  whatsapp: string;
  phone: string;
  email: string;
  deviceQuantity: string;
  productInterest: string;
  budget: string;
  message: string;
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
    "<b>New contact inquiry — PhoneFarm Fun</b>",
    "",
    ...[
      line("Name", data.name),
      line("Email", data.email),
      line("WhatsApp / Telegram", data.whatsapp),
      line("Phone", data.phone),
      line("Country", data.country),
      line("Quantity", data.deviceQuantity),
      line("Product interest", data.productInterest),
      line("Budget", data.budget),
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
