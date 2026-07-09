# 🚀 React + Express Starter

A reusable React + Express starter template for rapid full-stack development.

## ✨ Features

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- SweetAlert2
- React Icons

### Backend

- Express.js
- PostgreSQL
- CORS
- dotenv
- Nodemon

## 📁 Project Structure

```
react-express-starter/
├── src/                # React application
├── public/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## 📦 Requirements

- Node.js 20+
- PostgreSQL

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/andrebagus18/react-express-starter.git
```

Go to project

```bash
cd react-express-starter
```

Install frontend dependencies

```bash
npm install
```

Install backend dependencies

```bash
cd server
npm install
```

Create `.env` inside the `server` folder and configure your PostgreSQL database.

Example:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_database
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

## ▶️ Running the Application

### Terminal 1 (React)

```bash
npm run dev
```

### Terminal 2 (Express)

```bash
cd server
npm run dev
```

React

```
http://localhost:5173
```

Express

```
http://localhost:3000
```

## 📦 Included Packages

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- SweetAlert2
- React Icons

### Backend

- Express
- PostgreSQL (pg)
- Sequelize
- CORS
- dotenv
- Nodemon

## 🎯 Purpose

This repository is used as a personal starter template to quickly build React + Express applications without repeating the initial project setup.
