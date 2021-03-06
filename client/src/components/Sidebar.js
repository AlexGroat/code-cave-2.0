import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import {
  Button,
  Flex,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useColorMode,
  useColorModeValue,
  Switch,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  FiMenu,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiUserPlus,
  FiUser,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import NavItem from "./NavItem";

export default function Sidebar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { colorMode,toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const { username: currentUser } = useParams();

  const { loading, data } = useQuery(currentUser ? QUERY_USER : QUERY_ME, {
    variables: { username: currentUser },
  });

  const user = data?.me || data?.user || {};
  const [navSize, changeNavSize] = useState("small");
  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <Link to="/">
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Dashboard"
            description="This is the description for the dashboard."
          />
        </Link>
        {Auth.loggedIn() ? (
          <>
            <Link to={`/profiles/${user.username}`}>
              <NavItem navSize={navSize} icon={FiUser} title="Profile" />
            </Link>

            <Link to="/chat">
              <NavItem navSize={navSize} icon={FiMail} title="Chatroom" />
            </Link>

            <Link to="/" onClick={logout}>
              <NavItem navSize={navSize} icon={FiLogOut} title="Logout" />
            </Link>

            <Flex
              p="5%"
              flexDir="column"
              w="100%"
              alignItems={navSize == "small" ? "center" : "flex-start"}
              mb={4}
            >
              <Divider display={navSize == "small" ? "none" : "flex"} />
              <Flex mt={4} align="center">
                <Avatar size="sm" src="avatar-1.jpg" />
                <Flex
                  flexDir="column"
                  ml={4}
                  display={navSize == "small" ? "none" : "flex"}
                >
                  <Heading as="h3" size="sm">
                    Welcome, {Auth.getProfile().data.username}
                  </Heading>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <>
            <Link to="/login">
              <NavItem navSize={navSize} icon={FiLogIn} title="Login" />
            </Link>
            <Link to="/Signup">
              <NavItem navSize={navSize} icon={FiUserPlus} title="Signup" />
            </Link>
          </>
        )}
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "center" : "flex"} />
        <Flex mt={4} align="center">
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "center" : "flex"}
          >
            <IconButton
              icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
            ></IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
