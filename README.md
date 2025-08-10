# CarTrade - Full Stack Web Application

CarTrade is a full-stack web application inspired by cartrade.com.  
It allows users to browse cars, search/filter listings, view car details, add to cart, and sell their own cars.  
The project uses **React** for the frontend, **Node.js + Express** for the backend, **MongoDB** for the database, and **session-based authentication**.

---

## 🚀 Features

### 🖥️ Frontend
- **Homepage** with hero banner, popular brands, featured cars carousel, and car listings.
- **Search & Filters** for car brand, model year, and price.
- **View Details** button for each car.
- **Sell Car** page to submit listings (stored locally for now).
- **Cart** with add/remove functionality (Redux state synced with backend).
- **Responsive Design** using Bootstrap 5.

### ⚙️ Backend
- **User Authentication** (Signup/Login) using sessions.
- **Password hashing** with bcrypt.
- **Car API integration** (mock data used for testing to avoid API rate limits).
- **Cart API** for adding/removing cars linked to authenticated user.
- **Sell Car API** to store user-submitted listings.
- **MongoDB** for persistent storage.

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Redux Toolkit
- React Router DOM
- Bootstrap 5
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- express-session
- bcrypt
- cors

Frontend: https://cartrade-frontend.onrender.com

Backend:  https://cartrade-backend-9y1g.onrender.com/

🔗 API Endpoints

Auth

POST /api/auth/signup → Register user

POST /api/auth/login → Login user

POST /api/auth/logout → Logout

GET  /api/auth/me → logged-in user  : https://cartrade-backend-9y1g.onrender.com/api/auth/me


Cars

GET /api/cars → Get all cars (mock data or API) : https://cartrade-backend-9y1g.onrender.com/api/cars

GET /api/cars/:id → Get single car details : https://cartrade-backend-9y1g.onrender.com/api/cars/:id

POST /api/cars/sell → Add new car listing

Cart

POST /api/cart → Add car to cart

GET /api/cart → Get user cart : https://cartrade-backend-9y1g.onrender.com/api/cart

DELETE /api/cart/:carId → Remove car from cart 



