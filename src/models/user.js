const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [25, 'First name cannot exceed 25 characters'],
      trim: true,
      lowercase: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [25, 'Last name cannot exceed 25 characters'],
      trim: true,
      lowercase: true
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
      min: ['1900-01-01', 'Birth date must be after 01-01-1900'],
      max: [Date.now(), 'Birth date cannot be in the future']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      maxlength: [50, 'Password cannot exceed 50 characters'],
      select: false
    },
    passwordChangedAt: Date,
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    }
  },
  {timestamps: true}
);
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Number.parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// we pass the user password here and i don't use this.password bec. passowrd is set to select = false , and also the method is defined to be instance method to be definedfor all instance document

module.exports = mongoose.model('User', userSchema);
