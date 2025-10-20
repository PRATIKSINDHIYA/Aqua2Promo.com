// Hostinger startup script
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

// Initialize Firebase Admin with NEW service account
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "aqua2promo-998b7",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "97d8e5e8a5266fd447080dcb4f54312e9df3d979",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDH7w40OHDUC5CJ\n8OGeoyuktU0zq1D77bGf9sUQS2RSyCZwXLf/Kzc0EvxFDac7MMWz7P/yE5bnPAyl\nxVynQOzwbmjeL9I5ElLaCLMfjLVDefkX1DHGOMcZdLpGBfs9w9SDCxGUT1G130G0\nZQam+NRv5EqHGTMJQj2Ljk/AnOpRIoYCKZG8tPbyY/haM0D1x3SOz8fnRxIHQr/V\nFGaI2rSk4PN83F5EO2QQlareELy0+vebhG1QZyipZQoF0TTDuCxgCiFzDgRxvLHd\nkR0QA0AOzsaiQbkesbXHGgo5NceEImi7aiqrYoSZ8h1Plx/yIXos+wvIiu1ngyu+\npBU4YVtLAgMBAAECggEAR8IzVObVCCZGcFv2fpuN9IXl+Z+JZ4J+eC13uUt17IhN\n05JTr8/w9k3CIX6vAP2WV+e+TUJerQvOdkkJ4jXZVMor9WMwjq9W8U6iC7bS8C79\nCmJsovqJ60cL/En1TMvWoFn+qz5001QYHwkLhC5XAPntDeQrfy05LbecREONjiS0\ndBsSAgKQPqvSDhsvi0ra+RNeLnKQWT8ER1+4r2MxXqhy2Bkmp0pEEu9H1nra0LJt\nc+tusTEsmC89AFUeWMPmkj2kbXWcFW6/joYm4NSeMJQ4S83JWJ2WC7eV73XMpFpk\nIjniBhivp3N1SiY0yROxXLkabWJXJ1R7LXolQzH7gQKBgQD+XH0pqjxF+oPzN/eu\nSKdxKmH4RdJ/IMsyBTD9OE/SDtkctspq2ce+g4bqumWJdPa18Buh3p+/W7UkN8kK\n91+FJmIG4gYlTLf2yHc1Ss2pFzPVvmP4/G+ofUWbHJnWC/lUWQSKqZb59Bd1DNjz\nlLOyZkjnWwujG3eDvwf7ib1xYQKBgQDJOM0DFX2mvwTzVEhw449CwaGD8weI9HK/\np2bngbyoXIC3OkL7v2tnalMiM53HGG5TJQLall7Yftw5TqERa61PztgoYGGkpU2j\nlQc20R8MxzaK7xNDQMPXKWxIjR/62WdORwktsA2FB9CMpJGQFjPVDKZET5TKPwht\n4aToaMFQKwKBgCYUDHy3Smyjcytu/not0DtFwALd2QRFEYY8drgBvRlSNbhxuN3E\nGn3vzLvJCbhJNUHJXymdXUbVYMm6PDOTEs6pD1W+cnMVCBk+q3Hj7+PXYGAoL2kv\nyTts/YWaA4Giq0GwTdjASKTEoNpaAQR+B2S2oUVZQOW7D+o+J+DFHwIhAoGAIpJ7\nxtfeatPPCe+lMqAmcRXLplwPI1y8imk8qPIFc/fQtapw78gHsBD4j5vGs/pimi51\nuxCy4weI1t/HlLKnaFrlkKpenGc6W6yzPJvZddyUZnKFILzz6PfY/u4gXH0V3sEd\ntpfU+tJI5qEv0U2/Qg+WUY5KxiTmUdq+9p9o91kCgYEA9C8Mkh2/eOHl3YhX7RvE\nEnurLyvNEJoFMmui0XIB9nlhbe2d6alA3lPqfYjtXeOMMquSgFpMca3Kbjyc/sgo\nxz121agMlRopvZRRLG5bBftcnr+W1DoJRLi1WbFA7obgBjkEd64ApJQpNohgnZPU\nv3zr/haUZIkxVgIc8VlWFpY=\n-----END PRIVATE KEY-----\n",
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

// Import all routes from server.js
require('./server.js');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});