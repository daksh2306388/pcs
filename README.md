# 🎓 Academia Nexa — College Placement Management System

A full-stack web application that streamlines the college placement process by providing role-based dashboards for **Students**, **TPO (Training & Placement Officers)**, **Management Admins**, and a **Super Admin**. Built with the **MERN stack** (MongoDB, Express, React, Node.js).

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [API Routes](#-api-routes)
- [User Roles & Permissions](#-user-roles--permissions)
- [Database Models](#-database-models)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👨‍🎓 Student Portal
- **Sign Up / Login** — Secure authentication with JWT
- **Profile Completion** — Academic details, SGPA, past qualifications (SSC / HSC / Diploma)
- **Placement Profile** — Upload resume, manage placement-ready profile
- **Job Listings** — Browse & apply to placement drives
- **Application Tracking** — Track status (Applied → Interview → Hired / Rejected)
- **Internship Management** — Add, edit, and delete internship records
- **Notices** — View notices sent by TPO or Management

### 👨‍💼 TPO Admin Panel
- **Student Management** — View students filtered by year & branch
- **Student Approval** — Approve newly registered student accounts
- **Job Postings** — Create, edit, and manage placement job listings
- **Company Management** — Add and manage recruiting companies
- **Notices** — Send and view notices
- **Dashboard** — Overview of placement statistics

### 🏛️ Management Admin Panel
- **TPO Management** — Create and manage TPO admin accounts
- **Student Oversight** — View all students, approve registrations
- **Company & Job Management** — Full CRUD for companies and job posts
- **Notices** — Send and view notices across roles
- **Dashboard** — High-level placement analytics

### 🔐 Super Admin
- **User Management** — Create and manage Management Admins, TPOs, and Students
- **Student Approval** — Approve student accounts
- **Full System Access** — Companies, job listings, and all administrative features

### 🌐 General
- Role-based access control with protected routes
- Responsive UI with sidebar navigation
- Profile image upload via Cloudinary
- Email notifications via Nodemailer (SMTP)
- Lazy-loaded components for optimized performance
- Swagger API documentation

---

## 🛠️ Tech Stack

| Layer       | Technology                                                        |
|-------------|-------------------------------------------------------------------|
| **Frontend** | React 18, React Router v6, Vite, TailwindCSS, Bootstrap 5        |
| **Backend**  | Node.js, Express.js                                               |
| **Database** | MongoDB Atlas (Mongoose ODM)                                      |
| **Auth**     | JSON Web Tokens (JWT), bcrypt                                     |
| **Storage**  | Cloudinary (profile images), Multer (file uploads)                |
| **Email**    | Nodemailer (SMTP)                                                 |
| **Docs**     | Swagger (swagger-jsdoc + swagger-ui-express)                      |
| **Deployment** | Vercel (frontend & backend)                                     |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     React Frontend                      │
│          (Vite + React Router + TailwindCSS)             │
│                                                         │
│  Landing ─── Student ─── TPO ─── Management ─── Admin   │
│   Page       Portal     Panel      Panel       Panel    │
└────────────────────────┬────────────────────────────────┘
                         │  HTTP / REST API
┌────────────────────────▼────────────────────────────────┐
│                   Express.js Backend                    │
│                                                         │
│  Routes ──► Controllers ──► Models ──► MongoDB Atlas     │
│                                                         │
│  Middleware: JWT Auth │ Multer │ CORS │ Error Handler     │
│  Services:  Cloudinary │ Nodemailer                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Cloudinary** account (for image uploads)
- **Gmail App Password** (for SMTP email notifications)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/college-placement-management-system.git
cd college-placement-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=4518

# MongoDB
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (SMTP via Gmail)
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"
```

> ⚠️ **Never commit your `.env` file.** It is already included in `.gitignore`.

### Running the Application

**Start the backend** (runs on `http://localhost:4518`):

```bash
cd backend
npm start
```

**Start the frontend** (runs on `http://localhost:5173`):

```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📁 Project Structure

```
college-placement-management-system/
│
├── backend/
│   ├── config/
│   │   ├── Cloudinary.js          # Cloudinary configuration
│   │   ├── MongoDB.js             # MongoDB connection
│   │   ├── Multer.js              # File upload middleware
│   │   └── Nodemailer.js          # Email transporter setup
│   │
│   ├── controllers/
│   │   ├── Company/               # Company CRUD operations
│   │   ├── Management/            # Management admin controllers
│   │   ├── Student/               # Student auth, resume, jobs, internships
│   │   ├── SuperUser/             # Super admin controllers
│   │   ├── TPO/                   # TPO admin controllers
│   │   └── user/                  # Common user operations (profile, password)
│   │
│   ├── middleware/
│   │   └── auth.middleware.js     # JWT authentication middleware
│   │
│   ├── models/
│   │   ├── company.model.js       # Company schema
│   │   ├── job.model.js           # Job posting schema
│   │   ├── notice.model.js        # Notice/announcement schema
│   │   └── user.model.js          # User schema (all roles)
│   │
│   ├── routes/
│   │   ├── company.route.js       # /company routes
│   │   ├── management.route.js    # /management routes
│   │   ├── student.route.js       # /student routes
│   │   ├── superuser.route.js     # /admin routes
│   │   ├── tpo.route.js           # /tpo routes
│   │   └── user.route.js          # /user routes
│   │
│   ├── utils/
│   │   ├── emailTemplates.js      # Email HTML templates
│   │   └── generatePassword.js    # Random password generator
│   │
│   ├── index.js                   # Express app entry point
│   ├── vercel.json                # Vercel deployment config
│   └── package.json
│
├── frontend/
│   ├── public/                    # Static assets (favicon, images)
│   ├── src/
│   │   ├── assets/                # Images and media
│   │   ├── components/
│   │   │   ├── LandingPages/      # Landing page sections
│   │   │   ├── Management/        # Management-specific components
│   │   │   ├── Students/          # Student-specific components
│   │   │   ├── SuperUser/         # Super admin components
│   │   │   ├── TPO/               # TPO-specific components
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── Sidebar.jsx        # Side navigation menu
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   ├── Account.jsx        # Account settings page
│   │   │   ├── AllJobPost.jsx     # Job listings grid
│   │   │   ├── AllCompany.jsx     # Company listings
│   │   │   ├── ViewJobPost.jsx    # Job detail view
│   │   │   ├── ViewUserData.jsx   # User profile viewer
│   │   │   ├── UserDetails.jsx    # Profile completion form
│   │   │   ├── SendNotice.jsx     # Notice composer
│   │   │   └── protectedRoute.jsx # Role-based route guard
│   │   │
│   │   ├── config/                # Frontend configuration
│   │   ├── context/               # React context (UserProvider)
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── pages/
│   │   │   ├── students/          # Student login, signup, home
│   │   │   ├── TPO/               # TPO login, home
│   │   │   ├── Management/        # Management login, home
│   │   │   ├── LandingPage.jsx    # Public landing page
│   │   │   ├── ViewAllNotice.jsx  # Notice board
│   │   │   └── PageNotFound.jsx   # 404 page
│   │   │
│   │   ├── style/                 # CSS stylesheets
│   │   ├── utility/               # Helper functions
│   │   ├── App.jsx                # Root component with routing
│   │   └── main.jsx               # React DOM entry point
│   │
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # TailwindCSS configuration
│   ├── vercel.json                # Vercel deployment config
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Routes

### User Routes — `/user`
| Method | Endpoint              | Auth | Description                |
|--------|-----------------------|------|----------------------------|
| GET    | `/detail`             | ✅   | Get authenticated user info |
| GET    | `/all-users`          | ✅   | Get total user counts       |
| GET    | `/:userId`            | ✅   | Get specific user data      |
| POST   | `/upload-photo`       | ❌   | Upload profile photo        |
| POST   | `/update-profile`     | ✅   | Update user profile         |
| POST   | `/change-password`    | ✅   | Change password             |

### Student Routes — `/student`
| Method | Endpoint                                  | Auth | Description                   |
|--------|-------------------------------------------|------|-------------------------------|
| POST   | `/signup`                                 | ❌   | Student registration          |
| POST   | `/login`                                  | ❌   | Student login                 |
| POST   | `/upload-resume`                          | ❌   | Upload resume (Multer)        |
| POST   | `/upload-offer-letter`                    | ❌   | Upload offer letter           |
| POST   | `/delete-offer-letter/:jobId/:studentId`  | ✅   | Delete offer letter           |
| PUT    | `/job/:jobId/:studentId`                  | ❌   | Apply to a job                |
| GET    | `/check-applied/:jobId/:studentId`        | ❌   | Check if already applied      |
| POST   | `/update-status/:jobId/:studentId`        | ❌   | Update job application status |
| GET    | `/internship`                             | ✅   | Get student internships       |
| POST   | `/update-internship`                      | ✅   | Add/update internship         |
| POST   | `/delete-internship`                      | ✅   | Delete internship             |
| GET    | `/all-students-data-year-and-branch`      | ✅   | Students by year & branch     |
| GET    | `/notify-interview-hired`                 | ✅   | Students in interview/hired   |

### TPO Routes — `/tpo`
### Management Routes — `/management`
### Super Admin Routes — `/admin`
### Company Routes — `/company`

> 📘 Full API documentation is available via **Swagger UI** when the backend is running.

---

## 👥 User Roles & Permissions

| Feature                    | Student | TPO Admin | Management Admin | Super Admin |
|----------------------------|:-------:|:---------:|:----------------:|:-----------:|
| View Job Listings          |   ✅    |    ✅     |       ✅         |     ✅      |
| Apply to Jobs              |   ✅    |    ❌     |       ❌         |     ❌      |
| Post / Edit Jobs           |   ❌    |    ✅     |       ✅         |     ✅      |
| Manage Companies           |   ❌    |    ✅     |       ✅         |     ✅      |
| View Student Data          |   ❌    |    ✅     |       ✅         |     ✅      |
| Approve Students           |   ❌    |    ✅     |       ✅         |     ✅      |
| Create TPO Accounts        |   ❌    |    ❌     |       ✅         |     ✅      |
| Create Management Accounts |   ❌    |    ❌     |       ❌         |     ✅      |
| Send Notices               |   ❌    |    ✅     |       ✅         |     ❌      |
| Manage Internships         |   ✅    |    ❌     |       ❌         |     ❌      |

---

## 🗄️ Database Models

### User
A unified schema supporting all roles (`student`, `tpo_admin`, `management_admin`, `superuser`) with role-specific nested profiles:
- **Student Profile** — Roll number, UIN, department, year, SGPA (Sem 1–8), past qualifications, resume, applied jobs, internships
- **TPO Profile** — Position
- **Management Profile** — Position

### Company
- Company name, description, website, location, difficulty level (Easy / Moderate / Hard)
- Cascade delete: removing a company deletes all associated job postings

### Job
- Job title, description, eligibility, salary, application deadline
- Linked to a Company (ObjectId reference)
- Applicants array with status tracking per student (Applied → Interview → Hired / Rejected)
- Selection rounds: Aptitude Test, Technical Interview, HR Interview, Group Discussion

### Notice
- Sender (User reference), sender role, receiver role
- Title, message, timestamp

---

## 🌍 Deployment

Both frontend and backend are configured for **Vercel** deployment:

- **Backend**: `backend/vercel.json` configures the Express app as a serverless function
- **Frontend**: `frontend/vercel.json` handles SPA routing rewrites

### Deploy to Vercel

```bash
# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd frontend
vercel --prod
```

> Make sure to set your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Made with ❤️ for simplifying college placements
</p>
