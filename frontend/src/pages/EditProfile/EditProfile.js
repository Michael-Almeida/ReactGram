import React from "react";
import "./EditProfile.css";

import { uploads } from "../../utils/config";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { User, message, error, loading } = useSelector((state) => state.user);

  //   states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setImageProfile] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //   load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //   fill form with User data
  useEffect(() => {
    if (User) {
      setName(User.name);
      setEmail(User.email);
      setBio(User.bio);
    }
  }, [User]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    if (bio) {
      formData.append("bio", bio);
    }
    if (password) {
      formData.append("password", password);
    }

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);

    setImageProfile(image);
  };
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adicione uma imagem de perfil e conte mais sobre você...
      </p>
      {(User.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${User.profileImage}`
          }
          alt={User.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Imagem do perfil:</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
