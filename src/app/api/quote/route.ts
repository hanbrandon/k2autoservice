import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      vin, 
      miles, 
      exterior_finish, 
      accident_history, 
      financial_status, 
      full_name, 
      email, 
      phone 
    } = body;

    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is missing');
      return NextResponse.json({ error: 'Email service configuration missing' }, { status: 500 });
    }

    // Brevo API call
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'K2 Auto Quote System',
          email: 'quotes@k2group.us', // This should be a verified sender in Brevo
        },
        to: [
          {
            email: 'info@k2group.us', // The recipient email
            name: 'K2 Auto Group Admin',
          },
        ],
        replyTo: {
          email: email,
          name: full_name,
        },
        subject: `[QUOTE REQUEST] ${full_name} - ${vin.slice(-6)}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #ed1c24; border-bottom: 2px solid #ed1c24; padding-bottom: 10px;">New Vehicle Quote Request</h2>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Contact Information</h3>
            <p><strong>Full Name:</strong> ${full_name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Vehicle Details</h3>
            <p><strong>VIN:</strong> ${vin}</p>
            <p><strong>Mileage:</strong> ${miles} miles</p>
            <p><strong>Exterior Finish:</strong> ${exterior_finish}</p>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Condition & Financials</h3>
            <p><strong>Accident History:</strong> ${accident_history}</p>
            <p><strong>Financial Status:</strong> ${financial_status}</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">This request was submitted via the K2 Auto Group website quote form.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      return NextResponse.json({ error: 'Failed to send quote request' }, { status: response.status });
    }

    return NextResponse.json({ message: 'Quote request sent successfully', id: data.messageId }, { status: 200 });
  } catch (error: any) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
