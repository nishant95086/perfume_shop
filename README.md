# 🌸 Perfume Shop — Full Stack MERN Project

An elegant and modern **Perfume Shop** web application built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
This project demonstrates full-stack development skills — combining **responsive UI design**, **dynamic data fetching**, and **smooth animations** to create a **premium shopping experience**.

---

## ✨ Features

### 🏠 Frontend (React + Tailwind CSS + Framer Motion)
- **Modern, minimal, and luxurious UI** with premium aesthetic design  
- **Responsive navigation bar** with logo, links, and mobile-friendly menu  
- **Hero Banner** with call-to-action button and subtle animations  
- **Product Cards** grid with hover effects, zoom-in animation, and dynamic price  
- **Product Detail Page**:
  - Full product info (name, description, price, sizes)
  - Dynamic image gallery with thumbnails
  - Size selector that updates price dynamically
  - Reviews section (read + add review)
  - Social share button
- **Smooth Animations** using [Framer Motion](https://www.framer.com/motion/)
- **Responsive design** for mobile, tablet, and desktop

### ⚙️ Backend (Node.js + Express + MongoDB)
- RESTful API for managing:
  - Products (`/api/products`)
  - Reviews (`/api/reviews`)
- Product model supports:
  - Name, slug, description, images, base price, and size-price variations
- Review model supports:
  - Product reference, user name, rating, and comment
- **MongoDB (via Mongoose)** for data modeling and schema validation
- **CORS**, **dotenv**, and **Express JSON middleware** configured
- Includes a `seed.js` file to insert mock product data into the database

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite), Tailwind CSS, Framer Motion, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| State/Data | Axios |
| Deployment | Vercel (Frontend) + Render (Backend + DB) |

---

## 📁 Folder Structure
perfume-shop/
├── backend/
│ ├── models/
│ │ ├── Product.js
│ │ └── Review.js
│ ├── routes/
│ │ ├── products.js
│ │ └── reviews.js
│ ├── seed.js
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── ImageGallery.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ └── ProductPage.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ ├── index.css
│ ├── tailwind.config.cjs
│ ├── package.json
│
└── README.md

