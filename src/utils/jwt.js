import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (user) => {
    
    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        env.jwt.secret,
        {
            expiresIn: env.jwt.expiresIn
        }
    );
    console.log("Generated token parts:", accessToken.split(".").length);
    console.log("Generated token length:", accessToken.length);
    return accessToken;
    
};