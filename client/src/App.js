import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

// construct main graphql API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL AP
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
  return (
    <Router>
      <ApolloProvider client={client}>
        <ChakraProvider {...pageProps}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
          <Route exact path="/profiles/:username">
            <Profile />
          </Route>
        </ChakraProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
