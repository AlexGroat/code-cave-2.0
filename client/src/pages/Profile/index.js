import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";
import PostForm from "../../components/PostForm";
import PostSection from "../../components/PostSection";
import News from "../../components/News";

import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";

const Profile = () => {
  const { username: currentUser } = useParams();

  const { loading, data } = useQuery(currentUser ? QUERY_USER : QUERY_ME, {
    variables: { username: currentUser },
  });

  const user = data?.user || {};

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
            <Heading mt={2} mb={9}>
              Welcome to {currentUser ? `${user.username}'s` : "your"} profile.
            </Heading>
            {Auth.loggedIn() ? (
              <div>
                <PostSection posts={user.posts} />
              </div>
            ) : (
              <>
                <Text mt={4}>
                  Please{" "}
                  <Link to="/login">
                    <Button
                      colorScheme="blue"
                      style={{ curser: "pointer" }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Link>{" "}
                  to view {user.username}'s posts.
                </Text>
                <Text mt={3}>
                  New to Code Cave?{" "}
                  <Link to="/signup">
                    <Button
                      colorScheme="blue"
                      style={{ curser: "pointer" }}
                      type="submit"
                    >
                      Signup
                    </Button>
                  </Link>
                </Text>
              </>
            )}
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

export default Profile;
