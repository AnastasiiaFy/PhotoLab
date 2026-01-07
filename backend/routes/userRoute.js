import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  toggleLike,
  getLikedProducts
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

/* ===== AUTH ===== */
router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)

/* ===== LIKES / WISHLIST ===== */
router.post("/like/:productId", protect, toggleLike);
router.get("/likes", protect, getLikedProducts);

export default router