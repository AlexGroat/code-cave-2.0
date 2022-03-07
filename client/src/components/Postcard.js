import React from "react";
import { Link } from "react-router-dom";
import { Heading, Text, Divider, Box, Button, Code } from "@chakra-ui/react";

const PostSection = ({ posts = [] }) => {
  return (
    <div>
      {posts.slice(0, 6).map((post) => (
        <>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb={2}
            mt={3}
          >
            <Link to={`/profiles/${post?.postAuthor}`}>
              <Heading ml={1}>{post?.postAuthor}</Heading>
            </Link>
            <Text ml={1}>{post?.createdAt}</Text>
            <Divider />
            <Code mt={2} mb={2} ml={1} fontSize="md">{post?.postText}</Code>
            <Link to={`/posts/${post?._id}`}>
              <Divider />
              <Button
                colorScheme="blue"
                style={{ curser: "pointer" }}
                type="submit"
                mt={2}
              >
                Solve the code here!
              </Button>
            </Link>
          </Box>
        </>
      ))}
    </div>
  );
};

export default PostSection;
