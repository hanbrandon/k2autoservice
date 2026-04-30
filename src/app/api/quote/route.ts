import { NextResponse } from 'next/server';
import { BUSINESS_INFO } from '@/utils/businessInfo';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            vin,
            miles,
            exterior_finish,
            exterior_color,
            accident_history,
            financial_status,
            full_name,
            email,
            phone,
            type,
            vehicle,
            budget,
            car_type,
            purchase_type,
            make,
            model,
            repair_type,
            dmv_type,
        } = body;

        const color = exterior_color || exterior_finish;

        const vinDisplay = vin ? ` - ${vin.slice(-6)}` : '';
        const subject = `[${type || 'INQUIRY'}] ${full_name}${vinDisplay}`;

        const brevoApiKey = process.env.BREVO_API_KEY;
        const senderEmail =
            process.env.BREVO_SENDER_EMAIL || 'noreply@k2motorgroup.com';
        const senderName =
            process.env.BREVO_SENDER_NAME || 'K2 Auto Group';
        const receiverEmail =
            process.env.BREVO_RECEIVER_EMAIL || BUSINESS_INFO.email;

        if (!brevoApiKey) {
            console.error('BREVO_API_KEY is missing');
            return NextResponse.json(
                { error: 'Email service configuration missing' },
                { status: 500 },
            );
        }

        // Brevo API call
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'api-key': brevoApiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: senderName,
                    email: senderEmail,
                },
                to: [
                    {
                        email: receiverEmail,
                    },
                ],
                replyTo: {
                    email: email,
                    name: full_name,
                },
                subject: subject,
                htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #ed1c24; border-bottom: 2px solid #ed1c24; padding-bottom: 10px;">New ${type || 'Inquiry'} Request</h2>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Contact Information</h3>
            <p><strong>Full Name:</strong> ${full_name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Preferred Contact:</strong> ${body.method || 'Not Specified'}</p>
            
            <h3 style="background: #f4f4f4; padding: 10px;">Request Details</h3>
            <p><strong>Form Type:</strong> ${type || 'General'}</p>
            ${vehicle ? `<p><strong>Vehicle Info:</strong> ${vehicle}</p>` : ''}
            ${make || model ? `<p><strong>Vehicle:</strong> ${make || ''} ${model || ''}</p>` : ''}
            ${vin ? `<p><strong>VIN:</strong> ${vin}</p>` : ''}
            ${miles ? `<p><strong>Mileage:</strong> ${miles} miles</p>` : ''}
            ${color ? `<p><strong>Exterior Finish/Color:</strong> ${color}</p>` : ''}
            ${purchase_type ? `<p><strong>Inquiry Type:</strong> ${purchase_type.toUpperCase()}</p>` : ''}
            ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
            ${car_type ? `<p><strong>Preferred Style:</strong> ${car_type.toUpperCase()}</p>` : ''}
            ${dmv_type ? `<p><strong>DMV Service:</strong> ${dmv_type.toUpperCase()}</p>` : ''}
            ${repair_type ? `<p><strong>Repair Service:</strong> ${repair_type.toUpperCase()}</p>` : ''}
            
            ${
                accident_history || financial_status
                    ? `
            <h3 style="background: #f4f4f4; padding: 10px;">Condition & Financials</h3>
            ${accident_history ? `<p><strong>Accident History:</strong> ${accident_history}</p>` : ''}
            ${financial_status ? `<p><strong>Financial Status:</strong> ${financial_status}</p>` : ''}
            `
                    : ''
            }

            ${
                body.notes
                    ? `
            <h3 style="background: #f4f4f4; padding: 10px;">Additional Notes</h3>
            <p>${body.notes}</p>
            `
                    : ''
            }
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">This request was submitted via the K2 Auto Group website contact portal.</p>
          </div>
        `,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Brevo API Error:', data);
            return NextResponse.json(
                { error: 'Failed to send quote request' },
                { status: response.status },
            );
        }

        return NextResponse.json(
            { message: 'Quote request sent successfully', id: data.messageId },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Quote API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    }
}
