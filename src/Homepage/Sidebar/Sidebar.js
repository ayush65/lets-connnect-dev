/** @format */

import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Sidebar() {
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className='sidebar__recentitem'>
      <span className='sidebar_hash'># </span>
      <p> {topic}</p>
    </div>
  );
  // JSON.parse(localStorage.getItem("wishlistObj") || "[]")
  const [userDataArray] = useState(
    JSON.parse(localStorage.getItem("userObj") || "[]")
  );

  //userObj

  // useEffect(() => {
  //   const str = localStorage.getItem("userObj");

  //   const parsedObj = JSON.parse(str);

  //   setUserDataArray(parsedObj);
  // }, []);

  console.log("hi", userDataArray);

  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        {userDataArray.length > 0 ? (
          <img src={userDataArray[0].backgroundImage} alt='' />
        ) : (
          <img
            src='https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlua2VkaW4lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80 '
            alt=''
          />
        )}
        <div>
          {userDataArray.length > 0 ? (
            <img
              src={userDataArray[0].img}
              alt=''
              className='user-img-sidebar'
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <Avatar src={user.photoUrl} className='side_bar'>
              {user.email[0]}
            </Avatar>
          )}
        </div>
        {userDataArray.length ? <h2>{userDataArray[0].username}</h2> : null}
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className='sidebar_stats'>
        <div className='sidebar_stat'>
          <p>Who Viewed you</p>
          <p className='para'>2,525</p>
        </div>
        <div className='sidebar_stat'>
          <p>Views on posts</p>
          <p className='para'>5,525</p>
        </div>
      </div>
      <div className='sidebar__bottom'>
        <p>Recent</p>
        {recentItem("React.js")}
        {recentItem("Java")}
        {recentItem("Frontend")}
        {recentItem("Design")}
        {recentItem("Software Engineering")}
      </div>
    </div>
  );
}

export default Sidebar;
