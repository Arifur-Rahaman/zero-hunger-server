const express = require('express');
const multer  = require('multer');
const protect = require('../middleware/authMiddleware')
const {uploadFoodImage} = require('../controllers/uploadController')

const upload = multer();
const uploadRouter = express.Router();

uploadRouter.post('/', upload.single('file'), uploadFoodImage)

module.exports = uploadRouter