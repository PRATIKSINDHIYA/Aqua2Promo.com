// Email OTP Service using Nodemailer
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
  auth: {
    user: 'pratiksindhiya3@gmail.com',
    pass: 'cwup ndgu kllq vrlw' // Use App Password for Gmail
  }
});

// Send Email OTP
async function sendEmailOTP(email, otp) {
  try {
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: email,
      subject: 'Aqua2Promo - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo</h2>
          <h3>Email Verification</h3>
          <p>Your OTP for email verification is:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #2563eb; font-size: 32px; margin: 0;">${otp}</h1>
          </div>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email OTP sent successfully to ${email}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Contract Notification to Admin
async function sendContractNotification(contractData, pdfBuffer) {
  try {
    console.log('📧 Preparing admin notification email...');
    console.log('📧 Admin email: pratiksindhiya3@gmail.com');
    
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: 'pratiksindhiya3@gmail.com',
      subject: `New Contract Submission - ${contractData.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
          <h2 style="color: #2563eb;">AQUA2PROMO E-CONTRACT AGREEMENT - NEW SUBMISSION</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contract Details</h3>
            <p><strong>Contract ID:</strong> ${contractData.contractId}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Partner Information</h3>
            <p><strong>Full Name:</strong> ${contractData.fullName}</p>
            <p><strong>Designation:</strong> ${contractData.designation}</p>
            <p><strong>Company Name:</strong> ${contractData.companyName}</p>
            <p><strong>Registered Address:</strong> ${contractData.registeredAddress}</p>
            <p><strong>Mobile Number:</strong> ${contractData.mobileNumber}</p>
            <p><strong>Email ID:</strong> ${contractData.emailId}</p>
            <p><strong>Date of Agreement:</strong> ${contractData.dateOfAgreement}</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Digital Signature Details</h3>
            <p><strong>Digital Signature Name:</strong> ${contractData.digitalSignatureName}</p>
            <p><strong>Signature Date:</strong> ${contractData.digitalSignatureDate}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Contract Terms Accepted</h3>
            <p>✅ Partner has agreed to all terms and conditions</p>
            <p>✅ Digital signature provided</p>
            <p>✅ PIN verification completed</p>
          </div>
          
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Next Steps</h3>
            <ol>
              <li>Review the contract details above</li>
              <li>Check the attached PDF for complete contract information</li>
              <li>Contact the partner if any clarification is needed</li>
              <li>Approve or reject the contract as per your business process</li>
            </ol>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Please find the complete contract PDF attached to this email.
          </p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `,
      attachments: [
        {
          filename: `contract-${contractData.contractId}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('📧 Sending admin notification email...');
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Contract notification sent successfully to admin`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Contract notification failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Contract Confirmation to Customer
async function sendContractConfirmation(customerEmail, contractData, pdfBuffer) {
  try {
    console.log('📧 Preparing customer confirmation email...');
    console.log('📧 Customer email:', customerEmail);
    
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: customerEmail,
      subject: 'Aqua2Promo - Contract Submission Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo</h2>
          <h3>Contract Submission Confirmation</h3>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Your Contract Details</h3>
            <p><strong>Contract ID:</strong> ${contractData.contractId}</p>
            <p><strong>Company Name:</strong> ${contractData.companyName}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Status</h3>
            <p>✅ Your contract has been successfully submitted</p>
            <p>✅ Digital signature has been recorded</p>
            <p>✅ All terms and conditions have been accepted</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">What's Next?</h3>
            <p>Our team will review your contract submission and contact you within 2-3 business days.</p>
            <p>You will receive updates about the status of your contract via email.</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Please find your complete contract PDF attached to this email.
          </p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `,
      attachments: [
        {
          filename: `contract-${contractData.contractId}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf'
        }
      ]
    };

    console.log('📧 Sending customer confirmation email...');
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Contract confirmation sent successfully to ${customerEmail}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Contract confirmation failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Contact Form to Admin
async function sendContactFormToAdmin(formData) {
  try {
    const { firstName, lastName, email, phone, businessType, quantity, message } = formData;
    
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: 'pratiksindhiya3@gmail.com',
      subject: 'New Contact Form Submission - Aqua2Promo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo - New Contact Form</h2>
          <h3>Contact Details</h3>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Business Type:</strong> ${businessType || 'Not specified'}</p>
            <p><strong>Quantity Required:</strong> ${quantity || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message || 'No message provided'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>Please respond to this inquiry within 24 hours.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact form sent to admin successfully`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Contact form to admin failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Auto-Response to Customer
async function sendContactFormAutoResponse(customerEmail, firstName) {
  try {
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: customerEmail,
      subject: 'Thank You for Contacting Aqua2Promo - We\'ll Connect Soon!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo</h2>
          <h3>Thank You for Your Interest!</h3>
          <p>Dear ${firstName},</p>
          <p>Thank you for reaching out to us! We have received your inquiry and are excited to help you with your custom water bottle needs.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h4 style="color: #2563eb; margin-top: 0;">What Happens Next?</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your requirements</li>
              <li>We'll contact you within <strong>24 hours</strong></li>
              <li>We'll provide a customized quote for your project</li>
              <li>We'll discuss design options and timeline</li>
            </ul>
          </div>
          
          <p>We specialize in:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Premium Custom Water Bottles</li>
            <li>High-Quality Printing & Branding</li>
            <li>Bulk Orders for Hotels, Restaurants & Events</li>
            <li>3D Design Visualization</li>
            <li>Fast Delivery & Excellent Service</li>
          </ul>
          
          <p>If you have any urgent questions, feel free to call us directly.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Contact Info:</strong></p>
            <p style="margin: 5px 0;">📧 Email: pratiksindhiya3@gmail.com</p>
            <p style="margin: 5px 0;">🌐 Website: aqua2promo.com</p>
          </div>
          
          <p>Thank you for choosing Aqua2Promo!</p>
          <p>Best regards,<br>The Aqua2Promo Team</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Auto-response sent to customer successfully: ${customerEmail}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Auto-response to customer failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Booking Form to Admin
async function sendBookingFormToAdmin(formData) {
  try {
    const { fullName, companyName, email, phone, preferredDate, preferredTime, meetingType, businessType, estimatedQuantity, bottlePreferences, additionalRequirements } = formData;
    
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: 'pratiksindhiya3@gmail.com',
      subject: 'New Booking Appointment - Aqua2Promo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo - New Booking Appointment</h2>
          <h3>Appointment Details</h3>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Company:</strong> ${companyName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p><strong>Meeting Type:</strong> ${meetingType}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
            <p><strong>Estimated Quantity:</strong> ${estimatedQuantity}</p>
            <p><strong>Bottle Preferences:</strong> ${bottlePreferences.join(', ') || 'None selected'}</p>
            <p><strong>Additional Requirements:</strong> ${additionalRequirements || 'None provided'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>Please confirm this appointment within 24 hours.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Booking form sent to admin successfully`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Booking form to admin failed:', error);
    return { success: false, error: error.message };
  }
}

// Send Auto-Response to Customer for Booking
async function sendBookingFormAutoResponse(customerEmail, fullName) {
  try {
    const mailOptions = {
      from: 'pratiksindhiya3@gmail.com',
      to: customerEmail,
      subject: 'Appointment Booked - Aqua2Promo Consultation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Aqua2Promo</h2>
          <h3>Appointment Confirmed!</h3>
          <p>Dear ${fullName},</p>
          <p>Thank you for booking an appointment with us! We have received your consultation request and are excited to discuss your custom water bottle project.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h4 style="color: #2563eb; margin-top: 0;">What Happens Next?</h4>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your appointment details</li>
              <li>We'll contact you within <strong>24 hours</strong> to confirm your appointment</li>
              <li>We'll provide meeting details and preparation materials</li>
              <li>We'll discuss your project requirements and timeline</li>
            </ul>
          </div>
          
          <p>During your consultation, we'll cover:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Custom bottle design options</li>
            <li>Printing and branding solutions</li>
            <li>Quantity and pricing details</li>
            <li>Timeline and delivery options</li>
            <li>3D visualization of your design</li>
          </ul>
          
          <p>If you need to reschedule or have any questions, please contact us directly.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Contact Info:</strong></p>
            <p style="margin: 5px 0;">📧 Email: pratiksindhiya3@gmail.com</p>
            <p style="margin: 5px 0;">📞 Phone: +91 8858146872</p>
            <p style="margin: 5px 0;">🌐 Website: aqua2promo.com</p>
          </div>
          
          <p>Thank you for choosing Aqua2Promo!</p>
          <p>Best regards,<br>The Aqua2Promo Team</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">© 2024 Aqua2Promo. All rights reserved.</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Booking auto-response sent to customer successfully: ${customerEmail}`);
    console.log(`📧 Message ID: ${result.messageId}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Booking auto-response to customer failed:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendEmailOTP, sendContractNotification, sendContractConfirmation, sendContactFormToAdmin, sendContactFormAutoResponse, sendBookingFormToAdmin, sendBookingFormAutoResponse };