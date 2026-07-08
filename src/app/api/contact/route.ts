import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, company, website, projectType, stage, budget, message, honeypot } = body;

    // 1. Anti-Spam Honeypot Check
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Request received" }, { status: 200 });
    }

    // 2. Server-side Validation
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, company, and project details are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "harispatel3219@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    // Log to console for development tracking
    console.log("New Contact Form Submission:", {
      name,
      email,
      company,
      website: website || "Not specified",
      projectType: projectType || "Not specified",
      stage: stage || "Not specified",
      engagementLane: budget || "Not specified",
      message,
      timestamp: new Date().toISOString(),
    });

    // 3. Dispatch Email via Resend if API Key is configured
    if (apiKey) {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: "IbdaDev Inquiry <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `New Ibda Dev Build Review: ${company} (${projectType || "General"})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background-color: #050508; color: #ffffff; border-radius: 10px;">
            <h2 style="color: #D7B46A;">New Build Review Request</h2>
            <hr style="border-color: #333;" />
            <p><strong>Name / Role:</strong> ${name}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #60E6D2;">${email}</a></p>
            <p><strong>Company / Brand:</strong> ${company}</p>
            <p><strong>Website / Product:</strong> ${website || "Not specified"}</p>
            <p><strong>Build Type:</strong> ${projectType || "Not specified"}</p>
            <p><strong>Current Stage:</strong> ${stage || "Not specified"}</p>
            <p><strong>Engagement Lane:</strong> ${budget || "Not specified"}</p>
            <h3 style="color: #8E7CFF; margin-top: 20px;">Business Brief:</h3>
            <p style="background-color: #111; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      });

      if (error) {
        console.error("Resend Dispatch Error:", error.message);
      } else {
        console.log(`Email successfully dispatched to ${recipientEmail} (ID: ${data?.id})`);
      }
    } else {
      console.warn("RESEND_API_KEY is missing in environment variables. Email dispatch skipped.");
    }

    return NextResponse.json(
      { success: true, message: "Thank you for reaching out! We will respond within 24 hours." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Exception:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
