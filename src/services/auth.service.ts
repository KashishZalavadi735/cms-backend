import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUserByEmailRepo,
  createStudentUserRepo,
} from "../repository/auth.repository";
import { LoginResponse, SignupStudentData } from "../interfaces";
import { AUTH_MESSAGES, EMAIL_MESSAGES } from "../constants/messages";
import { generateUserCode } from "../utils/generateUserCode";

// Login
export const loginService = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const user = await findUserByEmailRepo(email);

  if (!user || !user.password) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error(AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.enumValue,
      branchId: user.branch?.id,
      branchLabel: user.branch?.enumValue,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.enumValue,
    },
  };
};

// Signup only for student
const STUDENT_ROLE_ID = Number(process.env.STUDENT_ROLE_ID);

export const signupService = async (
  data: SignupStudentData & { statusId: number },
) => {
  const existingUser = await findUserByEmailRepo(data.email);

  if (existingUser) {
    throw new Error(EMAIL_MESSAGES.EMAIL_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const code = await generateUserCode(STUDENT_ROLE_ID);

  return await createStudentUserRepo({
    ...data,
    password: hashedPassword,
    roleId: STUDENT_ROLE_ID,
    statusId: data.statusId,
    code,
  });
};
