const { Router } = require("express")
const UsersController = require("../controllers/UsersController")
const verifyToken = require("../middlewares/verifyToken")
const fileUploader = require("../middlewares/fileUpload")
const asyncHandler = require("../middlewares/asyncHandler")

const router = Router()

router.put('/:id', [verifyToken, fileUploader.array("userPhoto", 2)], asyncHandler(UsersController.updateUser))
router.delete('/:id', [verifyToken], asyncHandler(UsersController.deleteUser))
router.put('/add_to_friends/:id', [verifyToken], asyncHandler(UsersController.addToFriends))
router.get('/', [verifyToken], asyncHandler(UsersController.getUsers))
router.get('/:id', [verifyToken], asyncHandler(UsersController.getUser))

module.exports = router