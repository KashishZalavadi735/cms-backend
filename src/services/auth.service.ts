import { findUserByEmailRepo, createStudentUserRepo } from "../repository/auth.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse, SignupStudentData } from "../interfaces";
import { AUTH_MESSAGES } from "../constants/messages";

// login
export const loginService = async (email:string, password:string): Promise<LoginResponse> => {
    const user = await findUserByEmailRepo(email);

    if(!user) {
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
            role: user.role.enumValue
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.enumValue
        }
    }
}

// signup only for student
const STUDENT_ROLE_ID = Number(process.env.STUDENT_ROLE_ID);

export const signupService = async (data: SignupStudentData) => {
    const {  name, email, contactNumber, password, branchId, semesterId, yearId } = data;

    const existingUser = await findUserByEmailRepo(email);

    if (existingUser) {
        throw new Error(AUTH_MESSAGES.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

 
    return await createStudentUserRepo({
        ...data,
        password: hashedPassword,
        roleId: STUDENT_ROLE_ID,
    });

}