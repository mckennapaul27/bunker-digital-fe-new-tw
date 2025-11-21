import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatBudget(budget: string): string {
  const budgetMap: Record<string, string> = {
    "under-250": "Under £250",
    "250-1000": "£250 - £1,000",
    "1000-2000": "£1,000 - £2,000",
    "2000-5000": "£2,000 - £5,000",
    "5000-plus": "£5,000+",
  };
  return budgetMap[budget] || budget;
}

function formatPreferredContact(contact?: string): string {
  if (!contact) return "Not specified";
  return contact === "email" ? "Email" : "Call back";
}

function createNotificationEmailHTML(data: {
  formType: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  message: string;
  budget?: string;
  howDidYouFindUs?: string;
  preferredContact?: string;
}): string {
  const isProjectForm = data.formType === "discuss-project";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New ${isProjectForm ? "Project Discussion" : "Contact"} Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          New ${isProjectForm ? "Project Discussion" : "Contact"} Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ""}
          ${data.companyName ? `<p><strong>Company Name:</strong> ${data.companyName}</p>` : ""}
          ${data.preferredContact ? `<p><strong>Preferred Contact Method:</strong> ${formatPreferredContact(data.preferredContact)}</p>` : ""}
        </div>

        ${
          isProjectForm
            ? `
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1a1a1a; margin-top: 0;">Project Details</h3>
            ${data.budget ? `<p><strong>Budget:</strong> ${formatBudget(data.budget)}</p>` : ""}
            ${data.howDidYouFindUs ? `<p><strong>How did they find us:</strong> ${data.howDidYouFindUs}</p>` : ""}
          </div>
        `
            : ""
        }

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>

        <p style="margin-top: 30px; color: #666; font-size: 12px;">
          This email was sent from the ${isProjectForm ? "Discuss Project" : "Contact"} form on bunkerdigital.co.uk
        </p>
      </body>
    </html>
  `;
}

function createAcknowledgmentEmailHTML(data: {
  name: string;
  formType: string;
}): string {
  const isProjectForm = data.formType === "discuss-project";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Bunker Digital</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Thank you for contacting Bunker Digital
        </h2>
        
        <p>Hi ${data.name},</p>
        
        <p>
          Thank you for ${isProjectForm ? "submitting your project details" : "getting in touch"} with us. 
          We've received your message and one of our team members will get back to you as soon as possible.
        </p>

        ${
          isProjectForm
            ? `
          <p>
            We're excited to learn more about your project and discuss how we can help bring your vision to life. 
            Our team will review your details and reach out within 24-48 hours.
          </p>
        `
            : `
          <p>
            We typically respond to all inquiries within 24-48 hours. If your matter is urgent, 
            please feel free to call us at <strong>0161 383 8568</strong>.
          </p>
        `
        }

        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #1a1a1a; margin-top: 0;">Need immediate assistance?</h3>
          <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:01613838568">0161 383 8568</a></p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:info@bunkerdigital.co.uk">info@bunkerdigital.co.uk</a></p>
          <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/447935157365">+44 7935 157365</a></p>
        </div>

        <p>Best regards,<br>The Bunker Digital Team</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; margin: 0;">
          Bunker Digital<br>
          <a href="https://www.bunkerdigital.co.uk" style="color: #666;">www.bunkerdigital.co.uk</a>
        </p>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formType,
      name,
      email,
      phone,
      companyName,
      message,
      budget,
      howDidYouFindUs,
      preferredContact,
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // For discuss-project form, validate additional required fields
    // Required: name, email, companyName, budget, message
    // Optional: phone, howDidYouFindUs, preferredContact
    if (formType === "discuss-project") {
      if (!companyName || !budget) {
        return NextResponse.json(
          { message: "Missing required fields for project discussion" },
          { status: 400 }
        );
      }
    } else {
      // For contact form, preferredContact is required
      if (!preferredContact) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { message: "Email service is not configured" },
        { status: 500 }
      );
    }

    const formData = {
      formType,
      name,
      email,
      phone,
      companyName,
      message,
      budget,
      howDidYouFindUs,
      preferredContact,
    };

    const subject =
      formType === "discuss-project"
        ? `New Project Discussion: ${name}${companyName ? ` - ${companyName}` : ""}`
        : `New Contact Form Submission: ${name}`;

    // Send notification email to info@bunkerdigital.co.uk
    const notificationResult = await resend.emails.send({
      from: "no-reply@mail.bunkerdigital.co.uk",
      to: "info@bunkerdigital.co.uk",
      replyTo: email,
      subject,
      html: createNotificationEmailHTML(formData),
    });

    if (notificationResult.error) {
      console.error(
        "Error sending notification email:",
        notificationResult.error
      );
      return NextResponse.json(
        { message: "Failed to send notification email" },
        { status: 500 }
      );
    }

    // Send acknowledgment email to the enquirer
    const acknowledgmentResult = await resend.emails.send({
      from: "no-reply@mail.bunkerdigital.co.uk",
      to: email,
      subject: "Thank you for contacting Bunker Digital",
      html: createAcknowledgmentEmailHTML({ name, formType }),
    });

    if (acknowledgmentResult.error) {
      console.error(
        "Error sending acknowledgment email:",
        acknowledgmentResult.error
      );
      // Don't fail the request if acknowledgment fails, but log it
    }

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
