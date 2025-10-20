# Aqua2Promo Backend API

This is the backend API for the Aqua2Promo application, designed to be deployed on Render.

## Features

- User authentication with Firebase
- Email OTP verification
- Contract submission with PDF generation
- Contact and booking form handling
- Email notifications

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
NODE_ENV=production
PORT=10000

# Firebase Configuration
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=admin@yourdomain.com

# Contract Configuration
CONTRACT_PIN=1234
```

## Deployment on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following configuration:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Node Version**: 18 or higher

4. Add all the environment variables from your `.env` file
5. Deploy the service

## API Endpoints

- `POST /send-email-otp` - Send email OTP
- `POST /verify-email-otp` - Verify email OTP
- `POST /submit-contract` - Submit contract
- `GET /admin/contracts` - Get all contracts (admin)
- `POST /api/booking` - Submit booking form
- `POST /api/contact` - Submit contact form
- `GET /health` - Health check

## Local Development

```bash
npm install
npm run dev
```

The server will start on port 5000 (or the PORT environment variable).