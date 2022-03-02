import Sidebar from "../../components/Sidebar";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="home-container" style={{display: "flex"}}>
      <div className="column-1 col-2">
        <Flex w="100%">
          <Sidebar />
          <Flex
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          ></Flex>
        </Flex>
      </div>
      <div className="column-2 col-5">
        <Heading mt={2}>Code Cave</Heading>
      </div>
      <div className="column-3 col-5" >
        <Heading mt={2}>News here</Heading>
      </div>
    </div>
  );
}
