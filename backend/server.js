const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const { sendEmailOTP, sendContractNotification, sendContractConfirmation, sendContactFormToAdmin, sendContactFormAutoResponse, sendBookingFormToAdmin, sendBookingFormAutoResponse } = require('./email-service');
const { jsPDF } = require('jspdf');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize Firebase Admin
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "aqua2promo-998b7",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "20912a1a656ed967b309ad3131bca5f87095ee8b",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqoqe9GjkkTo6c\nA7Im7MTRAflkWoFZfwvXTY83c0w0gdpxTdZbbmuzYf5Ag8JwC+3cWnFD994wGaC9\n/5tKdMdHRWBnIlAGqH7iH2FX3lS0PPaaXzVYvnY8xDapNC0R4o16M6WQpcjJsbvy\n2x1a3U4kq4tlnw3iQFWZBzdn1ZJIrqAl1dsmArQFOyLHMBKHQaaS1smq4WtgQSxm\nuj+jYMxzgfcYCyTiSyhk2Hu3/rP5N0QZwo260CtkzOszcnNhmMSrrjE/JJrpMizf\nIDTQGGzLVkhWiDy9+zVkPZN47FweUWigOZxeRbRaqLHqlNhrhfBp9j9Uvg1pejvf\n4s0vgS5LAgMBAAECggEActnWkJZ29QItBUo72JjaCFLWkBxLJ5MsKSISYfqiiSss\n0Xxf2lZ1CpQDf/He6bi1IED3I2V/kXzh9U7aZTo/V3AqraEamf+9SBNDM18liCo1\nLcA/3SYxuzHybaWYECKczP3d46162NuSm+BMgK9GMmXz8HTIN4D1RVhGcyGUHtXH\nogtXz73waFvAF+S9Vkf/A/AGuJyngbIXt+cuit+xKn4yhtSjlkaLTFsLc3pLnxXA\nsnbP1t0kOfuGHUBUKOmloN5xg1v21P5YLZgWQfpjIqEgQENQxsAg3n8/J78mKrOQ\nlKJI6gVk4RewS121Yj8iBeBYqUOzvNq6XKMpkivYUQKBgQD4gnYw8GA/nxwfEGjB\npGS3j0RpJB8my5/Sy6MsYHKcjtPwnj/KoaQsrV5nx4eMUD+qdblQLRI8Uvs/aTFR\ni+QbPDlQ9tazNm+jkFYTF6DdKHvpfvvE2zl2XRJR4IihtqYM1ZohL9q4y8XqP/FK\nh3HxYKe9vWKzfCRMF+2SePZPcQKBgQDxtSNDm5RN/OrRCu9RmKQIWwOjbltCRH0T\nquhbEhLsalpQKA9hVOai9DsvBhsQG4UEwL+qMLy1S9AdONgZCu5XnEvsO/yygbt3\n8ohcPRmxgP21KAxVliHHVp5gg7bpAaINKk1mlQErmldCbNYeX1HeTTYEzOWcnOt0\nmKCYDO2zewKBgQC4W7io57rPmA85sGe2uGmLj7p1sbl2g3tm23GLG2YLZR4wFIZI\nog/0oQ03OlwBqQsCP2Gh7D3qCLmhuj0/POOVnOD8gpKW0xyRICPq+A175GvAtla7\nHNONTtCnc0aJicG4JcK5OhIuI+YIuTUdUEwkgMsQRO5zLvaSiPHTRu+b0QKBgAn1\nOHq0kiuUW+g41xs5eqiNd1zoUwIr6CtDQ0ddO0JaL1ZWECwmX0ofXcDWM486UwSb\nHEpar6uYb/6ENQLzHFanrckRv5trFNogN9X0/nX9pnYsLDXqdYHM48F+K671zkNU\nltO/F8lAFpA6A6hErQ7Hh44zEtKc9GZdU2BwR+q5AoGAIA/dM64WzIT5uAUaqBJ0\nVQP+zcpGV5CxYms5f6gm5poSeLCdysBTH3PK/h0rS8fmrkQVM5TKcVH9iCS+MSJJ\ngCpLyT593bEMYCK0HlN29BInUnk0dK+79ZRnAnhyO3V0Fc9fnrh+zAsAleLLbWmA\nR9VQkNlbTLkMhg+YpfWG5j0=\n-----END PRIVATE KEY-----\n",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@aqua2promo-998b7.iam.gserviceaccount.com",
  client_id: process.env.FIREBASE_CLIENT_ID || "100080266919396348385",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@aqua2promo-998b7.iam.gserviceaccount.com"}`
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID || "aqua2promo-998b7"
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

const db = admin.firestore();

// Store for Email OTPs
const emailOTPStore = new Map();

// Default PIN for contract submission (you can change this)
const DEFAULT_CONTRACT_PIN = '1234';

// Generate PDF for contract
const generateContractPDF = (contractData) => {
  const pdf = new jsPDF();
  let yPosition = 20;
  let pageNumber = 1;
  const maxY = 280; // Maximum Y position before new page
  
  // Helper function to add new page if needed
  const checkNewPage = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > maxY) {
      pdf.addPage();
      yPosition = 20;
      pageNumber++;
    }
  };
  
  // Add background logos (multiple blurred logos)
  try {
    // Add multiple blurred logos in background
    pdf.setGState(pdf.GState({opacity: 0.05}));
    pdf.setFontSize(40);
    pdf.setTextColor(200, 200, 200);
    
    // Add multiple logos at different positions
    pdf.text('AQUA2PROMO', 30, 100, {angle: 15});
    pdf.text('AQUA2PROMO', 120, 200, {angle: -15});
    pdf.text('AQUA2PROMO', 80, 150, {angle: 30});
    pdf.text('AQUA2PROMO', 150, 80, {angle: -30});
    
    pdf.setGState(pdf.GState({opacity: 1}));
  } catch (e) {
    console.log('Background logos not added:', e.message);
  }
  
  // Add contract content with better formatting
  pdf.setTextColor(0, 119, 182); // Blue color
  pdf.setFontSize(18);
  pdf.text('AQUA2PROMO E-CONTRACT AGREEMENT', 20, yPosition);
  yPosition += 20;
  
  pdf.setTextColor(0, 0, 0); // Black color
  pdf.setFontSize(12);
  pdf.text('Between:', 20, yPosition);
  yPosition += 8;
  pdf.text('Aqua2Promo', 20, yPosition);
  yPosition += 8;
  pdf.text('and', 20, yPosition);
  yPosition += 8;
  pdf.text('Partner Business (Café / Restaurant / Event / Shop)', 20, yPosition);
  yPosition += 20;
  
  // Partner Information
  checkNewPage(30);
  pdf.setFontSize(14);
  pdf.setTextColor(0, 119, 182);
  pdf.text('1. Partner Information', 20, yPosition);
  yPosition += 12;
  
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`Full Name: ${contractData.fullName}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Designation: ${contractData.designation}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Company / Café / Restaurant / Event / Shop Name: ${contractData.companyName}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Registered Address: ${contractData.registeredAddress}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Mobile Number: ${contractData.mobileNumber}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Email ID: ${contractData.emailId}`, 20, yPosition);
  yPosition += 6;
  pdf.text(`Date of Agreement: ${contractData.dateOfAgreement}`, 20, yPosition);
  yPosition += 15;
  
  // Add all contract terms as per your requirements
  const contractClauses = [
    {
      title: '2. Purpose of the Agreement',
      content: 'This e-contract establishes the understanding between Aqua2Promo and the Partner Business for the supply of customized and white-labelled water bottles or similar promotional products under the Partner\'s brand name.'
    },
    {
      title: '3. Logo and Trademark Usage',
      content: 'The Partner agrees to share their official logo, trademark, and design for product branding.\n\nThe Partner confirms that they own the full rights to the provided logo/trademark and that it does not violate any third-party rights.\n\nAqua2Promo is not responsible or liable for any disputes regarding trademark authenticity or ownership. The Partner will be solely responsible for such matters.'
    },
    {
      title: '4. Ordering & Reordering Timeline',
      content: 'All reorders must be placed at least 1 day in advance to ensure smooth delivery and production.\n\nSame-day or urgent orders may be accepted subject to stock and production capacity.'
    },
    {
      title: '5. Inventory & Discontinuation of Service',
      content: 'Aqua2Promo maintains dedicated stock for each Partner\'s customized products.\n\nIf the Partner wishes to discontinue the service, they must inform Aqua2Promo at least 1 month in advance through a phone call or WhatsApp message.\n\nDuring this period, the Partner agrees to clear all existing stock produced or stored under their brand in Aqua2Promo\'s inventory.'
    },
    {
      title: '6. Product Delivery & Complaints',
      content: 'The Partner must check all products at the time of delivery.\n\nIf any damage, defect, or issue is found, it should be reported immediately upon delivery.\n\nAqua2Promo will replace or return the product only if the complaint is made at the time of delivery.\n\nOnce the delivery is accepted, no returns or replacements will be accepted later.'
    },
    {
      title: '7. Payment Terms',
      content: 'The Partner may choose either of the following payment options:\n\nFull Payment on Delivery — Payment made at the time of receiving goods.\n\nMonthly Stock Option — The Partner can take 1 month\'s stock and make payments on a weekly basis in 4 equal installments.\n\nAll payments must be made as per the agreed schedule. Delay in payments may result in service suspension or withholding of further orders.'
    },
    {
      title: '8. Limitation of Liability',
      content: 'Aqua2Promo will not be responsible for any misuse, resale, or improper handling of the product.\n\nAny disputes or legal claims regarding the authenticity of the logo/trademark provided by the Partner.\n\nThe Partner agrees to indemnify and hold Aqua2Promo harmless from any claims or damages arising from their provided branding materials.'
    },
    {
      title: '9. Duration of Agreement',
      content: 'This agreement remains valid until the Partner discontinues the service as per Clause 5. Both parties agree to conduct all business under this contract in compliance with Indian laws and regulations.'
    },
    {
      title: '10. Acceptance of Terms',
      content: 'By checking the box below and submitting this form, the Partner confirms that:\n\nThey have read and understood the terms of this e-contract.\n\nThey agree to all terms and conditions stated above.\n\nThe details shared are true and correct, and this digital acceptance shall be legally binding.'
    },
    {
      title: '11. Event-Based Orders (One-Time Purchases)',
      content: 'In cases where the Partner purchases bottles for a single event, occasion, or one-time use, the full payment must be made at the time of delivery.\n\nThe Partner also grants Aqua2Promo the right to use the name and logo of the event for promotional and portfolio purposes.\n\nAll logo and trademark usage terms stated in Clause 3 will apply equally to such event-based orders.'
    }
  ];
  
  // Add each clause
  contractClauses.forEach((clause, index) => {
    checkNewPage(30);
    pdf.setFontSize(14);
    pdf.setTextColor(0, 119, 182);
    pdf.text(clause.title, 20, yPosition);
    yPosition += 12;
    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    
    // Split content by newlines and add each line
    const lines = clause.content.split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        pdf.text(line.trim(), 20, yPosition);
        yPosition += 6;
      } else {
        yPosition += 3; // Add space for empty lines
      }
    });
    yPosition += 10;
  });
  
  // Terms and Conditions checkbox
  checkNewPage(20);
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  pdf.text('✅ I Agree to the Terms and Conditions of Aqua2Promo E-Contract', 20, yPosition);
  yPosition += 15;
  
  // Digital Signature Section
  checkNewPage(30);
  pdf.setFontSize(14);
  pdf.setTextColor(0, 119, 182);
  pdf.text('Digital Signature / Name:', 20, yPosition);
  yPosition += 12;
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
  pdf.text(`${contractData.digitalSignatureName}`, 20, yPosition);
  yPosition += 8;
  pdf.text(`Date: ${contractData.digitalSignatureDate}`, 20, yPosition);
  yPosition += 10;
  
  // Add signature if available
  if (contractData.digitalSignature) {
    pdf.addImage(contractData.digitalSignature, 'PNG', 20, yPosition, 50, 20);
    yPosition += 25;
  }
  
  return pdf;
};

// Send Email OTP
app.post('/send-email-otp', async (req, res) => {
  try {
    const { email, uid } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ error: 'Email and UID are required' });
    }

    // Check if email already has an active OTP
    const existingOTP = emailOTPStore.get(email);
    if (existingOTP && existingOTP.expiresAt > Date.now()) {
      return res.status(400).json({ 
        error: 'OTP already sent. Please wait before requesting a new one.' 
      });
    }

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, { 
      upperCaseAlphabets: false, 
      lowerCaseAlphabets: false, 
      specialChars: false 
    });

    // Hash the OTP
    const saltRounds = 10;
    const otpHash = await bcrypt.hash(otp, saltRounds);

    // Store OTP data
    const otpData = {
      otpHash,
      email,
      uid,
      createdAt: new Date(),
      expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
      resendCount: 0
    };

    emailOTPStore.set(email, otpData);

    // Store in Firestore as well
    await db.collection('email-otps').doc(email).set({
      ...otpData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      expiresAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + (5 * 60 * 1000)))
    });

    // Send Email OTP
    const emailResult = await sendEmailOTP(email, otp);
    console.log(`Email OTP Result:`, emailResult);
    console.log(`OTP for ${email}: ${otp}`);
    console.log(`OTP expires at: ${new Date(otpData.expiresAt).toLocaleString()}`);

    res.json({ 
      success: true, 
      message: 'Email OTP sent successfully',
      expiresIn: 300 // 5 minutes in seconds
    });

  } catch (error) {
    console.error('Error sending Email OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify Email OTP
app.post('/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Get OTP data from store
    const otpData = emailOTPStore.get(email);
    
    if (!otpData) {
      return res.status(400).json({ error: 'No OTP found for this email' });
    }

    // Check if OTP has expired
    if (otpData.expiresAt < Date.now()) {
      emailOTPStore.delete(email);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Verify OTP
    const isValid = await bcrypt.compare(otp, otpData.otpHash);
    
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Update user's email verification status in Firestore
    try {
      await db.collection('users').doc(otpData.uid).update({
        emailVerified: true,
        emailVerifiedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user verification status:', error);
      // Continue with success response even if update fails
    }

    // Clean up OTP data
    emailOTPStore.delete(email);
    await db.collection('email-otps').doc(email).delete();

    res.json({ 
      success: true, 
      message: 'Email verified successfully' 
    });

  } catch (error) {
    console.error('Error verifying Email OTP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contract submission endpoint
app.post('/submit-contract', async (req, res) => {
  try {
    const {
      fullName,
      designation,
      companyName,
      registeredAddress,
      mobileNumber,
      emailId,
      dateOfAgreement,
      digitalSignature,
      digitalSignatureName,
      digitalSignatureDate,
      pin,
      userId
    } = req.body;

    // Validate required fields
    if (!fullName || !designation || !companyName || !registeredAddress || 
        !mobileNumber || !emailId || !dateOfAgreement || !digitalSignature || 
        !digitalSignatureName || !digitalSignatureDate || !pin || !userId) {
      return res.status(400).json({ 
        error: 'All required fields must be provided' 
      });
    }

    // Validate PIN format (4 digits)
    if (!/^\d{4}$/.test(pin)) {
      return res.status(400).json({ 
        error: 'PIN must be exactly 4 digits' 
      });
    }

    // Verify PIN
    if (pin !== DEFAULT_CONTRACT_PIN) {
      return res.status(400).json({ 
        error: 'Invalid PIN. Please enter the correct 4-digit PIN.' 
      });
    }

    // Store contract data in Firestore
    const contractData = {
      fullName,
      designation,
      companyName,
      registeredAddress,
      mobileNumber,
      emailId,
      dateOfAgreement,
      digitalSignature,
      digitalSignatureName,
      digitalSignatureDate,
      pin,
      userId,
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      contractId: `CONTRACT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Save to Firestore
    const contractRef = await db.collection('contracts').add(contractData);

    // Generate PDF for the contract
    const contractPDF = generateContractPDF(contractData);
    const pdfBuffer = contractPDF.output('arraybuffer');

    // Send email notifications
    try {
      console.log('📧 Starting email notifications...');
      
      // Send notification to admin with PDF attachment
      console.log('📧 Sending admin notification...');
      const adminEmailResult = await sendContractNotification(contractData, pdfBuffer);
      if (adminEmailResult.success) {
        console.log('✅ Admin notification sent successfully');
      } else {
        console.error('❌ Admin notification failed:', adminEmailResult.error);
      }

      // Send confirmation to customer
      console.log('📧 Sending customer confirmation...');
      const customerEmailResult = await sendContractConfirmation(emailId, contractData, pdfBuffer);
      if (customerEmailResult.success) {
        console.log('✅ Customer confirmation sent successfully');
      } else {
        console.error('❌ Customer confirmation failed:', customerEmailResult.error);
      }

      console.log('Contract submitted:', contractData.contractId);
    } catch (emailError) {
      console.error('❌ Error sending email notifications:', emailError);
      // Don't fail the request if email fails
    }

    res.json({ 
      success: true, 
      message: 'Contract submitted successfully',
      contractId: contractData.contractId
    });

  } catch (error) {
    console.error('Error submitting contract:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin endpoint to get all contracts
app.get('/admin/contracts', async (req, res) => {
  try {
    // In a real application, you would verify admin authentication here
    const contractsSnapshot = await db.collection('contracts').orderBy('submittedAt', 'desc').get();
    
    const contracts = [];
    contractsSnapshot.forEach(doc => {
      contracts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({ 
      success: true, 
      contracts 
    });

  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test email endpoint
app.post('/test-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Test email service
    const testResult = await sendContractConfirmation(email, {
      contractId: 'TEST_CONTRACT_123',
      companyName: 'Test Company',
      fullName: 'Test User'
    });

    if (testResult.success) {
      res.json({ 
        success: true, 
        message: 'Test email sent successfully',
        messageId: testResult.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: testResult.error 
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Booking form endpoint
app.post('/api/booking', async (req, res) => {
  try {
    const { fullName, companyName, email, phone, preferredDate, preferredTime, meetingType, businessType, estimatedQuantity, bottlePreferences, additionalRequirements } = req.body;
    
    // Validate required fields
    if (!fullName || !companyName || !email || !phone || !preferredDate || !preferredTime || !meetingType || !businessType || !estimatedQuantity) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Send email to admin (pratiksindhiya3@gmail.com)
    const adminEmailResult = await sendBookingFormToAdmin({
      fullName,
      companyName,
      email,
      phone,
      preferredDate,
      preferredTime,
      meetingType,
      businessType,
      estimatedQuantity,
      bottlePreferences,
      additionalRequirements
    });

    // Send auto-response to customer
    const customerEmailResult = await sendBookingFormAutoResponse(email, fullName);

    if (adminEmailResult.success && customerEmailResult.success) {
      res.json({ success: true, message: 'Booking form submitted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send emails' });
    }
  } catch (error) {
    console.error('Booking form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, businessType, quantity, message } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Send email to admin (pratiksindhiya3@gmail.com)
    const adminEmailResult = await sendContactFormToAdmin({
      firstName,
      lastName,
      email,
      phone,
      businessType,
      quantity,
      message
    });

    // Send auto-response to customer
    const customerEmailResult = await sendContactFormAutoResponse(email, firstName);

    if (adminEmailResult.success && customerEmailResult.success) {
      res.json({ success: true, message: 'Contact form submitted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send emails' });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});