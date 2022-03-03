import { useQuery } from "@apollo/client";
import React from "react";
import { LinkBox, Box, Heading, Spinner } from "@chakra-ui/react";
import { GET_NEWS } from "../utils/queries";

const NewsBar = () => {
  const { loading, data } = useQuery(GET_NEWS);
  const news = data?.articles || [];
  console.log(news);

  return (
    <div>
      {loading ? (
        <div>
          Loading news <Spinner />
        </div>
      ) : (
        news.slice(0, 6).map((article) => (
          <LinkBox maxW="sm" p="5" borderWidth="1px" rounded="md" mb={2}>
            <div>
              <Heading size="md">{article.author}</Heading>
              <Box>
                <p>{article.title}</p>
              </Box>
              <Box as="a" color="teal.400" href="#" fontWeight="bold">
                 <a href={article.url} target="_blank">Read More Here</a>
              </Box>
            </div>
          </LinkBox>
        ))
      )}
    </div>
  );
};

export default NewsBar;


