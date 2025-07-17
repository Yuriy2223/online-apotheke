import bcrypt from "bcryptjs";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  // phone?: string;
  avatar?: string;
  address?: string;
  password: string;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  refreshToken: string[];
  googleId: string | null;
  provider: "local" | "google";
  resetPasswordToken: string | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    avatar: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Invalid email format",
      ],
    },
    // phone: {
    //   type: String,
    //   required(this: UserDocument) {
    //     return this.provider === "local";
    //   },
    //   trim: true,
    //   match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone format"],
    // },
    password: {
      type: String,
      required(this: UserDocument) {
        return this.provider === "local";
      },
      minlength: 6,
      // maxlength: 32,
      maxlength: 128,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: [String],
      default: [],
    },
    googleId: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.index({ googleId: 1 });

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password") || this.provider === "google") return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) throw new Error("Password not set on document");
  return await bcrypt.compare(candidatePassword, this.password);
};

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
