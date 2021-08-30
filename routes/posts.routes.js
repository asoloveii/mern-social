const { Router } = require('express')
const verifyToken = require('../middlewares/verifyToken')
const asyncHandler = require('../middlewares/asyncHandler')
const fileUploader = require('../middlewares/fileUpload')
const PostsController = require('../controllers/PostsController')

const router = Router()

router.post('/', [verifyToken, fileUploader.single("Picture")], asyncHandler(PostsController.createPost))
router.put('/:id', [verifyToken, fileUploader.single("Picture")], asyncHandler(PostsController.updatePost))
router.delete('/:id', [verifyToken], asyncHandler(PostsController.deletePost))
router.get('/:id', [verifyToken], asyncHandler(PostsController.getPost))
router.get('/', [verifyToken], asyncHandler(PostsController.getPosts))
router.put('/like/:id', [verifyToken], asyncHandler(PostsController.likePost))
router.put('/comment/:id', [verifyToken], asyncHandler(PostsController.commentPost))

module.exports = router