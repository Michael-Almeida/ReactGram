const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = newSchema(
  {
    image: String,
    title: String,
    likes: Array,
    coments: Array,
    userId: mongoose.ObjectId,
    userName: Sting,
  },
  {
    timestamps: true,
  }
);

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
