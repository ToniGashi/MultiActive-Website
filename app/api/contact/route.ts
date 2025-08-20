import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/utils/rateLimit";
import { emailService } from "@/utils/emailService";
import { PartnerFormData, ClientFormData } from "@/utils/emailTemplates";

export async function POST(request: NextRequest) {
  try {
    console.log("📧 Contact form submission received");

    // Rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    console.log("🔒 Checking rate limit for IP:", clientIP);

    if (!rateLimiter.isAllowed(clientIP)) {
      console.log("❌ Rate limit exceeded for IP:", clientIP);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    console.log("✅ Rate limit check passed");

    const body = await request.json();
    const { formType, formData } = body;

    console.log("📝 Form submission details:", {
      formType,
      formData: {
        ...formData,
        email: formData?.email
          ? `${formData.email.substring(0, 3)}***@${
              formData.email.split("@")[1]
            }`
          : undefined,
      },
    });

    // Validate form type
    if (!formType || !["partner", "client"].includes(formType)) {
      console.log("❌ Invalid form type:", formType);
      return NextResponse.json(
        { error: 'Invalid form type. Must be "partner" or "client".' },
        { status: 400 }
      );
    }

    // Validate form data
    if (!formData || typeof formData !== "object") {
      console.log("❌ Invalid form data:", formData);
      return NextResponse.json(
        { error: "Form data is required." },
        { status: 400 }
      );
    }

    console.log("✅ Form validation passed");

    let emailSent = false;
    let emailError: Error | null = null;

    try {
      console.log("📤 Attempting to send email...");

      if (formType === "partner") {
        const partnerData: PartnerFormData = {
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          message: formData.message,
        };

        console.log(
          "📧 Sending partner email to:",
          emailService.getConfig().partnerEmails
        );
        emailSent = await emailService.sendPartnerEmail(partnerData);
      } else if (formType === "client") {
        const clientData: ClientFormData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          serviceInterest: formData.serviceInterest,
          message: formData.message,
        };

        console.log(
          "📧 Sending client email to:",
          emailService.getConfig().clientEmails
        );
        emailSent = await emailService.sendClientEmail(clientData);
      }

      console.log("📧 Email send result:", emailSent);
    } catch (error) {
      console.error("❌ Email sending error:", error);
      emailError = error instanceof Error ? error : new Error(String(error));
    }

    // Log the submission
    console.log(`${formType} form submission:`, {
      timestamp: new Date().toISOString(),
      clientIP,
      emailSent,
      emailError: emailError?.message,
      formData: {
        ...formData,
        // Don't log sensitive data
        email: formData.email
          ? `${formData.email.substring(0, 3)}***@${
              formData.email.split("@")[1]
            }`
          : undefined,
        phone: formData.phone
          ? `${formData.phone.substring(0, 4)}***`
          : undefined,
      },
    });

    if (emailSent) {
      console.log("✅ Email sent successfully");
      return NextResponse.json({
        message: `${
          formType === "partner" ? "Partnership inquiry" : "Service inquiry"
        } submitted successfully! We'll get back to you soon.`,
        success: true,
      });
    } else {
      console.log("❌ Email failed to send:", emailError?.message);
      return NextResponse.json(
        {
          error:
            emailError?.message ||
            "Failed to send email. Please try again later.",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Contact form API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
