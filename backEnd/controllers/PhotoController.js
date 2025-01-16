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
      errors: ["Houve um erro, por favor tente mais tarde."],
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

const gettUserPhotos = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  return res.status(200).json(photo);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  if (!photo.userId.equals(reqUser.id)) {
    return res
      .status(422)
      .json({ errors: ["Foto não localizada para este usuário"] });
  }

  if (title) {
    photo.title = title;

    await photo.save();

    return res.status(200).json(photo);
  }
};

// LIike a photo
const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  //  check if user already liked photo
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu essa foto"] });
  }

  //  add user to likes
  photo.likes.push(reqUser._id);

  photo.save();

  return res.json({
    photoId: id,
    userId: reqUser._id,
    message: "A foto foi curtida",
  });
};

// Comment photo
const comentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.coments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "O comentário foi adicionado com sucesso",
  });
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  gettUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  comentPhoto,
  searchPhotos,
};
