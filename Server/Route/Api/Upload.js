const expres = require('express')
const route = expres.Router()
const multer = require('multer')
const path = require('path')
const fileFilter = (req, file, cb) => {

    const allwedTypes = ["image/jpeg", "image/png"]
    if (!allwedTypes.includes(file.mimetype)) {
        const error = new Error("Desteklenmeyen Dosya Türü")
        error.code = "LIMIT_FILE_TYPES"
        return cb(error, false);
    }
    cb(null, true)
}
const storage = multer.diskStorage({
    destination: './Upload/Product/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({
    dest: './Upload/Product/',
    fileFilter,
    storage: storage,
    limits: {
        fileSize: 100000000
    }
})
// @router POST  api/Category
// @desc Create a Category
// @access Public
route.post('/UploadImage', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send(req.file)
})
route.post("/SendImage", async (req, res) => {
    const { ProfilePicture } = req.body;
    var filePath = path.dirname("../../Upload/" + ProfilePicture);
    res.sendFile(filePath);
});




module.exports = route