# Bookstore Backend

A Node.js/Express backend API for a bookstore application.

## Features

- RESTful API architecture
- MongoDB with Mongoose ODM
- JWT authentication
- Security best practices (Helmet, CORS)
- Password hashing with bcrypt
- Structured logging with Winston
- Code quality tools (ESLint, Prettier)
- Git hooks with Husky and lint-staged
- Hot reload with Nodemon

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration values.

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Run linting:**
   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   ```

## Project Structure

```
src/
├── config/          # Configuration files (database, logger, etc.)
├── controllers/     # Route controllers
├── middlewares/     # Custom middleware (auth, error handling, etc.)
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

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Commit with descriptive messages
5. Submit a pull request

## License

ISC
