import { NextResponse } from "next/server";

/** Contact forms are disabled; the site shows phone and email on /contact only. */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Formulari i kontaktit nuk është aktiv. Ju lutemi na kontaktoni me telefon ose email.",
      success: false,
    },
    { status: 410 }
  );
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
