#!/bin/bash

# Productivity Tracker - Dependencies Installation Script
# This script installs all dependencies for both frontend and backend

echo "🚀 Installing Productivity Tracker Dependencies..."
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install Frontend Dependencies (React/TypeScript)
echo "📦 Installing Frontend Dependencies..."
echo "======================================"
cd tracker

echo "Installing production dependencies..."
npm install @headlessui/react@^2.2.4 \
    @types/md5@^2.3.5 \
    @types/uuid@^10.0.0 \
    axios@^1.6.2 \
    chart.js@^4.5.0 \
    date-fns@^2.30.0 \
    firebase@^11.8.1 \
    md5@^2.3.0 \
    react@^18.2.0 \
    react-beautiful-dnd@^13.1.1 \
    react-chartjs-2@^5.3.0 \
    react-dom@^18.2.0 \
    react-hook-form@^7.48.2 \
    react-hot-toast@^2.5.2 \
    react-icons@^4.12.0 \
    react-intersection-observer@^9.16.0 \
    react-router-dom@^6.30.1 \
    react-toastify@^9.1.3 \
    uuid@^11.1.0 \
    zustand@^5.0.5

echo "Installing development dependencies..."
npm install --save-dev @tailwindcss/forms@^0.5.7 \
    @types/node@^20.10.0 \
    @types/react@^18.2.37 \
    @types/react-beautiful-dnd@^13.1.7 \
    @types/react-dom@^18.2.15 \
    @typescript-eslint/eslint-plugin@^6.10.0 \
    @typescript-eslint/parser@^6.10.0 \
    @vitejs/plugin-react@^4.2.0 \
    autoprefixer@^10.4.16 \
    eslint@^8.53.0 \
    eslint-plugin-react-hooks@^4.6.0 \
    eslint-plugin-react-refresh@^0.4.4 \
    postcss@^8.4.31 \
    sass@^1.89.1 \
    tailwindcss@^3.3.5 \
    typescript@^5.2.2 \
    vite@^5.0.0

echo "✅ Frontend dependencies installed successfully!"
echo ""

# Go back to root and install Backend Dependencies
echo "📦 Installing Backend Dependencies..."
echo "====================================="
cd ../backend

echo "Installing production dependencies..."
npm install aws-sdk@^2.1692.0 \
    bcryptjs@^2.4.3 \
    colors@^1.4.0 \
    cors@^2.8.5 \
    dotenv@^16.5.0 \
    express@^4.21.2 \
    express-rate-limit@^7.1.5 \
    express-validator@^7.2.1 \
    firebase-admin@^11.5.0 \
    helmet@^7.1.0 \
    hpp@^0.2.3 \
    jsonwebtoken@^9.0.2 \
    mongoose@^7.8.7 \
    morgan@^1.10.0 \
    multer@^2.0.1 \
    multer-s3@^3.0.1 \
    node-cron@^3.0.3 \
    nodemailer@^6.9.14 \
    ollama@^0.5.2 \
    passport@^0.6.0 \
    passport-google-oauth20@^2.0.0 \
    passport-jwt@^4.0.1 \
    sharp@^0.34.2 \
    winston@^3.11.0 \
    xss-clean@^0.1.4

echo "Installing development dependencies..."
npm install --save-dev nodemon@^2.0.22

echo "✅ Backend dependencies installed successfully!"
echo ""

# Go back to root
cd ..

echo "🎉 All Dependencies Installed Successfully!"
echo "==========================================="
echo ""
echo "📋 Installation Summary:"
echo "├── Frontend (React/TypeScript): ✅"
echo "│   ├── React 18.2.0"
echo "│   ├── TypeScript 5.2.2"
echo "│   ├── Vite 5.0.0"
echo "│   ├── Tailwind CSS 3.3.5"
echo "│   ├── React Router DOM 6.30.1"
echo "│   ├── Firebase 11.8.1"
echo "│   ├── Chart.js 4.5.0"
echo "│   ├── Zustand 5.0.5"
echo "│   └── 20+ other dependencies"
echo ""
echo "├── Backend (Node.js/Express): ✅"
echo "│   ├── Express 4.21.2"
echo "│   ├── MongoDB (Mongoose) 7.8.7"
echo "│   ├── Firebase Admin 11.5.0"
echo "│   ├── Passport.js 0.6.0"
echo "│   ├── JWT 9.0.2"
echo "│   ├── Winston 3.11.0"
echo "│   └── 20+ other dependencies"
echo ""
echo "🚀 Next Steps:"
echo "1. Configure environment variables:"
echo "   - Copy .env.example to .env in backend/"
echo "   - Set up Firebase configuration"
echo "   - Configure MongoDB connection"
echo ""
echo "2. Start development servers:"
echo "   Frontend: cd tracker && npm run dev"
echo "   Backend:  cd backend && npm run dev"
echo ""
echo "3. Build for production:"
echo "   Frontend: cd tracker && npm run build"
echo "   Backend:  cd backend && npm start"
echo ""
echo "📝 Note: Make sure to set up your environment variables before running the servers!" 