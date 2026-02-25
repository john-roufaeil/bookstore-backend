const { Router } = require('express');
const {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile
} = require('../controllers/auth');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const {
  registerSchema,
  loginSchema,
  updateProfileSchema
} = require('../validations/auth');

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getUserProfile);
router.patch(
  '/profile',
  authenticate,
  validate(updateProfileSchema),
  updateUserProfile
);

module.exports = router;
