# Trello Clone 📋✨

*A sleek, modern task management app built with React, Redux, Node.js, and Firebase.*

---

## 🌟 Overview

Welcome to **Trello Clone**, a powerful yet simple web app to organize your tasks and projects like a pro! Inspired by Trello, this app lets you create boards, lists, and tasks with drag-and-drop functionality, all wrapped in a stunning, responsive design. Whether you're managing work, personal goals, or team projects, this app has you covered.

### Key Features
- **Boards**: Create unlimited project boards (e.g., "Work", "Home").
- **Lists**: Add lists within boards to categorize tasks (e.g., "To Do", "Done").
- **Tasks**: Drag and drop tasks between lists to track progress.
- **Google Login**: Secure authentication via Firebase.
- **Dark Mode**: Toggle between light and dark themes for a comfy experience.
- **Responsive Design**: Looks great on desktop and mobile.

---

## 🎨 Screenshots

| Home Page (Light Mode) | Board View (Dark Mode) |
|------------------------|-----------------------|
| ![Home Page](https://via.placeholder.com/600x400.png?text=Home+Page+-+Light+Mode) | ![Board View](https://via.placeholder.com/600x400.png?text=Board+View+-+Dark+Mode) |

---

## 🛠️ Tech Stack

### Frontend
- **React**: For a dynamic, component-based UI.
- **Redux Toolkit**: State management made simple.
- **React DnD**: Smooth drag-and-drop functionality.
- **Tailwind CSS**: Beautiful, utility-first styling.
- **Firebase Auth**: Google login integration.
- **Axios**: API requests with ease.

### Backend
- **Node.js + Express**: Fast, scalable server.
- **MongoDB**: Flexible NoSQL database for boards, lists, and tasks.
- **Firebase Admin**: Token verification for secure auth.
- **Mongoose**: Elegant MongoDB object modeling.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
- **Node.js** (v18+ recommended): [Download](https://nodejs.org/)
- **MongoDB**: Install and run locally ([Guide](https://docs.mongodb.com/manual/installation/))
- **Firebase Project**: Set up for Google Auth ([Firebase Console](https://console.firebase.google.com/))

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/trello-clone.git
cd trello-clone


#### 2. Set Up the Backend

cd trello-clone-backend
npm install


🧑‍💻 Project Structure
Backend (trello-clone-backend/)

├── config/
│   └── database.js       # MongoDB connection
├── middleware/
│   └── errorHandler.js   # Global error handling
├── models/
│   ├── Board.js          # Board schema
│   ├── List.js           # List schema
│   └── Task.js           # Task schema
├── routes/
│   ├── authRoutes.js     # Authentication endpoints
│   ├── boardRoutes.js    # Board CRUD
│   ├── listRoutes.js     # List CRUD
│   └── taskRoutes.js     # Task CRUD
├── server.js             # Main server file
├── .env                  # Environment variables
└── serviceAccountKey.json # Firebase service account key



Frontend (trello-clone-frontend/)
├── src/
│   ├── api/
│   │   └── api.js        # Axios API client
│   ├── components/
│   │   ├── Auth/
│   │   │   └── Login.jsx # Google login component
│   │   ├── Board/
│   │   │   ├── Board.jsx # Board view
│   │   │   ├── List.jsx  # List view
│   │   │   └── TaskCard.jsx # Task card
│   │   └── Common/
│   │       ├── Navbar.jsx # Navigation bar
│   │       └── ThemeToggle.jsx # Theme switcher
│   ├── context/
│   │   └── ThemeContext.jsx # Dark mode context
│   ├── pages/
│   │   ├── Home.jsx      # Boards overview
│   │   └── BoardPage.jsx # Single board page
│   ├── redux/
│   │   ├── slices/
│   │   │   ├── authSlice.js # Auth state
│   │   │   ├── boardSlice.js # Boards state
│   │   │   └── taskSlice.js # Tasks state
│   │   └── store.js      # Redux store
│   ├── App.jsx           # Main app component
│   ├── index.css         # Tailwind styles
│   └── main.jsx          # Entry point
├── .env                  # Firebase config
└── vite.config.js        # Vite configuration




---

## ⚙️ How This App Works and What to Do

### How It Works
This Trello Clone is your digital organizer! It’s built to mimic a physical bulletin board with sticky notes, but with a modern twist:
- **Backend Magic**: A Node.js server with Express handles requests, stores data in MongoDB, and verifies your identity using Firebase Admin. Every board, list, and task you create is securely tied to your Google account.
- **Frontend Flow**: React powers the sleek UI, Redux keeps everything in sync, and React DnD lets you drag tasks around effortlessly. Firebase Auth logs you in via Google, and Tailwind CSS makes it look stunning in light or dark mode.
- **Real-Time Feel**: When you add or move tasks, the app talks to the backend instantly, saving your changes and updating the screen—no refresh needed!

### What to Do
Here’s how to dive in and make the most of it:
1. **Sign In**: Hit "Sign in with Google" to log in securely with your Google account.
2. **Create a Board**: On the "Your Boards" page, type a name like "Weekend Plans" and click "Add Board". It’s your project hub!
3. **Add Lists**: Inside a board, create lists like "To Do" or "In Progress" to organize your workflow.
4. **Add Tasks**: Drop tasks into lists (e.g., "Buy groceries") and watch them appear as draggable cards.
5. **Move Stuff Around**: Drag tasks between lists to track progress—say, from "To Do" to "Done".
6. **Style It**: Toggle dark mode with the sun/moon icon in the navbar for a cool vibe.
7. **Log Out**: Done for the day? Click "Logout" in the navbar to sign out safely.

It’s that simple—start small with one board or go big with a full project dashboard. Organize your life, one task at a time! 🚀