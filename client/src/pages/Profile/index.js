import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import PostForm from "../../components/PostForm";
import PostSection from "../../components/PostSection";

import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";

const Profile = () => {
  const { username: currentUser } = useParams();

  const { loading, data } = useQuery(currentUser ? QUERY_USER : QUERY_ME, {
    variables: { username: currentUser },
  });

  const user = data?.user || {};

  return (
      <div>Hello</div>
  )
};

export default Profile;