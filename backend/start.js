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

// Import all routes from server.js
require('./server.js');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});