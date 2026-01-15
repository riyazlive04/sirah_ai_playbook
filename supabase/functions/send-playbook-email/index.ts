import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PlaybookEmailRequest {
  name: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: PlaybookEmailRequest = await req.json();

    console.log(`Sending playbook email to ${email} for ${name}`);

    // Get playbook URL from storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Use configured app URL for email links
    const appUrl = "https://aiautomationplaybook.sirahagents.com";
    const playbookUrl = `${appUrl}/sirah_digital_ai_playbook_2026`;
    
    console.log("Playbook URL:", playbookUrl);

    const emailResponse = await resend.emails.send({
      from: "Sirah Digital <support@sirahdigital.in>",
      to: [email],
      subject: "Your AI Playbook for 2026 is Ready!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a2744; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #1a2744; margin-bottom: 10px; font-size: 28px; }
            .content { background: #f8f9fa; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
            .cta-button { display: inline-block; background: #daa520; color: #1a2744; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; }
            .checklist { text-align: left; margin: 20px 0; }
            .checklist-item { display: flex; align-items: center; margin-bottom: 10px; }
            .check { color: #daa520; margin-right: 10px; font-size: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your AI Playbook Is Ready, ${name}!</h1>
            </div>
            <div class="content">
              <p>Thank you for downloading the <strong>Practical AI Playbook for Entrepreneurs (2026)</strong>.</p>
              <p>This 60-page comprehensive guide will help you:</p>
              <div class="checklist">
                <div class="checklist-item"><span class="check">✓</span> Implement AI systems without hiring more staff</div>
                <div class="checklist-item"><span class="check">✓</span> Scale from ₹5-15 Lakhs to ₹50+ Lakhs per month</div>
                <div class="checklist-item"><span class="check">✓</span> Build sustainable, stress-free growth</div>
                <div class="checklist-item"><span class="check">✓</span> Get copy-paste prompt libraries for sales & marketing</div>
              </div>
              <p style="text-align: center; margin-top: 30px;">
                <a href="${playbookUrl}" class="cta-button">📥 Download Your Playbook (PDF)</a>
              </p>
              <p style="font-size: 13px; color: #666; text-align: center; margin-top: 15px;">This guide is designed to be read slowly, implemented step by step, and used as a reference while building systems.</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email - we're here to help!</p>
              <p>Best regards,<br><strong>The Sirah Digital Team</strong></p>
              <p style="margin-top: 20px;">
                <a href="https://www.linkedin.com/in/iammohamedriyaz/" style="color: #666; margin-right: 15px;">LinkedIn</a>
                <a href="https://www.youtube.com/@riyazlive" style="color: #666;">YouTube</a>
              </p>
              <p><a href="https://sirahdigital.in/" style="color: #0056b3;">sirahdigital.in</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Update lead as playbook sent
    await supabase
      .from("leads")
      .update({ playbook_sent: true })
      .eq("email", email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-playbook-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);