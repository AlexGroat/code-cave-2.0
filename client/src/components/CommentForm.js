import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Heading, Textarea, Text, Button } from "@chakra-ui/react";

import { ADD_COMMENT } from "../utils/mutations";

import Auth from "../utils/auth";

// pass post ID as props
const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCommentCount(value.length);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Text
            className={`${commentCount === 280 || error ? "text-danger" : ""}`}
          >
            Comment Count: {commentCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </Text>

          <form onSubmit={handleFormSubmit}>
            <Textarea
              mt={2}
              name="commentText"
              placeholder="Solve here"
              value={commentText}
              onChange={handleChange}
            ></Textarea>
            <Button
              colorScheme="blue"
              style={{ curser: "pointer" }}
              mt={1}
              type="submit"
            >
              Solve
            </Button>
          </form>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default CommentForm;
