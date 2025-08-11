import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.get("/verify", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});
router.get("/me", protect, async (req, res) => {
  try {
    res.json(req.user); // req.user is already loaded in protect middleware
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/me", protect, async (req, res) => {
  const { name, email, monthlyBudget } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email, monthlyBudget },
    { new: true }
  ).select("-password");
  res.json(updatedUser);
});

export default router;
