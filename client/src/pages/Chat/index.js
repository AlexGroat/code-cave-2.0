import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MESSAGES } from "../../utils/queries";
import { POST_MESSAGE } from "../../utils/mutations";
import { Flex, Heading } from "@chakra-ui/react";
import './index.css';

import News from "../../components/News";
import Sidebar from "../../components/Sidebar";

export default function Chat() {
    return (
        <div className="home-container" style={{ display: "flex" }}>
        <div
          className="column-1 col-2"
          style={{ position: "relative", zIndex: "1" }}
        >
          <Flex w="100%">
            <Sidebar zIndex='1' />
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
             
            </div>
            <div className="column-3 col-6">
            <Heading mt={3} mb={3}>Tech News</Heading>
              <News />
            </div>
          </div>
        </div>
      </div>
    )
}