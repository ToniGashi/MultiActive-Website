import { NextResponse } from "next/server";
import { emailService } from "@/utils/emailService";

export async function GET() {
  try {
    console.log("🧪 Testing email service...");

    const config = emailService.getConfig();
    console.log("📧 Email service config:", config);

    // Test the connection
    const isConnected = await emailService.testConnection();
    console.log("🔗 Connection test result:", isConnected);

    return NextResponse.json({
      success: true,
      config,
      connectionTest: isConnected,
      message: "Testi i shërbimit të emailit përfundoi.",
    });
  } catch (error) {
    console.error("❌ Email service test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Testi i shërbimit të emailit dështoi.",
        message:
          "Ju lutemi kontrolloni konfigurimin e emailit dhe provoni përsëri.",
      },
      { status: 500 }
    );
  }
}
