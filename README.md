1️⃣ FRONTEND – README.md

📁 Path: bookit/bookit-frontend/README.md

#  BookIt Frontend

Welcome to the **frontend** of BookIt — an interactive and elegant platform for discovering and booking unique experiences.  
This project is built with **React + TypeScript + Tailwind CSS**, focusing on performance, clean UI, and smooth user interaction.

---

##  Tech Stack

| Category           | Technology Used |
|--------------------|-----------------|
| Frontend Framework | React (Vite + TypeScript) |
| Styling            | Tailwind CSS |
| API Handling       | Axios |
| Animations         | Lottie Animations |
| Routing            | React Router v6 |
| State Management   | React Hooks (useState, useEffect) |

---

##  Folder Structure

frontend/
├─ src/
│ ├─ components/          # Reusable UI components (Navbar, Footer, etc.)
│ ├─ pages/               # Page-level components (Home, About, BookingPage, etc.)
│ ├─ routes/              # React Router configuration
│ ├─ services/            # API service files
│ ├─ App.tsx              # Main App component
│ ├─ main.tsx             # Entry point
│ ├─ App.css / index.css  # Styling files
├─ public/
│ ├─ assets/              # Static images
│ └─ lotties/             # Animation files
├─ tailwind.config.js
├─ package.json
├─ tsconfig.json
└─ index.html

---

##  How to Run Locally

### 1. Navigate to frontend folder:
```bash
cd bookit-frontend

2. Install dependencies:
npm install

3. Run development server:
npm run dev


Then visit --- http://localhost:5173

*** Screenshots
1. Home Page : https://github.com/ApekshaPatil24/bookit-frontend/issues/1#issue-3575483103

2. Experience Details:https://github.com/ApekshaPatil24/bookit-frontend/issues/2#issue-3575489730

3. Booking Page :https://github.com/ApekshaPatil24/bookit-frontend/issues/3#issue-3575497076

*** Features

✅ Modern UI with Tailwind CSS
✅ Responsive design for all devices
✅ Integrated API calls for fetching experiences and bookings
✅ Lottie animations for an engaging user experience
✅ Route protection for invalid pages (404 Not Found animation added)

*** Developer Notes

Built using Vite + React + TS for lightning-fast development

Components are fully modular and reusable

Smooth transitions & animations for professional look

*** Contributing

If you'd like to contribute:

Fork this repo

Create a new branch

Commit and push your changes

Submit a pull request 🚀



##  ** 2️. BACKEND – README.md**
📁 Path: `bookit/backend/README.md`

```markdown
#  BookIt Backend

This is the **backend** for the BookIt platform — a system for managing experiences, bookings, promo codes, and user data.  
Built with **Express.js, TypeScript, and Prisma ORM** for scalability and performance.

---

##  Tech Stack

| Category       | Technology Used |
|----------------|-----------------|
| Framework      | Express.js |
| ORM            | Prisma |
| Database       | PostgreSQL / MySQL (your choice) |
| Language       | TypeScript |
| Environment    | Node.js |
| API Style      | RESTful |

---

## 📂 Folder Structure



backend/
├─ src/
│ ├─ controllers/       # Handles request logic (Booking, Experience)
│ ├─ routes/            # Defines API endpoints
│ ├─ services/          # Reusable service logic
│ ├─ utils/             # Helper functions (Prisma client, etc.)
│ ├─ app.ts             # App configuration
│ └─ index.ts           # Entry point
├─ prisma/
│ ├─ schema.prisma      # Prisma schema definition
│ ├─ migrations/        # Migration files
│ └─ seed.ts            # Seed data script
├─ .env                 # Environment variables
├─ package.json
├─ tsconfig.json
└─ node_modules/


---

##  Setup Instructions

### 1. Navigate to backend folder:
```bash
cd backend

2. Install dependencies:
npm install

3. Setup database:

Make sure .env file contains your DB URL:

DATABASE_URL="mysql://user:password@localhost:3306/bookit"


Then run migrations:

npx prisma migrate dev --name init

4. Run the backend:
npm run dev


Your server will start on:
 http://localhost:5000
 (or the port set in .env)

*** Key Features

✅ Modular structure with controllers & routes
✅ Prisma ORM for clean DB access
✅ Full CRUD for experiences & bookings
✅ Promo code validation system
✅ Secure error handling
✅ TypeScript for type safety

*** API Endpoints Example
--> Create Booking
POST /api/bookings


Request body:

{
  "experienceId": "123",
  "selectedDate": "2025-10-31",
  "selectedTime": "10:00 AM",
  "quantity": 2,
  "userName": "Apeksha",
  "userEmail": "apeksha@example.com",
  "totalAmount": 500
}

*** Author

Developed by: Apeksha Patil

📧 Email: apekshap612@gmail.com

⭐ Don’t forget to star the repo if you like it!

---