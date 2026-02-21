const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: true,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a valid email']
    },
    firstName: {
      type: String,
      required: [true, 'first name is required'],
      minlength: 2,
      maxlength: 25,
      trim: true,
      lowercase: true
    },
    lastName: {
      type: String,
      required: [true, 'last name is required'],
      minlength: 2,
      maxlength: 25,
      trim: true,
      lowercase: true
    },
    dob: {
      type: Date,
      required: [true, 'date of birth is required'],
      min: '1900-01-01',
      max: Date.now()
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: 8,
      maxlength: 50,
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
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
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
