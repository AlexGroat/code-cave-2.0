import React from "react";
import { Box, Code, Divider, Heading, Text } from "@chakra-ui/react";

const Comments = ({ comments = [] }) => {
  return (
    <>
      <Heading size="md">Comments</Heading>

      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                mt={3}
                mb={2}
              >
                <Heading size="md">
                  {comment.commentAuthor} commented{" "}
                  <span style={{ fontSize: "0.825rem" }}>
                    on {comment.createdAt}
                  </span>
                </Heading>
                <Divider />
                <Code mt={3}>{comment.commentText}</Code>
              </Box>
            </div>
          ))}
      </div>
    </>
  );
};

export default Comments;
