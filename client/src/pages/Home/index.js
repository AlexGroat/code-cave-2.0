import Sidebar from "../../components/Sidebar";
import { Flex, Heading, Input } from "@chakra-ui/react";
import "./index.css";
import News from "../../components/News";
import PostForm from '../../components/PostForm'
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import PostSection from "../../components/PostSection";

export default function Home() {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];
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
            <Heading mt={3}>Code Cave</Heading>
            <PostForm />
            <PostSection
            posts={posts} />
          </div>
          <div className="column-3 col-6">
          <Heading mt={3} mb={3}>Tech News</Heading>
            <News />
          </div>
        </div>
      </div>
    </div>
  );
}
