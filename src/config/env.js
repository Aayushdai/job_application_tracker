import dotenv from "dotenv";
dotenv.config();
const env = {
    port: process.env.PORT || 5000,
    db: {
        // Database configuration
        host: process.env.DB_HOST ,
        user: process.env.DB_USER ,
        password: process.env.DB_PASSWORD, 
        port: process.env.DB_PORT ,
        name: process.env.DB_NAME 
    },
    jwt: {
        secret: process.env.JWT_SECRET ,
        expiresIn: process.env.JWT_EXPIRES_IN ,
        refreshSecret: process.env.JWT_REFRESH_SECRET ,
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN 
    }
};
export default env;