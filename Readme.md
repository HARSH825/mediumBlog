# 📰 Medium Blog Clone  

A full-stack blogging platform inspired by [Medium](https://medium.com), built with modern web technologies.  
**🔗 Live Demo:** [medium-blog-topaz-six.vercel.app](https://medium-blog-topaz-six.vercel.app/)

---

## 🚀 Tech Stack

### 🖥 Frontend
- **React** – UI library  
- **TypeScript** – Type safety  
- **Tailwind CSS** – Utility-first styling  
- **date-fns** – Date formatting  

### ⚙️ Backend
- **Cloudflare Workers** – Serverless deployment  
- **Hono** – Lightweight web framework  
- **Prisma** – ORM with Edge runtime support  
- **PostgreSQL** – Relational database  
- **JWT** – Secure authentication  
- **Zod** – Schema-based validation  

### 🌐 Common
- Shared TypeScript types and validations  
- Custom NPM package: [`@harshchh/medium-common`](https://www.npmjs.com/package/@harshchh/medium-common)  

---

## ✨ Features
- 🔐 User authentication (Sign Up / Sign In)  
- 📝 Create and publish blog posts  
- 📚 Browse all published blogs  
- 👤 Author profiles  
- 📱 Fully responsive design  
- ⚡ Lightning-fast edge computing  
- 🌍 Globally distributed via Cloudflare  

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/HARSH825/mediumBlog.git

# Frontend setup
cd mediumBlog/frontend
npm install

# Backend setup
cd ../backend
npm install

# Setup environment variables (backend/.env)
DATABASE_URL=your_prisma_database_url
JWT_SECRET=your_jwt_secret

# Set frontend config (frontend/src/config.ts)
BACKEND_URL=your_backend_url

# Run the apps
cd ../frontend
npm run dev

cd ../backend
npm run dev
```
📁 Project Structure
```
mediumBlog/
├── frontend/    # React frontend (UI)
├── backend/     # Cloudflare Workers backend (API)
└── common/      # Shared types and validations (npm package)
```
🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.
