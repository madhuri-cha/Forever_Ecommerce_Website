import multer from 'multer'

const storage = multer.diskStorage({

    filename: function(req, file, callback)
    {
        callback(null, file.originalname)
    }
});

const upload = multer({storage});

export default upload






// import multer from 'multer';
// import fs from 'fs';

// const uploadPath = 'uploads/';

// // ✅ Create folder if not exists
// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname);
//     }
// });

// const upload = multer({ storage });

// export default upload;