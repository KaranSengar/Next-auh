import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true, // ✅ Automatically lowercase karega
    trim: true, // ✅ Unwanted spaces remove karega
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// ✅ Debugging ke liye log karo ki model create ho raha ya nahi
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
console.log("UserModel Loaded:", UserModel);

export default UserModel;
