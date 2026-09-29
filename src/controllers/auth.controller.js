import { registerUser, loginUser } from "../services/auth.service.js";
import { registerScheme, loginSchema } from "../validators/auth.validator.js";

export const register = async (req, res, next) =>{
try{
    const validatedData = registerScheme.parse(req.body);
    const user = await registerUser(validatedData);

    res.status(201).json({
        success: true,
        message: "USer registered successfully",
        data: user
    });
}catch(error){
    next(error);
}
};

export const login = async (req, res, next) => {
    try{
        const validatedData = loginSchema.parse(req.body);
        const result = await loginUser(validatedData);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result
        });

    }catch(error){
        next(error);
    }
};