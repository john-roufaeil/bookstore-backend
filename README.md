# 📚 Bookstore Backend

> REST API for a full-featured online bookstore — built as a team project during our ITI training.

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://bookstore-backend-lake.vercel.app/api)

**Live API:** https://bookstore-backend-lake.vercel.app/api  
**Frontend repo:** https://github.com/john-roufaeil/bookstore-frontend

---

## 📖 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started-locally)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [How It Works](#-how-it-works)
- [Database Seeding](#-database-seeding)
- [Team](#-team)
- [Scripts](#-scripts)

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| **Node.js** + **Express 5** | Server and routing |
| **MongoDB** + **Mongoose 9** | Database and ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Joi** | Request validation |
| **Pino** | HTTP request logging |
| **Cloudinary** | Image uploads |
| **Vercel** | Serverless deployment |

---

## 🚀 Getting Started Locally

**Requirements:** Node.js, a MongoDB database (local or Atlas)

```bash
git clone https://github.com/john-roufaeil/bookstore-backend.git
cd bookstore-backend
npm install
cp .env.example .env
# fill in your values in .env
npm run dev
```

Server runs on `http://localhost:5000`

---

## 🔑 Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_long_random_string
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
```

---

## 📁 Project Structure

```
bookstore-backend/
├── index.js                  # Entry point — connects DB, starts server, exports Vercel handler
├── app.js                    # Express app — middleware and routes wired together
├── vercel.json               # Vercel deployment config
└── src/
    ├── config/
    │   └── cloudinary.js     # Cloudinary SDK setup
    ├── controllers/          # Handle request/response for each resource
    ├── middlewares/
    │   ├── authenticate.js   # Verifies JWT, attaches user to req.user
    │   ├── authorize.js      # Checks user role (admin/user)
    │   ├── validate.js       # Runs Joi schema against req.body
    │   ├── errorHandler.js   # Central error handler (dev vs prod detail)
    │   ├── rateLimit.js      # Custom rate limiter — 100 req/min per IP
    │   └── logger.js         # Pino HTTP logger
    ├── models/               # Mongoose schemas for all collections
    ├── routes/               # Route definitions
    ├── services/
    │   ├── auth.js           # generateToken, verifyToken
    │   └── order.js          # Order placement logic (MongoDB transaction)
    ├── utils/
    │   ├── ApiError.js       # Custom error class with statusCode
    │   ├── ApiResponse.js    # Consistent response shape for all endpoints
    │   ├── pagination.js     # Reusable paginate() helper
    │   └── errorHelpers.js   # Converts Mongoose/JWT errors into readable ApiErrors
    └── validations/          # Joi schemas — one file per resource
```

---

## 📡 API Endpoints

All routes are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | — | Create a new user account |
| `POST` | `/login` | — | Login and receive a JWT |
| `POST` | `/logout` | ✅ | Logout (client discards token) |
| `GET` | `/me` | ✅ | Get currently logged-in user's data |
| `PATCH` | `/profile` | ✅ | Update first name or last name |

### Books — `/api/books`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | — | Get all books. Query params: `search`, `category`, `author`, `minPrice`, `maxPrice`, `page`, `limit` |
| `GET` | `/:id` | — | Get a single book by ID |
| `POST` | `/` | 🔐 Admin | Create a book |
| `PATCH` | `/:id` | 🔐 Admin | Update a book |
| `DELETE` | `/:id` | 🔐 Admin | Delete a book |
| `POST` | `/:bookId/reviews` | ✅ | Add a review to a book |
| `GET` | `/:bookId/reviews` | — | Get all reviews for a book |

### Authors — `/api/authors`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | — | Get all authors |
| `GET` | `/:id` | — | Get a single author |
| `POST` | `/` | 🔐 Admin | Create an author |
| `PATCH` | `/:id` | 🔐 Admin | Update an author |
| `DELETE` | `/:id` | 🔐 Admin | Delete an author |

### Categories — `/api/categories`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | — | Get all categories |
| `POST` | `/` | 🔐 Admin | Create a category |
| `PATCH` | `/:id` | 🔐 Admin | Update a category |
| `DELETE` | `/:id` | 🔐 Admin | Delete a category |

### Cart — `/api/cart`

All cart routes require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get the logged-in user's cart |
| `POST` | `/` | Add a book to cart |
| `PATCH` | `/quantity` | Increment or decrement an item's quantity |
| `DELETE` | `/` | Remove an item from cart |

### Orders — `/api/orders`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Place an order from current cart |
| `GET` | `/my` | ✅ | Get logged-in user's order history |
| `GET` | `/` | 🔐 Admin | Get all orders (supports `status` filter) |
| `PATCH` | `/:id` | 🔐 Admin | Update order status |

### Reviews — `/api/reviews`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `DELETE` | `/:id` | ✅ | Delete a review |
| `PATCH` | `/:id` | ✅ | Edit a review |

### Cloudinary — `/api/cloudinary-signature`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ | Get a signed upload URL for direct browser-to-Cloudinary uploads |

---

## ⚙️ How It Works

### Authentication

1. On login, the server creates a JWT containing `_id`, `email`, and `role`, and returns it.
2. The client stores the token in `localStorage` and sends it with every request as `Authorization: Bearer <token>`.
3. The `authenticate` middleware verifies the token signature, looks up the user in the database, and attaches the user object to `req.user`.
4. The `authorize` middleware checks `req.user.role` against the roles allowed for that route.

### Order Placement

When `POST /api/orders` is called:

1. The user's cart is fetched from the database.
2. Each book's stock is checked — if any item has insufficient stock, the whole order fails with a specific error message.
3. Stock is reduced for every book in the order.
4. A new order document is created with `status: processing`.
5. The user's cart is cleared.

Steps 2–5 run inside a **MongoDB transaction** — if anything fails, all changes are rolled back.

### Error Handling

All errors are caught by Express and forwarded to the `errorHandler` middleware.

- **Development:** Full stack trace is included in the response.
- **Production:** Only a clean message is returned. Specific error types (duplicate key, invalid ObjectId, validation failure, expired token) are converted into readable messages first.

All responses follow a consistent shape:

```json
// success
{ "success": true, "message": "...", "data": {} }

// error
{ "success": false, "message": "what went wrong" }
```

### Rate Limiting

Any IP that sends more than **100 requests per minute** receives a `429 Too Many Requests` response. Implemented without any external library — a `Map` tracks request counts and timestamps per IP, cleaned up every 30 seconds.

---

## 🌱 Database Seeding

A seed script populates the database with realistic sample data (145 books, 30 authors, 10 categories, 20 users, orders, reviews, carts).

```bash
# Add data on top of what's already in the DB
node seed.js

# Wipe all collections first, then seed
node seed.js --fresh
```

After seeding, you can log in with:

| Email | Password | Role |
|-------|----------|------|
| admin@bookstore.com | Admin1234 | admin |
| john@bookstore.com | Admin1234 | admin |
| khaled@example.com | User1234 | user |
| any other seeded user | User1234 | user |

---

## 👥 Team

This project was built by a team of 4 as part of our ITI training program.

| Member | Responsibilities |
|--------|-----------------|
| **Person 1** | Auth module, middleware (authenticate, authorize, error handler), utilities (ApiError), DB config |
| **Person 2** | Books & Categories modules (routes, controllers, schemas) |
| **Person 3** | Cart & Orders modules, ApiResponse, pagination utility, rate limiter, logger, backend deployment |
| **Person 4** | Authors & Reviews modules, Cloudinary upload integration |

---

## 📜 Scripts

```bash
npm start        # start the server
npm run dev      # start with nodemon and Node.js inspector
npm run lint     # check code with ESLint
npm run lint:fix # auto-fix ESLint issues
```
