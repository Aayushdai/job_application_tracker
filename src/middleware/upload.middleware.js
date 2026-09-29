import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.resolve("uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, uploadDirectory);
    },
    filename: (req,file,cb)=>{
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random()*1e9)}${extension}`;
        cb(null, filename);
    }
});
export const upload = multer({
    storage
});
