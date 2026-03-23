# SHOP IT 🛍️

A full-stack MERN e-commerce platform with a luxury editorial design, Paystack payment integration, and a full-featured admin dashboard.

### 🌐 Live Demo
- **Storefront (Vercel):** [https://shop-it-e5sz.vercel.app](https://shop-it-e5sz.vercel.app)
- **Backend API (Render):** [https://shop-it-vgur.onrender.com](https://shop-it-vgur.onrender.com)

---

## ✨ Features

### Storefront
- **Product Browsing** — Horizontally scrollable category chips, price-range filtering, and live search
- **Product Details** — Multi-image gallery, customer reviews & ratings
- **Wishlist** — Save items for later with local storage persistence
- **Shopping Cart** — Slide-out cart modal with real-time quantity & subtotal management
- **Checkout & Payment** — Paystack integration (GHS currency) with address & phone collection
- **User Dashboard** — Order history, profile management, password change with visibility toggles
- **Forgot / Reset Password** — Email-based password reset flow via Nodemailer

### Admin Dashboard
- **Dashboard Overview** — Total products, orders, categories, and user counts
- **Product Management** — CRUD operations with multi-image upload (Multer)
- **Category Management** — Create, edit, and delete product categories
- **Order Management** — View, filter by status, and update order statuses
- **Customize** — Upload hero slider images for the storefront

### Design & UX
- **Luxury Editorial Aesthetic** — Sharp edges, uppercase tracking, clean typography (Urbanist font)
- **Responsive** — Mobile-first design with Tailwind CSS
- **Animated Loader** — Custom CSS orbiting-dot spinner for all loading states
- **Empty States** — Curated editorial-style placeholders for empty cart, wishlist, and search results
- **Profile Standardization** — Static branded profile images across all views

---

## 🛠️ Tech Stack

| Layer      | Technology                                                 |
| ---------- | ---------------------------------------------------------- |
| Frontend   | React 18, React Router v5, Tailwind CSS 3, Axios, Notistack |
| Backend    | Node.js, Express.js, MongoDB (Mongoose)                    |
| Auth       | JWT (jsonwebtoken), bcryptjs                               |
| Payments   | Paystack (react-paystack)                                  |
| Email      | Nodemailer (Gmail SMTP)                                    |
| Uploads    | Multer (local file storage)                                |
| Icons      | Lucide React                                               |
| Dev Tools  | Nodemon, pnpm                                              |

---

## 📁 Project Structure

```
E-Commerce/
├── client/                  # React frontend
│   ├── public/              # Static assets, index.html, style.css
│   └── src/
│       ├── components/
│       │   ├── admin/       # Admin dashboard (products, orders, categories)
│       │   └── shop/        # Storefront (home, auth, cart, wishlist, profile)
│       └── index.css        # Global styles & loader animation
│
├── server/                  # Express backend
│   ├── controller/          # Route handlers (auth, users, products, orders, categories)
│   ├── middleware/           # Auth middleware
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── config/              # Database configuration
│   └── public/uploads/      # Uploaded images (products, customize)
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **pnpm** (recommended) or npm
- **MongoDB** running locally or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/Kaeytee/mern-Ecommerce2.git
cd mern-Ecommerce2
```

### 2. Configure environment variables

**Server** — create/edit `server/.env`:

```env
DATABASE=mongodb://127.0.0.1:27017/ecommerce
PORT=8000
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_SERVICE=gmail
```

**Client** — create/edit `client/.env`:

```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
DISABLE_ESLINT_PLUGIN=true
```

> **Note:** For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833), not your regular password.

### 3. Install dependencies

```bash
cd server && pnpm install
```

```bash
cd client && pnpm install
```

### 4. Start the application

**Terminal 1 — Backend:**

```bash
cd server
pnpm run start:dev
```

**Terminal 2 — Frontend:**

```bash
cd client
pnpm start
```

Access the app at **http://localhost:3000**

---

## 🔑 Default Admin Setup

To create your first admin account, register a regular user through the app, then manually update the `role` field in MongoDB:

```js
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your_admin@email.com" },
  { $set: { role: 1 } }
)
```

Admin dashboard is accessible at **http://localhost:3000/admin/dashboard**

---

## 📦 API Endpoints

### Auth
| Method | Endpoint                         | Description          |
| ------ | -------------------------------- | -------------------- |
| POST   | `/api/signup`                    | Register new user    |
| POST   | `/api/signin`                    | Login                |
| POST   | `/api/forgot-password`           | Send reset email     |
| POST   | `/api/reset-password/:token`     | Reset password       |

### Products
| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/api/product/all-product`       | Get all products         |
| POST   | `/api/product/add-product`       | Add product (admin)      |
| POST   | `/api/product/edit-product`      | Edit product (admin)     |
| POST   | `/api/product/delete-product`    | Delete product (admin)   |

### Orders
| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/api/order/create-order`        | Create new order         |
| POST   | `/api/order/user-orders`         | Get orders by user       |
| GET    | `/api/order/all-orders`          | Get all orders (admin)   |

### Users
| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/api/user/single-user`          | Get user details         |
| POST   | `/api/user/change-password`      | Update password          |
| POST   | `/api/user/update-personal-info` | Update profile info      |

---

## 🌐 Deployment

### Backend (Render)

1. Create an account on [Render](https://render.com/)
2. Connect your GitHub repository
3. Create a **Web Service** with:
   - **Build Command:** `pnpm install`
   - **Start Command:** `node app.js`
4. Set your environment variables in Render's dashboard
5. Update `DATABASE` to your MongoDB Atlas connection string

### Frontend (Vercel / Netlify)

1. Import the `client` directory
2. Set build command: `pnpm run build`
3. Set output directory: `build`
4. Add environment variables (`REACT_APP_API_URL`, `REACT_APP_PAYSTACK_PUBLIC_KEY`)

---

## 📄 License

ISC

---

Built for **DCIT209**
