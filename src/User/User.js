/** @format */

import React, { useEffect, useState } from "react";
import "./User.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { AiFillEdit } from "react-icons/ai";

function User() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("username") || true)
  );

  useEffect(() => {
    const str = localStorage.getItem("username");

    const parsedObj = JSON.parse(str);

    console.log(parsedObj);

    setUser(parsedObj);
  }, [user]);

  const [arrayOfObject, setArrayOfObject] = useState(
    JSON.parse(localStorage.getItem("userObj") || "[]")
  );
  const [baseImage, setBaseImage] = useState("");
  const [bio, setBio] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [username, setUsername] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    console.log(base64);
    if (file.size > 1e6) {
      window.alert("Please upload a file smaller than 1 MB");
      return setBaseImage("");
    }

    console.log(base64);
  };
  const uploadImage1 = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBackgroundImage(base64);
    console.log(base64);
    if (file.size > 1e6) {
      window.alert("Please upload a file smaller than 1 MB");
      return setBaseImage("");
    }

    console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmitClick = () => {
    if (baseImage === "" || bio === "" || pnumber === "") {
      window.alert("pleae provide proper details");
      return false;
    }

    setArrayOfObject([
      {
        username: username,
        pnumber: pnumber,
        backgroundImage: backgroundImage,
        img: baseImage,
        bio: bio,
      },
    ]);

    setBaseImage("");
    setBio("");
    setPnumber("");
    setBackgroundImage("");
    setUsername("");

    //console.log(arrayOfObject);
  };

  const [userDataArray, setUserDataArray] = useState([]);

  useEffect(() => {
    const jsonObj = JSON.stringify(arrayOfObject);

    localStorage.setItem("userObj", jsonObj);

    const str = localStorage.getItem("userObj");

    const parsedObj = JSON.parse(str);

    setUserDataArray(parsedObj);
  }, [arrayOfObject]);

  console.log(userDataArray);

  return (
    <div>
      <div className='user-content-container'>
        <div className='userData-container'>
          <button onClick={onOpenModal} className='btn-primary'>
            <AiFillEdit />
          </button>
          {userDataArray.length > 0 ? (
            <img
              src={userDataArray[0].backgroundImage}
              alt=''
              className='img-backcover'
            />
          ) : (
            <img
              src='https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg'
              alt=''
              className='img-backcover'
            />
          )}
          {userDataArray.length > 0 ? (
            <img src={userDataArray[0].img} alt='' className='img-user' />
          ) : (
            <img
              src='https://media.tenor.com/XdFv1bbfOdEAAAAd/user-icons.gif'
              alt=''
              className='img-user'
            />
          )}
          <div className='account-content-container'>
            <p>Username</p>
            {userDataArray.length > 0 ? (
              <p>{userDataArray[0].username}</p>
            ) : (
              <p>{username}</p>
            )}
          </div>{" "}
          <div className='account-content-container'>
            <p>Bio</p>
            {userDataArray.length > 0 ? (
              <p>{userDataArray[0].bio}</p>
            ) : (
              <p>Edit Bio</p>
            )}
          </div>
          <div className='account-content-container'>
            <p>Phone Number</p>
            {userDataArray.length > 0 ? (
              <p>+91 {userDataArray[0].pnumber}</p>
            ) : (
              <p>Edit Number</p>
            )}
          </div>{" "}
          <Modal open={open} onClose={onCloseModal} center>
            <div>
              {" "}
              <h4>Profile image</h4>
              <input
                type='file'
                accept='image/png, image/jpeg'
                onChange={(e) => {
                  uploadImage(e);
                }}
                className='button-43'
              />
            </div>
            <div className='account-img-container'>
              {" "}
              <img src={baseImage} alt='' className='account-baseimg' />
            </div>

            <h4>background image</h4>
            <input
              type='file'
              accept='image/png, image/jpeg'
              onChange={(e) => {
                uploadImage1(e);
              }}
              className='button-43'
            />

            <div className='account-img-container'>
              {" "}
              <img src={backgroundImage} alt='' className='account-backimg' />
            </div>
            <input
              type='text'
              placeholder='Username'
              className='address-modal-input modal-content modal-bio'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type='text'
              placeholder='Bio'
              className='t modal-content modal-bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <input
              type='number'
              placeholder='Phone Number'
              className='address-modal-input modal-bio modal-content'
              value={pnumber}
              onChange={(e) => setPnumber(e.target.value)}
            />
            <div className='account-img-container'>
              <button
                className='button-43'
                onClick={() => {
                  onSubmitClick();
                  onCloseModal();
                }}>
                Submit
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default User;
