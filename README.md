# PandaPlay - Video Streaming Platform

## 📋 Table of Contents

1. 🔗 [Live Demo](#livedemo)
2. 📱 [Features](#features)
3. ⚙️ [Tech Stack](#tech-stack)
4. 🚀 [Installation](#installation)
5. 🛠️ [Environment Setup](#env)

## <a name='livedemo'>[🔗LiveDemo](https://pandaplaymovies.vercel.app) </a>
![App Screenshot](./client/public/app.png)

## <a name="features">📱 Features</a>

- User Authentication with JWT
- Video Streaming
- React Player Integration
- Query Caching with React Query
- Responsive Design
- Performance Monitoring with Vercel Speed Insights
- Secure API with Helmet
- Cloud Media Storage with Cloudinary
- Docker for Contanierization

## <a name="tech-stack">⚙️ Tech Stack</a>

Frontend:
- React 18
- Vite
- TailwindCSS
- React Query/TanStack Query
- Axios
- React Player
- HeroIcons
- React Icons

Backend:
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Helmet
- Cloudinary
- Docker

Development Tools:
- ESLint
- Prettier
- PostCSS
- Autoprefixer

## <a name="installation">🚀 Installation</a>

1. Clone and Install:
```bash
git clone https://github.com/CodingCookiee/moviesapp.git
cd minimalnpm install

2. Database Setup:
npx prisma migrate dev --name init
npx prisma generate
