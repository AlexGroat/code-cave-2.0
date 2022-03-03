import Sidebar from "../../components/Sidebar";
import { Flex, Heading } from "@chakra-ui/react";
import './index.css';

export default function Home() {
  return (
    <div className="home-container" style={{display: "flex"}}>
      <div className="column-1 col-2" style={{position: 'relative', zIndex: '1'}}>
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
      <div className="column-container">
      <div className="columns" style={{display: 'flex'}}>
      <div className="column-2 col-6">
        <Heading mt={2}>Code Cave</Heading>
      </div>
      <div className="column-3 col-6">
        <Heading mt={2}>News here</Heading>
      </div>
      </div>
      </div>
    </div>
  );
}
