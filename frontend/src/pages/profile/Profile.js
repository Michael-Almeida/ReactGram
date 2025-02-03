import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { User, loading } = useSelector((state) => state.user);
  const { User: userAuth } = useSelector((state) => state.auth);

  //   New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch]);

  const submitHandle = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {User.profileImage && (
          <img src={`${uploads}/users/${User.profileImage}`} alt={User.name} />
        )}

        <div className="profile-description">
          <h2>{User.name}</h2>
          <p>{User.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}></div>
          <h3>Compartilhe algum momento seu:</h3>
          <form onSubmit={submitHandle}>
            <label>
              <span>Título para a foto:</span>
              <input type="text" placeholder="Insira um título" />
            </label>
            <label>
              <span>Imagen:</span>
              <input type="file" />
            </label>
            <input type="submit" value="Postar" />
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
