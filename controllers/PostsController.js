const Comment = require("../models/Comment")
const Post = require("../models/Post")
const ErrorResponse = require("../utils/errorResponse")

class PostsController {
  async createPost(req, res, next) {
    if (req.user.id === req.body.author) {
      const { desc } = req.body
      const picture = req.file.originalname

      const post = new Post({ author: req.user.id, desc, picture })

      await post.save()

      res.status(201).json({
        success: true,
        post
      })
    } else {
      return next(new ErrorResponse("You can't create post", 400))
    }
  }

  async updatePost(req, res, next) {
    if (req.user.id === req.body.author) {
      const picture = req.file.originalname

      const post = await Post.findByIdAndUpdate(req.params.id, {
        $set: { desc: req.body.desc, picture }
      }, { new: true })

      await post.save()

      res.status(200).json({
        success: true,
        post
      })
    } else {
      return next(new ErrorResponse("You can't udate post", 400))
    }
  }

  async deletePost(req, res, next) {
    if (req.user.id === req.body.author) {

      await Post.findByIdAndDelete(req.params.id)

      res.status(200).json({
        success: true,
        message: "Post has deleted"
      })
    } else {
      return next(new ErrorResponse("You can't delete post", 400))
    }
  }

  async getPost(req, res, next) {
    if (req.user) {
      const post = await Post.findById(req.params.id)

      res.status(200).json({
        success: true,
        post
      })
    } else {
      return next(new ErrorResponse("You can't get post", 400))
    }
  }

  async getPosts(req, res, next) {
    if (req.user) {
      const posts = await Post.find()

      res.status(200).json({
        success: true,
        posts
      })
    } else {
      return next(new ErrorResponse("You can't get posts", 400))
    }
  }

  async likePost(req, res, next) {
    if (req.user) {
      const post = await Post.findById(req.params.id)

      if (!post.likes.includes(req.user._id)) {
        post.likes.push(req.user._id)
      } else {
        post.likes.pull(req.user._id)
      }

      await post.save()

      res.status(200).json({
        success: true,
        message: "Poat has been liked"
      })
    } else {
      return next(new ErrorResponse("You can't like posts", 400))
    }
  }

  async commentPost(req, res, next) {
    if (req.user) {
      const { desc } = req.body
      const post = await Post.findById(req.params.id)

      const comment = new Comment({ author: req.user.id, desc })
      await comment.save()

      post.comments.push(comment._id)

      res.status(201).json({
        success: true,
        comment
      })
    } else {
      return next(new ErrorResponse("You can't like posts", 400))
    }
  }

  async getCommentsPost(req, res, next) {
    if (req.user) {
      const { postId } = req.params.id
      const comments = await Comment.find({ postId })

      res.status(200).json({
        success: true,
        comments
      })
    }
  }

  async updateCommentPost(req, res, next) {
    if (req.user) {
      const { commentId } = req.params.id
      const comment = await Comment.findById(commentId)

      if (req.user._id === comment.author) {
        const { desc } = req.body

        comment.desc = desc
        await comment.save()

        res.status(200).json({
          success: true,
          comment
        })
      }
    }
  }

  async deleteCommentPost(req, res, next) {
    if (req.user) {
      const { commentId } = req.params.id
      const comment = await Comment.findById(commentId)

      if (req.user._id === comment.author) {
        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({
          success: true
        })
      }
    }
  }
}

module.exports = new PostsController