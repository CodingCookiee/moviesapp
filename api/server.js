// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/database.js';
import userRoute from './routes/user.route.js';
import reviewRoute from './routes/review.route.js';
import authRoute from './routes/auth.route.js';
// import favorites from './routes/favorites.routes.js';
// import movies from './routes/movies.routes.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';


dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
// Add this near your other routes
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString() 
  });
});



app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running on http://localhost/:${port}`);
  console.log(`Backend allowed client: ${process.env.CLIENT_URL}`);

}).on('error', (err) => {
  if (err.code === 'EACCES') {
    console.log(`Port ${port} requires elevated privileges.`);
  } else {
    console.error('Server error:', err);
  }
});



