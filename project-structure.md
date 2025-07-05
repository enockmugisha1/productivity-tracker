# Productivity Tracker - Project Structure

```
productivity-tracker/
├── .git/                           # Git version control
├── .github/                        # GitHub workflows and configurations
├── README.md                       # Main project documentation
├──
├── 📁 backend/                     # Backend Node.js/Express server
│   ├── 📁 config/                  # Configuration files
│   │   ├── config.env              # Environment variables
│   │   ├── passport.js             # Passport authentication config
│   │   ├── serviceAccount.json     # Firebase service account
│   │   └── firebase-config.js      # Firebase configuration
│   │
│   ├── 📁 controllers/             # Request handlers
│   │   └── authController.js       # Authentication controller
│   │
│   ├── 📁 logs/                    # Application logs
│   │   ├── combined.log            # Combined application logs
│   │   ├── error.log               # Error logs
│   │   ├── exceptions.log          # Exception logs
│   │   └── rejections.log          # Promise rejection logs
│   │
│   ├── 📁 middleware/              # Express middleware
│   │   ├── auth.js                 # Authentication middleware
│   │   ├── error.js                # Error handling middleware
│   │   ├── security.js             # Security middleware
│   │   ├── upload.js               # File upload middleware
│   │   ├── validate.js             # Validation middleware
│   │   └── validation.js           # Additional validation
│   │
│   ├── 📁 models/                  # Database models (MongoDB/Mongoose)
│   │   ├── Goal.js                 # Goal model
│   │   ├── Habit.js                # Habit model
│   │   ├── Note.js                 # Note model
│   │   ├── Task.js                 # Task model
│   │   └── User.js                 # User model
│   │
│   ├── 📁 node_modules/            # Node.js dependencies
│   │
│   ├── 📁 routes/                  # API route definitions
│   │   ├── ai.js                   # AI assistant routes
│   │   ├── auth.js                 # Authentication routes
│   │   ├── goals.js                # Goals management routes
│   │   ├── habits.js               # Habits management routes
│   │   ├── notes.js                # Notes management routes
│   │   ├── stats.js                # Statistics routes
│   │   └── tasks.js                # Tasks management routes
│   │
│   ├── 📁 src/                     # Source code organization
│   │   ├── 📁 config/              # Additional configurations
│   │   ├── 📁 middleware/          # Additional middleware
│   │   ├── 📁 models/              # Additional models
│   │   └── 📁 routes/              # Additional routes
│   │
│   ├── 📁 uploads/                 # File uploads directory
│   │   ├── photo-*.webp            # Uploaded profile photos
│   │   └── photo-*.jpeg            # Uploaded profile photos
│   │
│   ├── 📁 utils/                   # Utility functions
│   │   ├── logger.js               # Logging utility
│   │   └── reminderJob.js          # Reminder scheduling utility
│   │
│   ├── .gitignore                  # Git ignore rules for backend
│   ├── package-lock.json           # Dependency lock file
│   ├── package.json                # Backend dependencies and scripts
│   └── server.js                   # Main server entry point
│
├── 📁 src/                         # Legacy source directory (may be unused)
│   ├── 📁 components/              # Legacy components
│   ├── 📁 context/                 # Legacy context
│   ├── 📁 pages/                   # Legacy pages
│   └── 📁 services/                # Legacy services
│
└── 📁 tracker/                     # Frontend React/TypeScript application
    ├── 📁 dist/                    # Build output directory
    │
    ├── 📁 node_modules/            # Frontend dependencies
    │
    ├── 📁 public/                  # Static assets
    │   ├── manifest.json           # PWA manifest
    │   ├── service-worker.js       # Service worker for PWA
    │   └── vite.svg                # Vite logo
    │
    ├── 📁 src/                     # Frontend source code
    │   ├── 📁 assets/              # Static assets
    │   │   └── react.svg           # React logo
    │   │
    │   ├── 📁 components/          # Reusable UI components
    │   │   ├── AddTransaction.tsx  # Transaction form component
    │   │   ├── CurrencySelector.tsx # Currency selection component
    │   │   ├── Layout.tsx          # Main layout wrapper
    │   │   ├── Login.tsx           # Login form component
    │   │   ├── Navbar.jsx          # Navigation bar component
    │   │   ├── OptimizedImage.tsx  # Image optimization component
    │   │   ├── ProtectedRoute.tsx  # Route protection component
    │   │   └── TransactionCharts.tsx # Chart components
    │   │
    │   ├── 📁 config/              # Configuration files
    │   │   ├── currencies.ts       # Currency definitions
    │   │   └── firebase.ts         # Firebase configuration
    │   │
    │   ├── 📁 context/             # React Context providers
    │   │   ├── AuthContext.tsx     # Authentication context
    │   │   ├── CurrencyContext.tsx # Currency context
    │   │   └── ThemeContext.tsx    # Theme/dark mode context
    │   │
    │   ├── 📁 hooks/               # Custom React hooks
    │   │                           # (Currently empty)
    │   │
    │   ├── 📁 pages/               # Page components
    │   │   ├── AiAssistant.tsx     # AI assistant page
    │   │   ├── Dashboard.tsx       # Main dashboard page
    │   │   ├── Expenses.tsx        # Expenses tracking page
    │   │   ├── Goals.tsx           # Goals management page
    │   │   ├── Habits.tsx          # Habits tracking page
    │   │   ├── Login.tsx           # Login page
    │   │   ├── Notes.tsx           # Notes management page
    │   │   ├── Profile.tsx         # User profile page
    │   │   ├── Register.tsx        # Registration page
    │   │   └── Settings.tsx        # Settings page
    │   │
    │   ├── 📁 services/            # API service functions
    │   │   ├── aiService.ts        # AI assistant API calls
    │   │   ├── goalService.ts      # Goals API calls
    │   │   ├── taskService.ts      # Tasks API calls
    │   │   └── transactionService.ts # Transactions API calls
    │   │
    │   ├── 📁 store/               # State management
    │   │   ├── authStore.ts        # Authentication state
    │   │   └── dataStore.ts        # Application data state
    │   │
    │   ├── App.css                 # Global CSS styles
    │   ├── App.tsx                 # Main App component
    │   ├── index.css               # Global styles
    │   ├── main.tsx                # Application entry point
    │   └── vite-env.d.ts           # Vite type definitions
    │
    ├── .gitignore                  # Git ignore rules for frontend
    ├── eslint.config.js            # ESLint configuration
    ├── index.html                  # HTML template
    ├── package-lock.json           # Dependency lock file
    ├── package.json                # Frontend dependencies and scripts
    ├── postcss.config.cjs          # PostCSS configuration
    ├── README.md                   # Frontend documentation
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── tsconfig.app.json           # TypeScript app configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── tsconfig.node.json          # TypeScript node configuration
    └── vite.config.ts              # Vite build configuration
```

## Project Overview

This is a **full-stack productivity tracker application** with the following architecture:

### 🏗️ **Architecture**
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Authentication**: Firebase Authentication
- **Deployment**: Vercel (Frontend) + Render (Backend)

### 📱 **Features**
- **Dashboard**: Overview and quick actions
- **Notes**: Note-taking with search and organization
- **Tasks**: Task management with priorities and deadlines
- **Goals**: Goal setting and progress tracking
- **Habits**: Habit tracking and streak monitoring
- **Expenses**: Financial tracking with charts
- **AI Assistant**: AI-powered productivity help
- **Profile & Settings**: User management and preferences

### 🔧 **Key Technologies**
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, MongoDB, Mongoose, JWT
- **Authentication**: Firebase Auth
- **State Management**: React Context + Zustand
- **Styling**: Tailwind CSS with dark mode support
- **Build Tools**: Vite, PostCSS, ESLint

### 📁 **Directory Structure Highlights**
- **`/tracker`**: Main frontend application
- **`/backend`**: Express.js API server
- **`/src`**: Legacy source (may be unused)
- **`.github`**: GitHub workflows and configurations

The project follows a clean separation of concerns with dedicated directories for components, pages, services, and configuration files. 