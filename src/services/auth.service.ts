import { findUserByEmailRepo, createStudentUserRepo } from "../repository/auth.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// login
export const loginService = async (email:string, password:string) => {
    const user = await findUserByEmailRepo(email);

    if(!user) return { status: false, message: "Invalid email or password" };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return { status: false, message: "Invalid email or password" }
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
        status: true,
        message: "Login successful!",
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
const STUDENT_ROLE_ID = 4;
interface SignupData {
    name: string;
    email: string; 
    contactNumber: string;
    password: string;
    branchId: number; 
    semesterId: number; 
    yearId: number;
}

export const signupService = async (data: SignupData) => {
    const {  name, email, contactNumber, password, branchId, semesterId, yearId } = data;

    const existingUser = await findUserByEmailRepo(email);

    if (existingUser) {
        return {
            status: false,
            message: "Email already registered"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createStudent = {
        name,
        email,
        contactNumber,
        password: hashedPassword,
        roleId: STUDENT_ROLE_ID,
        branchId,
        semesterId,
        yearId
    };

    const student = await createStudentUserRepo(createStudent);

    return {
        status: true,
        message: "Student registered successfully!",
        user: student,
        role: "Student"
    };
}