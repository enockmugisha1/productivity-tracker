# Productivity Tracker

A modern, full-stack productivity application that helps users manage their tasks, goals, habits, expenses, and notes, powered by an AI assistant for enhanced productivity. Built with React/TypeScript frontend and Node.js/Express backend.

## 🌟 Features

### 📋 Task Management
- Create, organize, and track daily tasks with descriptions
- Mark tasks as complete/incomplete with real-time updates
- Priority-based task organization
- Due date tracking and reminders
- Clean, intuitive task interface with loading states

### 🎯 Goal Setting & Tracking
- Set short-term and long-term goals with descriptions
- Track progress with status updates (In Progress, Completed, On Hold)
- Goal categorization and priority levels
- Visual progress indicators
- Goal completion history

### 🔄 Habit Tracking
- Build and maintain positive habits with daily tracking
- **Streak tracking** with motivational emojis (🔥 for 7+ days, ⚡ for 3+ days, ✨ for 1+ days)
- Frequency options: Daily, Weekly, Monthly
- Habit descriptions and importance notes
- Last completion date tracking
- One-click habit completion with visual feedback

### 💰 Expense Tracking
- Comprehensive financial management
- Income and expense categorization
- Multi-currency support with currency selector
- Date range filtering and category filtering
- Transaction charts and analytics
- CSV export functionality
- Balance, income, and expense summaries

### 📝 Notes Management
- Rich text note creation and editing
- Note categorization and organization
- Search and filter capabilities
- Auto-save functionality
- Markdown support

### 🤖 AI Assistant
- Intelligent productivity assistance
- Task management suggestions
- Goal planning help
- Habit formation advice
- Context-aware recommendations

### 🎨 User Experience
- **Enhanced Form UX**: Improved focus behavior across all forms
- **Loading States**: Professional loading indicators and error handling
- **Toast Notifications**: Real-time feedback for all actions
- **Responsive Design**: Perfect experience on desktop and mobile
- **Dark Mode**: Seamless dark/light mode support
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router** for navigation
- **React Icons** for beautiful iconography
- **React Hot Toast** for notifications
- **Headless UI** for accessible components
- **Chart.js** with React Chart.js 2 for data visualization
- **Zustand** for state management
- **Axios** for API communication
- **React Hook Form** for form handling
- **Date-fns** for date manipulation

### Backend
- **Node.js/Express** for API server
- **MongoDB** with Mongoose for data storage
- **JWT** for secure authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Morgan** for request logging
- **Winston** for application logging
- **Multer** for file uploads
- **Nodemailer** for email functionality
- **Ollama** for AI integration

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/enockmugisha1/productivity-tracker.git
cd productivity-tracker
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_ai_api_key
NODE_ENV=development
PORT=5000
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd ../tracker

# Install dependencies
npm install
```

### 4. Start Development Servers
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from tracker directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📱 Usage Guide

### Getting Started
1. **Register/Login**: Create an account or sign in
2. **Dashboard**: View your productivity overview and statistics
3. **Tasks**: Create and manage your daily tasks
4. **Goals**: Set and track your short-term and long-term goals
5. **Habits**: Build positive habits with streak tracking
6. **Expenses**: Track your income and expenses with analytics
7. **Notes**: Keep your thoughts and ideas organized
8. **AI Assistant**: Get intelligent productivity assistance

### Key Features in Action

#### Habit Tracking
- Create habits with descriptions and frequency
- Mark habits complete daily to build streaks
- View streak emojis for motivation
- Track last completion dates

#### Expense Management
- Add income and expense transactions
- Categorize transactions for better organization
- View charts and analytics
- Export data to CSV
- Filter by date range and category

#### Task Management
- Create tasks with descriptions
- Mark tasks complete with one click
- View task history and statistics
- Organize by priority and due dates

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Input Validation**: Express Validator for API input sanitization
- **Security Headers**: Helmet for protection against common vulnerabilities
- **Rate Limiting**: Express Rate Limit for API protection
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Variables**: Secure configuration management

## 🎨 UI/UX Enhancements

### Form Improvements
- **Consistent Focus Behavior**: No more focus jumping between fields
- **Real-time Validation**: Immediate feedback on form inputs
- **Loading States**: Professional loading indicators during operations
- **Error Handling**: Clear error messages and recovery options
- **Success Feedback**: Toast notifications for successful actions

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators and management
- **Color Contrast**: WCAG compliant color schemes
- **Semantic HTML**: Proper HTML structure for accessibility

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect experience on tablets
- **Desktop Optimization**: Enhanced features for larger screens
- **Touch-Friendly**: Optimized touch targets and interactions

## 📊 Data Models

### User
- Authentication details
- Profile information
- Preferences and settings

### Task
- Title, description, status
- Due dates and priorities
- Completion tracking

### Goal
- Title, description, status
- Progress tracking
- Target dates

### Habit
- Name, description, frequency
- Streak counting
- Last completion tracking

### Transaction (Expenses)
- Amount, type (income/expense)
- Category and description
- Date and user association

### Note
- Title, content, category
- Creation and update timestamps
- User association

## 🚀 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Preview build
npm run preview
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
AI_API_KEY=your_production_ai_api_key
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📈 Recent Improvements

### Form UX Enhancements
- Fixed focus behavior across all forms
- Removed aggressive autofocus and focus-jumping logic
- Consistent, user-friendly focus behavior
- Improved form validation and error handling

### Habit Tracking Features
- Added streak tracking with motivational emojis
- Enhanced habit completion tracking
- Improved habit frequency options
- Better visual feedback for habit completion

### Data Model Alignment
- Fixed frontend-backend data model mismatches
- Standardized field names (`_id` vs `id`, `completed` vs `status`)
- Improved API consistency across all endpoints
- Enhanced error handling and validation

### UI/UX Improvements
- Professional loading states
- Better error handling with user-friendly messages
- Enhanced accessibility features
- Improved responsive design
- Better visual hierarchy and spacing

## 🙏 Acknowledgments

- **React Community** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **MongoDB** for the flexible database
- **Express.js** for the robust backend framework

## 📧 Contact & Support

**Enock Mugisha** - e.mugisha4@alustudent.com

**Project Link**: https://github.com/enockmugisha1/productivity-tracker

**Issues**: Please report bugs and feature requests through GitHub Issues

---

⭐ **Star this repository if you find it helpful!**
