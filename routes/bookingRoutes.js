import express from 'express';
import {
  createBooking,
  getBookings,
  getMyBookings,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createBooking).get(protect, admin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id/status').put(protect, admin, updateBookingStatus);
router.route('/:id').delete(protect, deleteBooking);

export default router;
