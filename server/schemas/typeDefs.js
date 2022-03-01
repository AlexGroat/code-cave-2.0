const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
    
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  
  }

  type Article {
    title: String
    url: String
  }

  type Message {
    _id: ID!
    user: String!
    content: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
    articles: [Article]
    messages: [Message]

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    likePost(postId: ID!) : Post
    postMessage(user: String!, content: String!) : ID!
  }
`;

module.exports = typeDefs;
