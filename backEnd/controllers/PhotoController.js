const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Insert a photo, with an user a releted it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //   Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //   if photo created sucessfully
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente mais tarde"],
    });
    return;
  }
  res.status(201).json(newPhoto);
};

// Remove a photo from Db
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);
    console.log(photo);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não localizada"] });
    }
    //   check if photo belongs to user

    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreum um erro tente novamente mais tarde"] });
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, mesagee: "Foto excluída com sucesso" });
  } catch (error) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort([["createdAt", -1]]);
  res.status(200).json(photos);
};

module.exports = { insertPhoto, deletePhoto, getAllPhotos };
