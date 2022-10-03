import ImportData from '../../RESTApi/adminControllers/importData'

const express = require('express')
const multer = require('multer')
const upload = multer()

const router = express.Router()

router.post('/importData', upload.single('uploadFile'), ImportData)

export default router
