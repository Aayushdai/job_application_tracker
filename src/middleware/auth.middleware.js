import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const authenticate =(req,res, next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                success: false,
                message: "Authentication token required"

            });

        }
        const token = authHeader.split(" ")[1];
console.log({
    hasAuthHeader: !!authHeader,
    startsWithBearer: authHeader?.startsWith("Bearer "),
    tokenLength: token?.length,
    tokenParts: token?.split(".").length
});
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }
        const decoded = jwt.verify(token, env.jwt.secret);
        req.user = decoded;
        next();
    
}catch(error){
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
    });
}
}
