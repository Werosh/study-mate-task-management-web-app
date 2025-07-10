# 📚 StudyMate – Smart Study Task Manager..

**StudyMate** is a full-stack web application built with React and Firebase to help students organize and manage their academic tasks with ease. Whether it’s tracking assignments, exam schedules, or lectures, StudyMate simplifies student productivity with a clean interface and intuitive features.

---

## 🚀 Live Demo

🌍 [View Live App](https://smtaskmanager.netlify.app/)

---

## 🔑 Features

- 🔐 **User Authentication**

  - Secure login & registration using Firebase Auth

- ✅ **Task Management**

  - Create, update, and delete tasks
  - Categorize tasks (Assignment, Lecture, Exam)
  - Set priority levels and due dates

- 🔍 **Filtering**

  - Filter tasks by category or completion status

- 🖥️ **Responsive Design**

  - Mobile-friendly UI with clean layouts

- 🔒 **Secure Data**
  - User-specific task storage via Firebase Firestore

---

## 🛠 Tech Stack

| Layer    | Tech Used                 |
| -------- | ------------------------- |
| Frontend | React, Vite, React Router |
| Auth     | Firebase Authentication   |
| Database | Firebase Firestore        |
| UI Icons | React Icons               |
| Hosting  | Vercel / Netlify          |

---

## 📁 Project Structure

```
study-mate/
├── public/
│   ├── _redirects
│   ├── notebook.png
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── firebase/
│   └── pages/
├── App.jsx
├── main.jsx
├── index.css
├── .env
├── package.json
└── README.md
```

---

## 🧪 Setup Instructions

### 📦 Prerequisites

- Node.js (v18+ recommended)
- Firebase project (with Auth and Firestore enabled)

---

### 🔧 Step-by-Step Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/Werosh/study-mate-task-management-web-app.git
   cd study-mate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Create a project on [Firebase Console](https://console.firebase.google.com/)
   - Enable **Email/Password** authentication
   - Create a **Firestore Database**

4. **Configure environment variables**

   Create a `.env` file in the root:

   ```env
   VITE_API_KEY=your_firebase_api_key
   VITE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_project.appspot.com
   VITE_MESSAGING_SENDER_ID=xxxxxxxx
   VITE_APP_ID=your_firebase_app_id
   ```

5. **Run the app locally**

   ```bash
   npm run dev
   ```

6. _(Optional)_ **Deploy on Vercel / Netlify**
   - Make sure `_redirects` file is included in `public/` (for Netlify SPA routing)
   - Connect your GitHub repo to your deployment platform and follow their build steps

---

## 🧠 Folder Highlights

| Folder/File           | Description                                 |
| --------------------- | ------------------------------------------- |
| `components/`         | Reusable UI elements (Navbar, Footer, etc.) |
| `pages/`              | Main app views (Home, Login, etc.)          |
| `firebase/`           | Firebase config, auth, and db logic         |
| `context/AuthContext` | Global auth state using Context API         |

---

## 🙋‍♂️ Author

**W3r05h Kr!y4nj414**  
Frontend Developer | AI/ML Enthusiast  
📧 [weroshprofy@gmail.com]  
🌐 [[Portfolio](https://weroshportfolio.netlify.app/)]

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Feedback & Contributions

Have feedback? Found a bug? Want to contribute?  
Feel free to open issues or fork the repo and make a pull request.

---
