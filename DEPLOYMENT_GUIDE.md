# Aqua2Promo Deployment Guide

This guide will help you deploy the Aqua2Promo application with the frontend on Hostinger and the backend on Render.

## 🎯 Overview

- **Frontend**: React + Vite application deployed on Hostinger
- **Backend**: Node.js + Express API deployed on Render
- **Database**: Firebase Firestore
- **Email**: Nodemailer with Gmail SMTP

## 📋 Prerequisites

1. **Hostinger Account**: For frontend hosting
2. **Render Account**: For backend API hosting
3. **Firebase Project**: For database and authentication
4. **Gmail Account**: For email services
5. **Domain Name**: (Optional but recommended)

## 🚀 Part 1: Frontend Deployment on Hostinger

### Step 1: Prepare Frontend for Hostinger

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Run the Hostinger deployment script:**
   ```bash
   npm run deploy:hostinger
   ```

3. **This will create a `hostinger-deploy/public_html/` folder with all necessary files.**

### Step 2: Upload to Hostinger

1. **Login to your Hostinger control panel**
2. **Go to File Manager**
3. **Navigate to `public_html` folder**
4. **Upload all contents from `hostinger-deploy/public_html/` to your `public_html` folder**
5. **Make sure the `.htaccess` file is uploaded (for React Router support)**

### Step 3: Configure Domain (if using custom domain)

1. **Point your domain to Hostinger's nameservers**
2. **Update DNS settings if needed**
3. **Test your website at your domain**

### Step 4: Update API Endpoints

Update your frontend API calls to point to your Render backend URL:

```javascript
// In your frontend code, update API base URL
const API_BASE_URL = 'https://your-backend-app.onrender.com';
```

## 🔧 Part 2: Backend Deployment on Render

### Step 1: Prepare Backend for Render

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Test locally:**
   ```bash
   npm start
   ```

### Step 2: Deploy to Render

1. **Login to Render Dashboard**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Select the backend folder as root directory**
5. **Configure the service:**

   **Basic Settings:**
   - **Name**: `aqua2promo-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`

   **Build & Deploy:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Configure Environment Variables

In Render dashboard, go to your service → Environment tab and add:

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

### Step 4: Deploy and Test

1. **Click "Create Web Service"**
2. **Wait for deployment to complete**
3. **Test the health endpoint**: `https://your-app.onrender.com/health`
4. **Update your frontend API URLs to use the Render URL**

## 🔐 Part 3: Firebase Configuration

### Step 1: Firebase Project Setup

1. **Go to Firebase Console**
2. **Create a new project or use existing**
3. **Enable Firestore Database**
4. **Enable Authentication with Email/Password**

### Step 2: Service Account Setup

1. **Go to Project Settings → Service Accounts**
2. **Generate new private key**
3. **Download the JSON file**
4. **Extract the values for environment variables**

### Step 3: Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📧 Part 4: Email Configuration

### Step 1: Gmail App Password

1. **Enable 2-Factor Authentication on Gmail**
2. **Generate App Password for "Mail"**
3. **Use this password in EMAIL_PASS environment variable**

### Step 2: Test Email Functionality

1. **Deploy your backend**
2. **Test the `/test-email` endpoint**
3. **Verify emails are being sent correctly**

## 🔗 Part 5: Connecting Frontend and Backend

### Step 1: Update Frontend API Configuration

In your frontend code, update the API base URL:

```javascript
// src/config/constants.ts or similar
export const API_BASE_URL = 'https://your-backend-app.onrender.com';
```

### Step 2: CORS Configuration

The backend is already configured to allow all origins. For production, you might want to restrict this:

```javascript
// In backend/server.js
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 🧪 Part 6: Testing Your Deployment

### Frontend Tests

1. **Visit your Hostinger domain**
2. **Test all pages and navigation**
3. **Test form submissions**
4. **Test 3D model loading**

### Backend Tests

1. **Health check**: `GET https://your-app.onrender.com/health`
2. **Email OTP**: `POST https://your-app.onrender.com/send-email-otp`
3. **Contract submission**: `POST https://your-app.onrender.com/submit-contract`
4. **Contact form**: `POST https://your-app.onrender.com/api/contact`

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Check your backend CORS configuration
2. **Email Not Sending**: Verify Gmail app password and SMTP settings
3. **Firebase Errors**: Check service account credentials
4. **Build Failures**: Check Node.js version compatibility

### Debug Commands

```bash
# Check backend logs in Render dashboard
# Check frontend console for errors
# Test API endpoints with Postman or curl
```

## 📊 Monitoring

### Render Monitoring

1. **Check Render dashboard for service health**
2. **Monitor logs for errors**
3. **Set up alerts for downtime**

### Hostinger Monitoring

1. **Check website uptime**
2. **Monitor file uploads and permissions**
3. **Check SSL certificate status**

## 🔄 Updates and Maintenance

### Frontend Updates

1. **Make changes to your code**
2. **Run `npm run build`**
3. **Run `npm run deploy:hostinger`**
4. **Upload new files to Hostinger**

### Backend Updates

1. **Push changes to GitHub**
2. **Render will automatically redeploy**
3. **Check deployment logs for issues**

## 📞 Support

If you encounter issues:

1. **Check Render logs for backend issues**
2. **Check browser console for frontend issues**
3. **Verify all environment variables are set correctly**
4. **Test API endpoints individually**

---

**🎉 Congratulations! Your Aqua2Promo application should now be live on Hostinger (frontend) and Render (backend)!**