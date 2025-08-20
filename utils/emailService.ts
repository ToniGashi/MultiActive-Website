import { Resend } from "resend";
import {
  createPartnerEmailTemplate,
  createClientEmailTemplate,
  PartnerFormData,
  ClientFormData,
} from "./emailTemplates";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

console.log("🔧 Resend object initialized:", !!resend);
console.log("🔧 Resend.emails object:", !!resend.emails);
console.log("🔧 Resend.emails.send method:", typeof resend.emails.send);

export interface EmailConfig {
  fromEmail: string;
  fromName: string;
  partnerEmails: string[];
  clientEmails: string[];
}

export class EmailService {
  private config: EmailConfig;

  constructor() {
    console.log("🔧 Initializing EmailService...");
    console.log("🔧 NODE_ENV:", process.env.NODE_ENV);
    console.log("🔧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    // Since the domain is verified, we can use it directly
    const isLocalhost =
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test" ||
      (typeof window !== "undefined" &&
        window.location.hostname === "localhost");

    console.log("🔧 Is localhost:", isLocalhost);

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

    console.log("🔧 EmailService config:", this.config);
    console.log("✅ EmailService initialized successfully");
  }

  async sendPartnerEmail(data: PartnerFormData): Promise<boolean> {
    try {
      console.log("📧 Partner email service called with data:", {
        ...data,
        email: `${data.email.substring(0, 3)}***@${data.email.split("@")[1]}`,
      });

      if (!process.env.RESEND_API_KEY) {
        console.warn("❌ Resend API key not configured, skipping email send");
        return false;
      }

      console.log("✅ Resend API key found");
      console.log("📧 Email service config:", this.getConfig());

      const template = createPartnerEmailTemplate(data);
      console.log("📧 Email template created");

      // Since the domain is verified, we can send to all configured emails
      const recipientEmails = this.config.partnerEmails;

      console.log("📧 Recipient emails:", recipientEmails);
      console.log("📧 From email:", this.config.fromEmail);
      console.log("📧 From name:", this.config.fromName);

      const { data: result, error } = await resend.emails.send({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: recipientEmails,
        subject: template.subject,
        html: template.html,
        text: template.text,
        replyTo: data.email, // Allow recipients to reply directly to the sender
      });

      if (error) {
        console.error("❌ Resend error:", error);
        return false;
      }

      console.log(
        "✅ Partner email sent successfully to:",
        recipientEmails,
        "Message ID:",
        result?.id
      );
      return true;
    } catch (error) {
      console.error("❌ Error sending partner email:", error);
      return false;
    }
  }

  async sendClientEmail(data: ClientFormData): Promise<boolean> {
    try {
      console.log("📧 Client email service called with data:", {
        ...data,
        email: `${data.email.substring(0, 3)}***@${data.email.split("@")[1]}`,
      });

      if (!process.env.RESEND_API_KEY) {
        console.warn("❌ Resend API key not configured, skipping email send");
        return false;
      }

      console.log("✅ Resend API key found");
      console.log("📧 Email service config:", this.getConfig());

      const template = createClientEmailTemplate(data);
      console.log("📧 Email template created");

      // Since the domain is verified, we can send to all configured emails
      const recipientEmails = this.config.clientEmails;

      console.log("📧 Recipient emails:", recipientEmails);
      console.log("📧 From email:", this.config.fromEmail);
      console.log("📧 From name:", this.config.fromName);

      const { data: result, error } = await resend.emails.send({
        from: `${this.config.fromName} <${this.config.fromEmail}>`,
        to: recipientEmails,
        subject: template.subject,
        html: template.html,
        text: template.text,
        replyTo: data.email, // Allow recipients to reply directly to the sender
      });

      if (error) {
        console.error("❌ Resend error:", error);
        return false;
      }

      console.log(
        "✅ Client email sent successfully to:",
        recipientEmails,
        "Message ID:",
        result?.id
      );
      return true;
    } catch (error) {
      console.error("❌ Error sending client email:", error);
      return false;
    }
  }

  // Method to test email configuration
  async testConnection(): Promise<boolean> {
    try {
      if (!process.env.RESEND_API_KEY) {
        return false;
      }

      // Try to send a test email to verify API key
      // Since the domain is verified, we can send to any configured email
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
