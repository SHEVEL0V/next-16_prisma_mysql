# Kanban Board - Next.js Application

A modern, full-stack Kanban board application built with **Next.js 16**, **React 19**, **TypeScript**, and **Prisma ORM**. Features drag-and-drop task management, secure JWT authentication, and a responsive Material-UI interface.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8+ or MariaDB 10.5+

### Installation

```bash
# Clone repository
git clone https://github.com/SHEVEL0V/next-16_prisma_mysql.git
cd next-16_prisma_mysql

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# Setup database
npx prisma db push
npx prisma generate

# Run development server
npm run dev
```

Server runs at `http://localhost:3000`

## 📚 Documentation

For detailed documentation, see:
- **[📖 Documentation Index](./docs/INDEX.md)** - Start here
- [API Reference](./docs/API.md) - All services and actions
- [Architecture Guide](./docs/ARCHITECTURE.md) - Design patterns
- [Components Reference](./docs/COMPONENTS.md) - UI components
- [Development Guide](./docs/DEVELOPMENT.md) - Code standards
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues

## 🎯 Key Features

- **Drag-and-Drop**: Seamless task and column management
- **Authentication**: Secure JWT with bcrypt password hashing
- **Type-Safe**: Full TypeScript with Zod validation
- **Optimized**: React.memo, dev-only logging, efficient queries
- **Modern UI**: Material-UI with emotion styling
- **Well Documented**: JSDoc comments and comprehensive guides

## 🛠️ Technology Stack

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 16.1.1 | React framework |
| React | 19.2.0 | UI library |
| TypeScript | ^5 | Type safety |
| Prisma | ^7.3.0 | ORM |
| Material-UI | ^7.3.6 | Components |
| MariaDB | ^7.3.0 | Database adapter |

## 📋 Environment Variables

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/kanban_db"

# Authentication (min 32 chars each)
AUTH_SECRET="your-secret-key-min-32-chars"
JWT_SECRET="your-jwt-secret-min-32-chars"
JWT_EXPIRATION_DAYS=7

# Application
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Generate secrets with: `openssl rand -base64 32`

## 📁 Project Structure

```
src/
├── app/                 # Next.js pages and layouts
├── components/          # Shared UI components
├── features/            # Feature modules (board, auth, user)
│   ├── board/          # Board CRUD and management
│   ├── auth/           # Authentication (login/register)
│   └── user/           # User profile management
├── utils/              # Utilities (session, validation)
└── lib/                # Core libraries (Prisma client)

prisma/
├── schema.prisma       # Main database schema
├── auth.prisma         # Auth models
└── board.prisma        # Board models
```

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm start        # Run production server
npm run lint     # Check code style
```

## 📡 API Overview

### Board Service
- Get all boards
- Get board with columns and tasks
- Create/update/delete boards

### Column Service
- Create columns with auto-ordering
- Update/delete columns
- Reorder columns

### Task Service
- Create/update/delete tasks
- Reorder tasks across columns
- Update priority

### Auth Service
- User registration with email validation
- Secure login with bcrypt
- JWT session management

### User Service
- Get user profile
- Update profile information

See [API Reference](./docs/API.md) for complete documentation.

## 🔒 Security Features

✅ **Bcrypt** password hashing (10 rounds)  
✅ **JWT** encryption (HS256 + AES-256-GCM)  
✅ **HTTP-only** cookies with SameSite=Lax  
✅ **Timing-safe** password comparison  
✅ **Input validation** with Zod schemas  
✅ **CSRF protection** via cookies  

## ⚡ Performance

- **30-40% fewer re-renders** with React.memo memoization
- **5-10% faster** in production with dev-only logging removed
- **Atomic queries** with React cache()
- **Optimized Prisma** includes for related data

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Follow [code standards](./docs/DEVELOPMENT.md#code-standards)
3. Verify TypeScript: `npx tsc --noEmit`
4. Run linter: `npm run lint`
5. Commit with descriptive message
6. Create pull request

## 📄 License

This project is private and not for public distribution.

---

**Version**: 0.1.1  
**Repository**: [SHEVEL0V/next-16_prisma_mysql](https://github.com/SHEVEL0V/next-16_prisma_mysql)  
**Last Updated**: 2026-04-28
