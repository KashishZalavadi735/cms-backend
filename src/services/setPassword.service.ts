import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  findUserByPasswordTokenRepo,
  updateUserPasswordRepo,
} from "../repository/setPassword.repository";
import { SET_PASSWORD_MESSAGES, TOKEN_MESSAGES } from "../constants/messages";

// Set password
export const setPasswordService = async (token: string, password: string) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await findUserByPasswordTokenRepo(hashedToken);

  if (!user) {
    throw new Error(TOKEN_MESSAGES.INVALID_TOKEN);
  }

  if (user.password) {
    throw new Error(SET_PASSWORD_MESSAGES.ALREADY_SET_PASSWORD);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await updateUserPasswordRepo(user.id, hashedPassword);

  return { message: SET_PASSWORD_MESSAGES.PASSWORD };
};
