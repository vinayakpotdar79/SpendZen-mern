# 💰 SpendZen-personal Expense Tracker 
A **full-stack expense tracker app** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
This app allows users to register, log in, manage their expenses, track budgets, search expenses, and visualize data with **pie charts and graphs**.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based login & register)
- 👤 **User Profile Management**
  - Update profile (name, email, monthly budget)
- ➕ **Add Expenses**
  - Category, amount, date, and description
- 🔍 **Search Expenses**
  - Quickly search by description or category
- 📊 **Visual Analytics**
  - Pie chart for expense categories
  - Line/Bar chart for spending over time
- 📝 **Expense History**
  - View all expenses for logged-in user
- ✏️ **Edit / Delete Expenses**
- 🎯 **Monthly Budget Tracking**

---

## 🛠️ Tech Stack

### Frontend:
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 📊 Chart.js

### Backend:
- 🟢 Node.js
- 🚂 Express.js
- 🔑 JWT Authentication
- 🛡️ Bcrypt (password hashing)

### Database:
- 🍃 MongoDB (Mongoose ORM)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/mern-expense-tracker.git
cd mern-expense-tracker
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
