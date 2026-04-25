import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/spa-wellness')
  .then(async () => {
    console.log('Connected to DB');
    const bookings = await Booking.find().populate('user', 'name email');
    console.log('ALL BOOKINGS:', JSON.stringify(bookings, null, 2));
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
    process.exit(1);
  });
