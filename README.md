# Bookstore Backend

A Node.js/Express backend API for a bookstore application.

## Features

- RESTful API architecture
- MongoDB with Mongoose ODM
- JWT authentication
- Password hashing with bcrypt
- Structured logging with Pino
- Code quality tools (ESLint, Prettier)
- Hot reload with Nodemon

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/john-roufaeil/bookstore-backend.git
   cd bookstore-backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration values.

3. **Start the server:**
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── services/        # Business logic layer
└── utils/           # Helper functions and utilities
```

## Scripts

- `npm start` - Start with Nodemon
- `npm run dev` - Start with debugging enabled
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Environment Variables

See `.env.example` for required environment variables.
