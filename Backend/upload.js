import multer from "multer";

// const storage = multer.diskStorage({
//     // destination: function (req, file, cb) {
//     //     // Use an absolute path or path relative to the root
//     //     cb(null, path.join(__dirname, 'imagestore'));
//     // },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// export const upload = multer({ storage: storage });

export const upload = multer({ storage: multer.memoryStorage({  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
}}) });


// rm .git/index.lock
