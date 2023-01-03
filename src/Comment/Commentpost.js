/** @format */

import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import db from "../firebase";

function Commentpost({ message, value }) {
  const handleDeleteBookmarkedPosts = async (value) => {
    const docRef = doc(db, "comment", value);
    await deleteDoc(docRef);
  };

  return (
    <div className='posts-data comment-data'>
      <div className='liked-post-container'>
        <div className=' liked-posts'>
          <div className='post_body message-body'>
            <p>{message}</p>
          </div>
          <div className='post__buttons'>
            <div
              className='inputoptions  delete-button'
              onClick={() => handleDeleteBookmarkedPosts(value)}>
              <DeleteIcon className='icon-color' />
              <h4>Delete</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commentpost;
