# 🚀 Aqua2Promo Deployment Guide

## 📁 Project Structure
```
bottle-canvas-pro/
├── src/                    # Frontend (React + Vite)
├── backend/               # Backend (Node.js + Express)
├── public/                # Static assets
├── vercel.json           # Vercel configuration
└── package.json          # Frontend dependencies
```

## 🎯 Deployment Strategy

### Frontend: Vercel (Recommended)
- **URL**: `https://aqua2promo.vercel.app`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend: Vercel API Routes
- **URL**: `https://aqua2promo.vercel.app/api/*`
- **Runtime**: Node.js 18+

## 🔧 Step-by-Step Deployment

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Add Vercel configuration"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: aqua2promo
# - Directory: ./
# - Override settings? No
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `PRATIKSINDHIYA/Aqua2Promo`
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables Setup

In Vercel Dashboard → Project Settings → Environment Variables:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=aqua2promo-998b7
FIREBASE_PRIVATE_KEY_ID=20912a1a656ed967b309ad3131bca5f87095ee8b
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqoqe9GjkkTo6c...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@aqua2promo-998b7.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=100080266919396348385

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=pratiksindhiya3@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=pratiksindhiya3@gmail.com

# Server Configuration
NODE_ENV=production
```

### 4. Update Frontend API URLs

Update your frontend to use the deployed backend:

```typescript
// In your frontend code, update API base URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://aqua2promo.vercel.app/api'
  : 'http://localhost:5000';
```

## 🔄 Alternative Backend Deployment Options

### Option 1: Railway (Recommended for complex backends)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy from `backend/` directory
4. Set environment variables
5. Get backend URL: `https://aqua2promo-backend.railway.app`

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`

## 🌐 Domain Setup (Optional)

### Custom Domain
1. In Vercel Dashboard → Domains
2. Add your domain: `aqua2promo.com`
3. Update DNS records as instructed
4. SSL certificate will be auto-generated

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Firebase Analytics
- User behavior tracking
- Custom events
- Conversion tracking

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Firebase security rules updated
- [ ] Email credentials secured
- [ ] API rate limiting implemented

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **API Routes Not Working**
   - Verify `vercel.json` configuration
   - Check backend deployment
   - Test API endpoints manually

3. **Environment Variables**
   - Ensure all required variables set
   - Check variable names match code
   - Redeploy after adding variables

### Debug Commands:
```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
npm run dev

# Check Vercel deployment
vercel logs
```

## 📞 Support

For deployment issues:
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Firebase Documentation: [firebase.google.com/docs](https://firebase.google.com/docs)
- GitHub Repository: [github.com/PRATIKSINDHIYA/Aqua2Promo](https://github.com/PRATIKSINDHIYA/Aqua2Promo)

---

**🎉 Congratulations! Your Aqua2Promo app is now deployed!**

- **Frontend**: `https://aqua2promo.vercel.app`
- **Backend API**: `https://aqua2promo.vercel.app/api/*`
- **Admin Panel**: `https://aqua2promo.vercel.app/admin`