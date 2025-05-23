import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      const logoutTime = Date.now();
      return new Date(logoutTime + 25 * 60 * 1000);
    },
  },
});

export default mongoose.models.blacklistToken ||
  mongoose.model("blacklistToken", blacklistTokenSchema);
