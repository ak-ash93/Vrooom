import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        min: [3, "First name must be at least 3 characters"],
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
        min: [3, "Last name must be at least 3 characters"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: [8, "Password must be at least 8 characters"],
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
