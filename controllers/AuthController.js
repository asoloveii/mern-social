const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")

class AuthController {
  async register(req, res, next) {
    const { email, firstname, lastname, password, age, desc } = req.body
    const profilePic = req.file.originalname

    const candidate = await User.findOne({ email })

    if (candidate) {
      return next(new ErrorResponse('User with current email already exists', 400))
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = new User({
      email, name: { firstname, lastname }, password: hashedPass, age, desc, photo: { profilePic, coverPic: "" }
    })

    await user.save()

    res.status(201).json({
      success: true,
      message: "User has been created"
    })
  }

  async login(req, res, next) {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }

    const isPassValid = await bcrypt.compare(req.body.password, user.password)

    if (!isPassValid) {
      return next(new ErrorResponse('Password incorrect', 400))
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    const { password, ...data } = user._doc

    res.status(200).json({
      success: true,
      token,
      user: data
    })
  }
}

module.exports = new AuthController