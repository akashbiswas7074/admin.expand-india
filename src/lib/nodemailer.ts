import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text: text || '',
    }

    const result = await transporter.sendMail(mailOptions)
    return result
  } catch (error) {
    console.error('Email sending error:', error)
    throw new Error('Failed to send email')
  }
}

export const sendContactNotification = async (contact: {
  firstName: string
  lastName: string
  email: string
  company?: string
  message: string
}) => {
  const subject = `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Contact Form Submission</h2>
      
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #334155;">Contact Details</h3>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
        ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #334155;">Message</h3>
        <p style="white-space: pre-wrap; line-height: 1.6;">${contact.message}</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
        <p>This email was automatically generated from your website's contact form.</p>
        <p>To reply to this inquiry, simply respond to ${contact.email}</p>
      </div>
    </div>
  `

  const text = `
New Contact Form Submission

Name: ${contact.firstName} ${contact.lastName}
Email: ${contact.email}
${contact.company ? `Company: ${contact.company}` : ''}

Message:
${contact.message}
  `

  await sendEmail(process.env.ADMIN_EMAIL!, subject, html, text)
}

export default transporter 