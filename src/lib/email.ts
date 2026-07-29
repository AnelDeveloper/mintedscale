/**
 * Provider-agnostic sending over plain HTTP — no SDK to install or keep
 * current. Set EMAIL_PROVIDER to `resend` or `sendgrid` and drop in the API
 * key; with neither configured the message is logged so local development
 * still shows you exactly what would have gone out.
 */

export type Mail = {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export type SendResult = {
  delivered: boolean;
  provider: "resend" | "sendgrid" | "console";
  error?: string;
};

function from(): string {
  return process.env.EMAIL_FROM || "MintedScale <onboarding@resend.dev>";
}

function provider(): SendResult["provider"] {
  const explicit = process.env.EMAIL_PROVIDER?.toLowerCase();
  if (explicit === "resend" || explicit === "sendgrid") return explicit;
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SENDGRID_API_KEY) return "sendgrid";
  return "console";
}

export async function sendMail(mail: Mail): Promise<SendResult> {
  const selected = provider();

  try {
    if (selected === "resend") return await sendWithResend(mail);
    if (selected === "sendgrid") return await sendWithSendGrid(mail);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[mail] ${selected} send failed:`, message);
    return { delivered: false, provider: selected, error: message };
  }

  console.info(
    `[mail] No provider configured — would send to ${mail.to.join(", ")}\n` +
      `  Subject: ${mail.subject}\n` +
      `  ${mail.text.split("\n").join("\n  ")}`,
  );
  return { delivered: false, provider: "console" };
}

async function sendWithResend(mail: Mail): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: from(),
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`);
  return { delivered: true, provider: "resend" };
}

async function sendWithSendGrid(mail: Mail): Promise<SendResult> {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error("SENDGRID_API_KEY is not set");

  // SendGrid wants the address split out of any "Name <addr>" form.
  const match = from().match(/^(.*)<(.+)>$/);
  const sender = match
    ? { name: match[1].trim().replace(/^"|"$/g, ""), email: match[2].trim() }
    : { email: from() };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: mail.to.map((email) => ({ email })) }],
      from: sender,
      subject: mail.subject,
      content: [
        { type: "text/plain", value: mail.text },
        { type: "text/html", value: mail.html },
      ],
      ...(mail.replyTo ? { reply_to: { email: mail.replyTo } } : {}),
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`SendGrid ${response.status}: ${await response.text()}`);
  return { delivered: true, provider: "sendgrid" };
}
