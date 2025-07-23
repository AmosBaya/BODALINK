# BodaLink 🛵

**BodaLink** is a full-stack ride-hailing platform tailored for motorcycle (boda-boda) transportation in Africa. It connects Riders and Drivers in real time, ensuring safe, reliable, and convenient motorcycle rides through a modern, responsive web application.

Built using the **MERN stack** (MongoDB, Express, React, Node.js), BodaLink supports real-time communication, secure authentication, mobile payments via M-Pesa, and alerts via SMS and email.

---

## 🚀 Key Features

### 🧑‍💻 Functional
- **User Roles:** Riders and Drivers with role-based access
- **Authentication:** JWT-based secure login & signup
- **Real-Time Updates:** Ride requests and responses using **Socket.io**
<!-- - **M-Pesa Integration:** Seamless mobile money transactions
- **SMS Alerts:** Powered by **Twilio** for trip and verification notifications
- **Email Notifications:** Transaction and support emails via **Nodemailer**
- **Profile Management:** Upload profile images using **Multer** -->
- **Responsive UI:** Built with **Tailwind CSS v4.1** and **shadcn/ui**

### ⚙️ Technical
- **Frontend:** React (Vite), Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **State Management:** React Hooks and Context API
- **Sockets:** Real-time events with Socket.io
- **Secure Routing:** Middleware for access control
- **RESTful API Design**

---

## 📁 Folder Structure

```text
BodaLink/
├── client/                   # Frontend (React + Vite)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── styles/
│       └── utils/
├── server/                   # Backend (Node.js + Express)
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── utils/
├── .env                      # Environment variables
├── package.json              # Root dependencies (optional)
└── README.md


```
---


# 🚀 Getting Started
## 1. Clone the project
 git clone https://github.com/AmosBaya/bodalink.git 

 cd bodalink

## 2. Install dependencies
cd server && npm install

cd ../client && npm install

## 3. Create .env in /server
PORT=5000

MONGO_URI=mongodb://localhost:27017/bodalink

JWT_SECRET=your_jwt_secret
<!-- MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE=your_twilio_number
EMAIL_USER=your_email
EMAIL_PASS=your_email_password -->

## 4. Run the app
### Start backend
cd server

pnpm run dev

### Start frontend
cd ../client

pnpm run dev

---

# 📄 License
##### Licensed under the MIT License

---

# 🤝 Contact & Contributing
Pull requests and issues are welcome to improve BodaLink!

Maintainer: Amos Baya

Email: amosbaya96@gmail.com

GitHub: @AmosBaya