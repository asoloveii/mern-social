const { Router } = require("express")
const asyncHandler = require("../middlewares/asyncHandler")
const AuthController = require("../controllers/AuthController")
const fileUploader = require("../middlewares/fileUpload")

const router = Router()

router.post('/register', [fileUploader.single('profilePic')], asyncHandler(AuthController.register))
router.post('/login', asyncHandler(AuthController.login))

module.exports = router