import multer from "multer";
import path from "path";
import fs from "fs";


const uploadPath = path.join(
    process.cwd(),
    "uploads/profile"
);


// create folder if not exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, {
        recursive: true
    });
}



const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadPath
        );

    },


    filename: (req, file, cb) => {

        const uniqueName =
            `${Date.now()}-${Math.round(Math.random() * 1000000000)}${path.extname(file.originalname)}`;


        cb(
            null,
            uniqueName
        );

    }

});



export const uploadProfile =
    multer({
        storage
    });