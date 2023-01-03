/** @format */

import React from "react";
import "../Homepage/Posts/Posts";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import "../Homepage/Posts/Posts";
import "./Likedposts.css";
import { doc, deleteDoc } from "firebase/firestore";

import db from "../firebase";

function LikedPosts({ value, name, description, message }) {
  const handleDeleteLikedPosts = async (idle) => {
    const docRef = doc(db, "liked", idle);
    await deleteDoc(docRef);
  };

  return (
    <div className='posts-data'>
      <div className=''>
        <div className='post__info'>
          <Avatar />
          <p>{description}</p>
        </div>
        <div className='post_body-liked '>
          <p>{message}</p>
        </div>

        <div className='post__buttons-liked'>
          <div
            className='inputoptions'
            onClick={() => handleDeleteLikedPosts(value)}>
            <DeleteIcon className='icon-color' />
            <h4>Delete</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LikedPosts;
