import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('SPA Backend API is running!');
});

// Seed admin route (temporary setup)
import User from './models/User.js';
import bcrypt from 'bcryptjs';

app.post('/api/setup-admin', async (req, res) => {
  try {
    const adminExists = await User.findOne({ email: 'ridhimasr16@gmail.com' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({
      name: 'Admin Ridhima',
      email: 'ridhimasr16@gmail.com',
      password: 'ridhimasr16',
      role: 'admin',
    });

    res.status(201).json({ message: 'Admin user created successfully', admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
