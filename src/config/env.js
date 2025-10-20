// Environment configuration
export const config = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBk7Atv7matMzNT8xiDpzB7z-5wBAIhCos",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aqua2promo-998b7.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aqua2promo-998b7",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aqua2promo-998b7.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "36925593507",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:36925593507:web:dd9452351b5dd070ae6c16",
    measurementId: "G-74V4THXV11"
  },
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "https://aiwillendjobs.com" : "http://localhost:5000")
};