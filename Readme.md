# Medium Blog Clone

A full-stack blogging platform inspired by Medium, built with modern web technologies. Live Link : `[Medium]https://medium-blog-topaz-six.vercel.app/`

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date formatting

### Backend
- **Cloudflare Workers** - Serverless platform
- **Hono** - Lightweight web framework
- **Prisma** - ORM with Edge runtime
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Zod** - Input validation

### Common
- Shared TypeScript types and validations
- Custom NPM package (`[@harshchh/medium-common](https://www.npmjs.com/package/@harshchh/medium-common)`)

## ✨ Features

- 🔐 User authentication (signup/signin)
- 📝 Create and publish blog posts
- 📚 View all published blogs
- 👤 Author profiles
- 📱 Responsive design
- ⚡ Fast edge computing
- 🌐 Global distribution via Cloudflare

## 🛠️ Installation

1. Clone the repository:
````markdown
git clone <repository-url>

# Frontend
cd mediumBlog/frontend
npm install

# Backend
cd mediumBlog/backend
npm install

# Backend (.env)
DATABASE_URL=your_prisma_database_url
JWT_SECRET=your_jwt_secret

# Frontend (src/config.ts)
BACKEND_URL=your_backend_url

cd frontend
npm run dev

cd backend
npm run dev

````
📁 Project Structure
mediumBlog/
├── frontend/          # React frontend
├── backend/           # Cloudflare Workers backend
└── common/           # Shared types and validations

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
