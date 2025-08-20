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
      message: "Email service test completed",
    });
  } catch (error) {
    console.error("❌ Email service test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Email service test failed",
      },
      { status: 500 }
    );
  }
}
