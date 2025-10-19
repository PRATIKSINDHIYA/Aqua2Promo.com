# Aqua2Promo - Full-Stack Authentication System

A complete authentication system with Firebase authentication and free Node.js OTP verification.

## Features

- ✅ **Firebase Authentication** (Email/Password + Google Sign-in)
- ✅ **Free Mobile OTP Verification** using Node.js
- ✅ **User Profile Management**
- ✅ **Responsive UI** with Tailwind CSS
- ✅ **Real-time OTP with Countdown Timer**
- ✅ **OTP Resend with Rate Limiting**

## Tech Stack

### Frontend
- React + Vite
- Firebase SDK v9 (modular)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js + Express
- Firebase Admin SDK
- OTP Generator (free)
- bcryptjs for hashing

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-in
4. Get your Firebase config:
   - Go to Project Settings > General
   - Copy the config values

### 2. Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create `.env.local` in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=http://localhost:5000
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

### 3. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create `.env` in the backend directory:
   ```env
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_PRIVATE_KEY_ID=your_private_key_id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_CLIENT_ID=your_client_id
   PORT=5000
   ```

4. **Start the backend:**
   ```bash
   npm start
   ```

### 4. Firebase Admin Setup

1. Go to Firebase Console > Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the values to your backend `.env` file

## API Endpoints

### Backend API (Port 5000)

- `POST /send-otp` - Send OTP to phone number
- `POST /verify-otp` - Verify OTP
- `POST /resend-otp` - Resend OTP (with rate limiting)
- `GET /health` - Health check

## Project Structure

```
bottle-canvas-pro/
├── src/
│   ├── components/          # UI Components
│   ├── contexts/           # React Contexts
│   ├── pages/              # Page Components
│   ├── config/             # Configuration
│   └── ...
├── backend/
│   ├── server.js           # Express server
│   ├── config.js           # Configuration
│   └── package.json
└── README.md
```

## Authentication Flow

1. **Signup:**
   - User fills signup form
   - Account created in Firebase Auth
   - User details stored in Firestore
   - OTP sent to phone number

2. **OTP Verification:**
   - User enters OTP
   - OTP verified on backend
   - Phone verification status updated in Firestore

3. **Login:**
   - User can login with email/password or Google
   - Profile page shows user details and verification status

## Features Details

### OTP System
- **6-digit numeric OTP**
- **5-minute expiry**
- **Maximum 3 resend attempts**
- **1-minute cooldown between resends**
- **Automatic cleanup of expired OTPs**

### Security
- OTPs are hashed using bcrypt
- Rate limiting on resend attempts
- Server-side validation
- Firebase security rules

### UI/UX
- Responsive design
- Loading states
- Error handling
- Toast notifications
- Countdown timer for OTP

## Development

### Frontend Development
```bash
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev  # Requires nodemon
```

### Production Build
```bash
npm run build
```

## Environment Variables

### Frontend (.env.local)
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
PORT=5000
```

## Troubleshooting

1. **Firebase connection issues:**
   - Check your Firebase config
   - Ensure project ID matches
   - Verify API keys are correct

2. **OTP not working:**
   - Check backend server is running
   - Verify API_URL in frontend
   - Check console for OTP (demo mode)

3. **Authentication errors:**
   - Check Firebase Auth is enabled
   - Verify domain is added to authorized domains
   - Check browser console for errors

## Demo Mode

The OTP system runs in demo mode by default. OTPs are logged to the console instead of being sent via SMS. To implement real SMS:

1. Integrate with SMS service (Twilio, AWS SNS, etc.)
2. Replace console.log with actual SMS sending
3. Add SMS service credentials to environment

## License

MIT License