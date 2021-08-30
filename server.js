require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(cors())

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => console.log("Mongo connected"))

    app.listen(PORT, () => {
      console.log("Server strated")
    })
  } catch (e) {
    console.log(e)
  }
}

start()
