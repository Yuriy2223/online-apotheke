import { Types } from "mongoose";
import User, { UserDocument } from "@/models/User";
import { getGoogleUserInfo } from "@/auth/google";
import { generateAccessToken, generateRefreshToken } from "@/jwt/jwt";
import { JWTPayload, UserResponse, GoogleAuthResponse } from "@/types/users";

interface GoogleAuthResult {
  success: boolean;
  data?: GoogleAuthResponse;
  error?: string;
  details?: string;
  statusCode: number;
}

export async function processGoogleAuth(
  code: string
): Promise<GoogleAuthResult> {
  try {
    const googleUser = await getGoogleUserInfo(code);

    let user = (await User.findOne({
      email: googleUser.email,
    })) as UserDocument | null;

    let isNewUser = false;

    if (user) {
      if (user.provider === "local") {
        return {
          success: false,
          error: "An account with this email already exists",
          details: "Please log in as you registered",
          statusCode: 409,
        };
      }

      if (
        user.provider === "google" &&
        (!user.googleId || user.googleId !== googleUser.googleId)
      ) {
        user = (await User.findByIdAndUpdate(
          user._id,
          { $set: { googleId: googleUser.googleId } },
          { new: true }
        )) as UserDocument;
      }
    } else {
      user = new User({
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId,
        provider: "google",
        isEmailVerified: true,
        phone: null,
        password: null,
      });

      await user.save();
      isNewUser = true;
    }

    const payload: JWTPayload = {
      userId: (user._id as Types.ObjectId).toString(),
      email: user.email,
      provider: user.provider,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await User.findByIdAndUpdate(user._id, {
      $push: {
        refreshToken: {
          $each: [refreshToken],
          $slice: -5,
        },
      },
    });

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.emailVerificationToken;
    userObject._id = userObject._id.toString();

    const userResponse = userObject as UserResponse;

    return {
      success: true,
      data: {
        message: "Successful Google login!",
        user: userResponse,
        accessToken,
        refreshToken,
        isNewUser,
      },
      statusCode: 200,
    };
  } catch {
    return {
      success: false,
      error: "Google login error",
      statusCode: 500,
    };
  }
}
