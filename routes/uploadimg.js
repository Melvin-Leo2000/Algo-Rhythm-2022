const router = require('express').Router()
const uploadImage = require('../middleware/uploadimage')
const imageCtrl = require("../controllers/imageCtrl")


router.post('/upload_image', uploadImage, imageCtrl.picture)

module.exports = router