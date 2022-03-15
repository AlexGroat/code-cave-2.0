import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_POST } from "../../utils/queries";
import {
  Button,
  Flex,
  Heading,
  Text,
  Box,
  Divider,
  Spinner,
  Code,
} from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";
import News from "../../components/News";
import CommentForm from "../../components/CommentForm";
import Comments from "../../components/Comments";

const SinglePost = () => {
  // use useparams() to retrieve value of the route parameter postId in app.js

  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass url parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return (
      <Heading>
        Retrieving Post
        <Spinner size="xs" />
      </Heading>
    );
  }

  return (
    <div className="home-container" style={{ display: "flex" }}>
      <div
        className="column-1 col-2"
        style={{ position: "relative", zIndex: "1" }}
      >
        <Flex w="100%">
          <Sidebar zIndex="1" />
          <Flex
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          ></Flex>
        </Flex>
      </div>
      <div className="column-container">
        <div className="columns" style={{ display: "flex" }}>
          <div className="column-2 col-6">
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              mb={2}
              mt={5}
            >
              <Link to={`/profiles/${post?.postAuthor}`}>
                <Heading ml={1}>{post?.postAuthor}</Heading>
              </Link>

              <Text ml={1}>{post?.createdAt}</Text>
              <Divider />
              <Code mt={2} mb={2} ml={1} fontSize="md">
                {post?.postText}
              </Code>
              <CommentForm postId={post._id} />
              <Divider />
            </Box>
            <Comments comments={post.comments} />
          </div>
          <div className="column-3 col-6">
            <Heading mt={3} mb={3}>
              Tech News
            </Heading>
            <News />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
