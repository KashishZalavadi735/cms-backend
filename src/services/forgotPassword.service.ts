import bcrypt from "bcryptjs";
import {
  findUserByEmailRepo,
  saveOtpRepo,
  verifyOtpRepo,
  changeUserPasswordRepo,
  findValidOtpRepo,
} from "../repository/forgotPassword.repository";
import {
  CHANGE_PASSWORD_MESSAGES,
  OTP_MESSAGES,
  USER_MESSAGES,
} from "../constants/messages";
import { generateOtp } from "../utils/generateOtp";
import { getEmailTemplate } from "../utils/OtpEmailTemplate";
import { sendEmail } from "../utils/sendEmail";

// Send OTP
export const sendOtpService = async (email: string) => {
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error(USER_MESSAGES.USER_NOT_FOUND);

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await saveOtpRepo(user.id, otp, expiresAt);

  const html = getEmailTemplate(user.name, otp);
  await sendEmail(email, "Your OTP for Password Reset", html);

  return true;
};

// Verify OTP
export const verifyOtpService = async (email: string, otp: string) => {
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error(USER_MESSAGES.USER_NOT_FOUND);

  const userOtp = await findValidOtpRepo(user.id, otp);
  if (!userOtp) throw new Error(OTP_MESSAGES.INVALID_OTP);

  await verifyOtpRepo(userOtp.id);
};

// Change password
export const changePasswordService = async (
  userId: string,
  newPassword: string,
  confirmPassword: string,
) => {
  // Check password match
  if (newPassword !== confirmPassword) {
    throw new Error(CHANGE_PASSWORD_MESSAGES.PASSWORD_NOT_MATCH);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  const updatePassword = await changeUserPasswordRepo(userId, hashedPassword);

  return updatePassword;
};
