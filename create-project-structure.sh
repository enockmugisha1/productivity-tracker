#!/bin/bash

# Productivity Tracker Project Structure Creator
# This script creates the complete folder and file structure of the productivity tracker project

# Set the target directory (change this to your desired location)
TARGET_DIR="./productivity-tracker-copy"

echo "🚀 Creating Productivity Tracker Project Structure..."
echo "Target directory: $TARGET_DIR"
echo ""

# Create main project directory
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

# Create root level files and directories
mkdir -p .git
mkdir -p .github
touch README.md

# Create backend structure
echo "📁 Creating backend structure..."
mkdir -p backend/config
mkdir -p backend/controllers
mkdir -p backend/logs
mkdir -p backend/middleware
mkdir -p backend/models
mkdir -p backend/node_modules
mkdir -p backend/routes
mkdir -p backend/src/config
mkdir -p backend/src/middleware
mkdir -p backend/src/models
mkdir -p backend/src/routes
mkdir -p backend/uploads
mkdir -p backend/utils

# Backend files
touch backend/.gitignore
touch backend/package-lock.json
touch backend/package.json
touch backend/server.js

# Backend config files
touch backend/config/config.env
touch backend/config/passport.js
touch backend/config/serviceAccount.json
touch backend/config/firebase-config.js

# Backend controllers
touch backend/controllers/authController.js

# Backend logs
touch backend/logs/combined.log
touch backend/logs/error.log
touch backend/logs/exceptions.log
touch backend/logs/rejections.log

# Backend middleware
touch backend/middleware/auth.js
touch backend/middleware/error.js
touch backend/middleware/security.js
touch backend/middleware/upload.js
touch backend/middleware/validate.js
touch backend/middleware/validation.js

# Backend models
touch backend/models/Goal.js
touch backend/models/Habit.js
touch backend/models/Note.js
touch backend/models/Task.js
touch backend/models/User.js

# Backend routes
touch backend/routes/ai.js
touch backend/routes/auth.js
touch backend/routes/goals.js
touch backend/routes/habits.js
touch backend/routes/notes.js
touch backend/routes/stats.js
touch backend/routes/tasks.js

# Backend utils
touch backend/utils/logger.js
touch backend/utils/reminderJob.js

# Create legacy src structure
echo "📁 Creating legacy src structure..."
mkdir -p src/components
mkdir -p src/context
mkdir -p src/pages
mkdir -p src/services

# Create frontend tracker structure
echo "📁 Creating frontend tracker structure..."
mkdir -p tracker/dist
mkdir -p tracker/node_modules
mkdir -p tracker/public
mkdir -p tracker/src/assets
mkdir -p tracker/src/components
mkdir -p tracker/src/config
mkdir -p tracker/src/context
mkdir -p tracker/src/hooks
mkdir -p tracker/src/pages
mkdir -p tracker/src/services
mkdir -p tracker/src/store

# Tracker root files
touch tracker/.gitignore
touch tracker/eslint.config.js
touch tracker/index.html
touch tracker/package-lock.json
touch tracker/package.json
touch tracker/postcss.config.cjs
touch tracker/README.md
touch tracker/tailwind.config.js
touch tracker/tsconfig.app.json
touch tracker/tsconfig.json
touch tracker/tsconfig.node.json
touch tracker/vite.config.ts

# Tracker public files
touch tracker/public/manifest.json
touch tracker/public/service-worker.js
touch tracker/public/vite.svg

# Tracker src files
touch tracker/src/App.css
touch tracker/src/App.tsx
touch tracker/src/index.css
touch tracker/src/main.tsx
touch tracker/src/vite-env.d.ts

# Tracker src assets
touch tracker/src/assets/react.svg

# Tracker src components
touch tracker/src/components/AddTransaction.tsx
touch tracker/src/components/CurrencySelector.tsx
touch tracker/src/components/Layout.tsx
touch tracker/src/components/Login.tsx
touch tracker/src/components/Navbar.jsx
touch tracker/src/components/OptimizedImage.tsx
touch tracker/src/components/ProtectedRoute.tsx
touch tracker/src/components/TransactionCharts.tsx

# Tracker src config
touch tracker/src/config/currencies.ts
touch tracker/src/config/firebase.ts

# Tracker src context
touch tracker/src/context/AuthContext.tsx
touch tracker/src/context/CurrencyContext.tsx
touch tracker/src/context/ThemeContext.tsx

# Tracker src pages
touch tracker/src/pages/AiAssistant.tsx
touch tracker/src/pages/Dashboard.tsx
touch tracker/src/pages/Expenses.tsx
touch tracker/src/pages/Goals.tsx
touch tracker/src/pages/Habits.tsx
touch tracker/src/pages/Login.tsx
touch tracker/src/pages/Notes.tsx
touch tracker/src/pages/Profile.tsx
touch tracker/src/pages/Register.tsx
touch tracker/src/pages/Settings.tsx

# Tracker src services
touch tracker/src/services/aiService.ts
touch tracker/src/services/goalService.ts
touch tracker/src/services/taskService.ts
touch tracker/src/services/transactionService.ts

# Tracker src store
touch tracker/src/store/authStore.ts
touch tracker/src/store/dataStore.ts

# Create sample upload files (optional)
echo "📁 Creating sample upload files..."
touch backend/uploads/photo-sample.webp
touch backend/uploads/photo-sample.jpeg

echo ""
echo "✅ Project structure created successfully!"
echo "📂 Total directories created: $(find . -type d | wc -l)"
echo "📄 Total files created: $(find . -type f | wc -l)"
echo ""
echo "📋 Project structure summary:"
echo "├── backend/ (Express.js API server)"
echo "├── src/ (Legacy source - may be unused)"
echo "└── tracker/ (Frontend React/TypeScript app)"
echo ""
echo "🎯 Next steps:"
echo "1. Copy your actual code files to replace the empty files"
echo "2. Install dependencies: cd tracker && npm install"
echo "3. Install backend dependencies: cd backend && npm install"
echo "4. Configure environment variables"
echo ""
echo "📝 Note: This script creates the structure only. You'll need to copy your actual code content separately." 