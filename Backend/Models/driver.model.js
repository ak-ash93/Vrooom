import mongoose from "mongoose";

// Define GeoJSON point for location
const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
  },
});

const driverSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters"],
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
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
      minlength: [8, "Password must be at least 8 characters"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10,15}$/, "Enter a valid phone number"],
    },
    socketId: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },
    vehicle: {
      color: {
        type: String,
        required: true,
      },
      registration: {
        type: String,
        required: true,
        minlength: [2, "Registration number must be at least 2 characters"],
        uppercase: true,
        trim: true,
      },
      vehicleCapacity: {
        type: Number,
        required: true,
        min: [4, "Vehicle capacity must be at least 4"],
        max: 8,
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["sedan", "suv", "van", "hatchback"],
      },
    },
    location: {
      type: locationSchema,
      index: "2dsphere",
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

export default mongoose.models.Driver || mongoose.model("Driver", driverSchema);
