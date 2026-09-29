import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateAccessToken } from "../utils/jwt.js";

export const registerUser = async ({name, email, password}) => {

    const exitingUser = await User.findOne({ where: { email } });
    if(exitingUser) {
        throw new Error("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
       email,
        password: hashedPassword,
        created_at: new Date(),
        updated_at : new Date()
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

export const loginUser = async ({ email, password}) =>{
    const user = await User.findOne({
        where: {email}
    });

    if(!user){
        throw new Error("Invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );
    if(!passwordMatch){
        throw new Error("Invalid email or password");
    }
    const accessToken = generateAccessToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        accessToken
        };
};

