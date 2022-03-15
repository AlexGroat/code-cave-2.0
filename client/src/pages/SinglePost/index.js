import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_POST } from '../../utils/queries';
import { Heading } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";

const SinglePost = () => {
    // use useparams() to retrieve value of the route parameter postId in app.js

    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        // pass url parameter
        variables: { postId: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <Heading>Retrieving Post<Spinner size='xs'/></Heading>
    }

    return (
        <></>
    )
}

export default SinglePost;