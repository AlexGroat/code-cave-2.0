import { useQuery } from "@apollo/client";
import React from "react";
import { LinkBox, Box, Text, Spinner } from "@chakra-ui/react";
import { GET_NEWS } from '../utils/queries';

const NewsBar = () => {
    const { loading, data } = useQuery(GET_NEWS);
    const news = data?.articles || [];
    console.log(news);

    return (
        <div>
        
        {loading ? (
          <div>Loading news <Spinner /></div>
        ) : (
          news.slice(0, 6).map((article) => (
            <LinkBox maxW='sm' p='5' borderWidth='1px' rounded='md' mb={2}>
              <div>
                <Box>
                  <p >{article.title}</p>
                </Box>
                <span className="read-more">
                  Read more{" "}
                  <a href={article.url} target="_blank" style={{textDecoration: 'none'}}>
                    here
                  </a>
                </span>
              </div>
            </LinkBox>
          ))
        )}
      </div>
    )
}

export default NewsBar;