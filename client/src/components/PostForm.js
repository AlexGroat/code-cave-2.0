import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS } from "../../utils/queries";

const PostForm = () => {
    const [postText, setPostText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
  
    const [addPost, { error }] = useMutation(ADD_POST, {
      update(cache, { data: { addPost } }) {
        try {
          const { posts } = cache.readQuery({ query: QUERY_POSTS });
  
          cache.writeQuery({
            query: QUERY_POSTS,
            data: { posts: [addPost, ...posts] },
          });
        } catch (err) {
          console.error(err);
        }
      },
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addPost({
          variables: {
            postText,
            postAuthor: Auth.getProfile().data.username,
          },
        });
  
        setPostText("");
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === "postText" && value.length <= 280) {
        setPostText(value);
        setCharacterCount(value.length);
      }
    };
  
    return (
     <></>
    );
  };
  
  export default PostForm;