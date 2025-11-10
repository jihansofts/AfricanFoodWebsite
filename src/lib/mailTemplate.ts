export function otpEmailTemplate(otp: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset OTP</title>
    <style>
      body {
        background-color: #faf7f5;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .header {
        background-color: #ff5913;
        color: #fff;
        text-align: center;
        padding: 24px 16px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 1px;
      }
      .content {
        padding: 32px 28px;
        text-align: center;
      }
      .content p {
        font-size: 15px;
        line-height: 1.6;
        margin: 12px 0;
      }
      .otp-box {
        display: inline-block;
        background-color: #fdf3e7;
        color: #ff5913;
        font-weight: bold;
        font-size: 28px;
        letter-spacing: 8px;
        padding: 16px 24px;
        border-radius: 8px;
        margin: 24px 0;
      }
      .footer {
        background-color: #faf7f5;
        text-align: center;
        padding: 20px 12px;
        font-size: 13px;
        color: #777;
      }
      @media (max-width: 600px) {
        .content { padding: 24px 16px; }
        .otp-box { font-size: 24px; letter-spacing: 6px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>We received a request to reset your password for your <strong>African Food Zones</strong> account.</p>
        <p>Use the OTP code below to proceed. It will expire in 10 minutes.</p>
        <div class="otp-box">${otp}</div>
        <p>If you didn’t request a password reset, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} <a href="africanfoodzones.com">African Food Zones — All rights reserved</a> 
      </div>
    </div>
  </body>
  </html>
  `;
}
