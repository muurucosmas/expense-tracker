# 💰 Expense Tracker App

A simple React-based Expense Tracker that allows users to add, view, search, and persist expenses using local storage.

---

## 🚀 Features

- Add new expenses (name, description, category, amount, date)
- View all expenses in a clean list layout
- Search expenses by name
- Data persists even after page refresh (localStorage)
- Automatic form reset after submission
- Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

- React (useState, useEffect)
- JavaScript (ES6+)
- Tailwind CSS
- LocalStorage API

---

## 📂 Project Structure

---

## ⚙️ How It Works

### 1. Add Expense
User fills the form and submits → data is stored in state.

### 2. Save to Local Storage
Every update is saved automatically:

```js
useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expense));
}, [expense]);