export async function onRequestPost(context) {
  const { request, env } = context;

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and message are required.' }),
        { status: 400, headers }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address.' }),
        { status: 400, headers }
      );
    }

    // ─── Resend API ───
    // Setup:
    // 1. Sign up at https://resend.com
    // 2. Get your API key from dashboard
    // 3. Add env vars in Cloudflare Pages > Settings > Environment variables:
    //      RESEND_API_KEY  = re_xxxxxxxx
    //      CONTACT_EMAIL   = your@gmail.com
    //
    // Default sender is "onboarding@resend.dev" (no DNS needed).
    // For custom sender, add & verify your domain in Resend dashboard.

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0a0a0b; padding: 32px; border-radius: 12px;">
              <h2 style="color: #c4f745; margin: 0 0 24px 0; font-size: 20px;">New Portfolio Message</h2>
              <div style="background: #111113; border: 1px solid #2a2a2e; border-radius: 8px; padding: 24px; color: #e8e8ec;">
                <p style="margin: 0 0 8px;"><strong style="color: #8a8a94;">From:</strong> ${name}</p>
                <p style="margin: 0 0 8px;"><strong style="color: #8a8a94;">Email:</strong> <a href="mailto:${email}" style="color: #c4f745;">${email}</a></p>
                <p style="margin: 0 0 16px;"><strong style="color: #8a8a94;">Subject:</strong> ${subject || '(none)'}</p>
                <hr style="border: none; border-top: 1px solid #2a2a2e; margin: 16px 0;">
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="color: #555; font-size: 11px; margin: 16px 0 0; text-align: center;">Sent from fauzi.pages.dev</p>
            </div>
          </div>
        `,
        text: `New message from ${name} (${email})\n\nSubject: ${subject || '(none)'}\n\n${message}\n\n---\nSent from fauzi.pages.dev`,
      }),
    });

    if (res.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers }
      );
    } else {
      const err = await res.json().catch(() => ({}));
      console.error('Resend error:', JSON.stringify(err));
      return new Response(
        JSON.stringify({ error: 'Failed to send email. Please try again.' }),
        { status: 500, headers }
      );
    }

  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error. Please try again later.' }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}