import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";
import { Button, Heading, Text, Textarea } from "@chakra-ui/react";

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
    <div>
      {Auth.loggedIn() ? (
        <>
          <Heading mt={2} size="md">
            Post your code below!
          </Heading>
          <Text
            mt={2}
            className={`${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
          </Text>
          <div>
            <form onSubmit={handleFormSubmit}>
              <Textarea
                mt={2}
                name="postText"
                placeholder="Post your code here"
                value={postText}
                onChange={handleChange}
              ></Textarea>
              <Button
                colorScheme="blue"
                style={{ curser: "pointer" }}
                mt={1}
                type="submit"
              >
                Post
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div>
          <Text mt={3}> New to Code Cave or a returning coder?</Text>
          <Text>
            <Link to="/signup">
              <Button colorScheme="blue" style={{ curser: "pointer" }}>
                Signup
              </Button>
            </Link>{" "}
            
            <Link to="/login">
              <Button colorScheme="blue" style={{ curser: "pointer" }}> 
                Login
              </Button>
            </Link>
          </Text>
        </div>
      )}
    </div>
  );
};

export default PostForm;
