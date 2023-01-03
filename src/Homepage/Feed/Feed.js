/** @format */

import React, { useEffect, useState } from "react";
import InputOptions from "../InputOptions/InputOptions";
import CreateIcon from "@mui/icons-material/Create";
import PhotoIcon from "@mui/icons-material/Photo";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventIcon from "@mui/icons-material/Event";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import "./Feed.css";
import Posts from "../Posts/Posts";
import db from "../../firebase";
import { onSnapshot, collection, doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import uuid from "react-uuid";

function Feed() {
  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      console.log(snapshot.docs);
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const sendpost = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "posts", uuid());
    const payload = {
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
    };
    await setDoc(docRef, payload);
    setInput("");
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // useEffect(() => {
  //   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //   if (input.length <= 20) {
  //     setIsButtonDisabled(true);
  //   } else {
  //     setIsButtonDisabled(false);
  //   }
  // }, [isButtonDisabled]);

  return (
    <div className='feed_inputcontainer'>
      <div className='feed_input'>
        <CreateIcon />

        <form>
          <input
            value={input}
            placeholder='Write you post here and press enter for posting'
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value.length > 20) {
                setIsButtonDisabled(true);
              } else {
                setIsButtonDisabled(false);
              }
            }}
            type='text'
          />
          <button onClick={sendpost} disabled={isButtonDisabled} type='submit'>
            Send
          </button>
        </form>
      </div>
      <div className='feed_inputoptions'>
        <InputOptions Icon={PhotoIcon} color='#70B5F9' title='Photo' />
        <InputOptions Icon={SubscriptionsIcon} color='#E7A33E' title='Video' />
        <InputOptions Icon={EventIcon} color='#C0CBCD' title='Event' />
        <InputOptions
          Icon={CalendarTodayIcon}
          color='#75C15E'
          title='Write Article'
        />
      </div>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Posts
          id={id}
          name={name}
          value={id}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  );
}

export default Feed;
