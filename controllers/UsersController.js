const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")

class UsersController {
  async updateUser(req, res, next) {
    if (req.user.id === req.params.id) {
      const { email, firstname, lastname, age, desc } = req.body
      const profilePic = req.files[0].originalname
      const coverPic = req.files[1].originalname

      const user = await User.findByIdAndUpdate(req.user.id, {
        $set: { email, name: { firstname, lastname }, age, desc, photo: { profilePic, coverPic } }
      }, { new: true })

      await user.save()

      const { password, ...data } = user._doc

      res.status(200).json({
        success: true,
        user: data
      })
    } else {
      return next(new ErrorResponse("You can update only your profile", 400))
    }
  }

  async deleteUser(req, res, next) {
    if (req.user.id === req.params.id) {
      await User.findByIdAndDelete(req.user.id)

      res.status(200).json({
        success: true,
        message: "User has been deleted"
      })
    } else {
      return next(new ErrorResponse("You can delete only your profile", 400))
    }
  }

  async addToFriends(req, res, next) {
    if (req.user.id === req.body.userId) {
      const currentUser = req.user
      const friend = await User.findById(req.params.id)

      if (!friend) {
        return next(new ErrorResponse("User not found", 404))
      }

      if (!currentUser.friends.includes(friend._id)) {
        await currentUser.friends.push(friend.id)
        await friend.friends.push(currentUser.id)
      } else {
        await currentUser.friends.pull(friend.id)
        await friend.friends.pull(currentUser.id)
      }

      await currentUser.save()
      await friend.save()

      res.status(200).json({
        success: true,
        message: "You have new friend"
      })
    } else {
      return next(new ErrorResponse("You can't add to frinds", 400))
    }
  }

  async getUsers(req, res, next) {
    if (req.user) {
      const users = await User.find()

      res.status(200).json({
        success: true,
        users
      })
    } else {
      return next(new ErrorResponse("You are authorized"))
    }
  }

  async getUser(req, res, next) {
    if (req.user) {
      const user = await User.findById(req.params.id)
      const { password, ...data } = user._doc

      res.status(200).json({
        success: true,
        user: data
      })
    } else {
      return next(new ErrorResponse("You are not authorized!", 400))
    }
  }
}

module.exports = new UsersController