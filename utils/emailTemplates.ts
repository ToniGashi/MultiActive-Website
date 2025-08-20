export interface PartnerFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
}

export interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
}

export const createPartnerEmailTemplate = (data: PartnerFormData) => ({
  subject: "New Partner Application - Multi Active Card",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Partner Application</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #29ABE2; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #29ABE2; }
        .value { margin-left: 10px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #29ABE2; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤝 New Partner Application</h1>
          <p>Multi Active Card</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Company Name:</span>
            <span class="value">${data.companyName}</span>
          </div>
          <div class="field">
            <span class="label">Contact Person:</span>
            <span class="value">${data.contactPerson}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
          </div>
          <div class="field">
            <span class="label">Business Type:</span>
            <span class="value">${data.businessType}</span>
          </div>
          <div class="message-box">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>
          <div class="footer">
            <p>This application was submitted from the Multi Active Card website.</p>
            <p>Please respond within 24 hours to maintain professional standards.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
New Partner Application - Multi Active Card

Company Name: ${data.companyName}
Contact Person: ${data.contactPerson}
Email: ${data.email}
Phone: ${data.phone}
Business Type: ${data.businessType}

Message:
${data.message}

---
This application was submitted from the Multi Active Card website.
Please respond within 24 hours to maintain professional standards.
  `,
});

export const createClientEmailTemplate = (data: ClientFormData) => ({
  subject: "New Service Inquiry - Multi Active Card",
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Service Inquiry</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #29ABE2; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #29ABE2; }
        .value { margin-left: 10px; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #29ABE2; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💬 New Service Inquiry</h1>
          <p>Multi Active Card</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${data.firstName} ${data.lastName}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
          </div>
          <div class="field">
            <span class="label">Service Interest:</span>
            <span class="value">${data.serviceInterest}</span>
          </div>
          <div class="message-box">
            <div class="label">Message:</div>
            <div class="value">${data.message}</div>
          </div>
          <div class="footer">
            <p>This inquiry was submitted from the Multi Active Card website.</p>
            <p>Please respond within 24 hours to maintain professional standards.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
New Service Inquiry - Multi Active Card

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Service Interest: ${data.serviceInterest}

Message:
${data.message}

---
This inquiry was submitted from the Multi Active Card website.
Please respond within 24 hours to maintain professional standards.
  `,
});
