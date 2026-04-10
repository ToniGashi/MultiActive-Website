import { Resend } from "resend";
import {
  createPartnerEmailTemplate,
  createClientEmailTemplate,
  PartnerFormData,
  ClientFormData,
} from "./emailTemplates";

let resendSingleton: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  if (!resendSingleton) resendSingleton = new Resend(key);
  return resendSingleton;
}

export interface EmailConfig {
  fromEmail: string;
  fromName: string;
  partnerEmails: string[];
  clientEmails: string[];
}

export class EmailService {
  private config: EmailConfig;

  constructor() {
    this.config = {
      fromEmail: process.env.FROM_EMAIL || "noreply@multiactivecard.com",
      fromName: process.env.FROM_NAME || "Multi Active Card",
      partnerEmails: (process.env.PARTNER_EMAILS || "info@multiactivecard.com")
        .split(",")
        .map((email) => email.trim()),
      clientEmails: (process.env.CLIENT_EMAILS || "info@multiactivecard.com")
        .split(",")
        .map((email) => email.trim()),
    };
  }

  async sendPartnerEmail(data: PartnerFormData): Promise<boolean> {
    try {
      const resend = getResend();
      if (!resend) {
        console.warn("Resend API key not configured (RESEND_API_KEY)");
        return false;
      }

      const template = createPartnerEmailTemplate(data);
      const recipientEmails = this.config.partnerEmails;

      const { error } = await resend.emails.send({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: recipientEmails,
        reply_to: data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      if (error) {
        console.error("Resend partner email:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error sending partner email:", error);
      return false;
    }
  }

  async sendClientEmail(data: ClientFormData): Promise<boolean> {
    try {
      const resend = getResend();
      if (!resend) {
        console.warn("Resend API key not configured (RESEND_API_KEY)");
        return false;
      }

      const template = createClientEmailTemplate(data);
      const recipientEmails = this.config.clientEmails;

      const { error } = await resend.emails.send({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: recipientEmails,
        reply_to: data.email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      if (error) {
        console.error("Resend client email:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error sending client email:", error);
      return false;
    }
  }

  // Method to test email configuration
  async testConnection(): Promise<boolean> {
    try {
      const resend = getResend();
      if (!resend) return false;

      const testRecipient =
        this.config.partnerEmails[0] || this.config.clientEmails[0];

      const { data, error } = await resend.emails.send({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: testRecipient,
        subject: "Test Email - Multi Active Card",
        text: "This is a test email to verify Resend configuration.",
      });

      if (error) {
        console.error("❌ Resend connection test failed:", error);
        return false;
      }

      console.log(
        "✅ Resend connection test successful, Message ID:",
        data?.id
      );
      return true;
    } catch (error) {
      console.error("❌ Resend connection test failed:", error);
      return false;
    }
  }

  // Get current configuration
  getConfig(): EmailConfig {
    return { ...this.config };
  }

  // Check if running in development mode
  isDevelopment(): boolean {
    return (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test" ||
      (typeof window !== "undefined" &&
        window.location.hostname === "localhost")
    );
  }
}

// Export singleton instance
export const emailService = new EmailService();
