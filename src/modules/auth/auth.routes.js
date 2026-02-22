const { Router } = require('express');
const authenticate = require('../../middlewares/authenticate');
const {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile
} = require('./auth.controller');
const {
  validate,
  registerSchema,
  loginSchema,
  updateProfileSchema
} = require('./auth.validation');

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
