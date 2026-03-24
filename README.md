# 🛡️ Advanced MERN Authentication System

A complete full-stack Authentication and User Management system built with the MERN stack (MongoDB, Express, React, Node.js). Features include secure JWT authentication, email verification via Nodemailer, password recovery flows, and a premium "Glassmorphism" UI design built with Framer Motion.

## ✨ Features
- **Secure Authentication**: Session management stored securely in HTTP-only cookies to prevent XSS & CSRF attacks.
- **Email Verification**: NodeMailer-powered 6-digit OTP verification required upon registration.
- **Password Recovery**: Secure cryptographic token generation and email routing for forgotten passwords.
- **Protected Routes**: Extensive React Router integration to redirect unauthenticated or unverified users away from protected dashboard views.
- **Premium UI**: Modern dark-mode aesthetics using pure Vanilla CSS, dynamic floating background shapes, smooth transitions via Framer Motion, and lucid iconography.
- **Global State**: Minimalist React state management using `Zustand`.

---

## 🏗️ System Architecture & Data Flow

### 1. User Registration & Email Verification Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend (React)
    participant Backend (Express)
    participant Database (MongoDB)
    participant EmailService (Nodemailer)

    User->>Frontend (React): Fills out Signup Form (Name, Email, Password)
    Frontend (React)->>Backend (Express): POST /api/auth/signup
    Backend (Express)->>Database (MongoDB): Check if user exists
    Database (MongoDB)-->>Backend (Express): (Returns null)
    Backend (Express)->>Backend (Express): Hash Password & Generate 6-Digit OTP
    Backend (Express)->>Database (MongoDB): Save User (isVerified: false)
    Backend (Express)->>EmailService (Nodemailer): Send Verification OTP Email
    Backend (Express)-->>Frontend (React): Return Success & JWT Cookie
    Frontend (React)-->>User: Redirect to /verify-email

    User->>Frontend (React): Enters 6-Digit OTP from Email
    Frontend (React)->>Backend (Express): POST /api/auth/verify-email
    Backend (Express)->>Database (MongoDB): Validate OTP & Update (isVerified: true)
    Backend (Express)-->>Frontend (React): Return Verified User
    Frontend (React)-->>User: Redirect to Protected Dashboard
```

### 2. Password Recovery Flow
```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MailService

    User->>Frontend: Clicks "Forgot Password"
    Frontend->>Backend: POST /api/auth/forgot-password (Email)
    Backend->>Backend: Generate Secure Reset Token (1 hour expiry)
    Backend->>MailService: Send Reset Link (with Token)
    MailService-->>User: Delivers Email Link
    User->>Frontend: Clicks Link -> Routes to /reset-password/:token
    User->>Frontend: Submits New Password
    Frontend->>Backend: POST /api/auth/reset-password/:token
    Backend->>Backend: Validate Token & Hash New Password
    Backend->>Backend: Update User Record
    Backend-->>Frontend: Return Success
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas connection URI
- Gmail account with an App Password (for Nodemailer)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/SubhayuBaliyarsingh/Secure-User-Authentication-.git
cd Secure-User-Authentication-
\`\`\`

### 2. Configure Environment Variables
Inside the `backend/` directory, create a `.env` file containing:
\`\`\`env
# backend/.env
PORT=5001
MONGODB_URI=your_mongodb_cluster_uri
JWT_SECRET=any_highly_secure_random_string
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password
\`\`\`

### 3. Install Dependencies
Open two distinct terminal instances:

**Terminal 1 (Backend):**
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

**Terminal 2 (Frontend):**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### 4. Access the Application
Visit \`http://localhost:5173\` in your browser to interact with the application.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Zustand, React Router DOM, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js, JWT, BcryptJS, Nodemailer
- **Database**: MongoDB, Mongoose
