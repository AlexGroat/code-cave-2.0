import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  Button,
  Flex,
  Alert,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const [addUser, { error, data }] = useMutation(ADD_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div>
        <div>
          {data ? (
            <p>
              Success!
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form
              className="signup-form"
              background={formBackground}
              onSubmit={handleFormSubmit}
            >
              <Flex height="100vh" alignItems="center" justifyContent="center">
                <Flex
                  direction="column"
                  background={formBackground}
                  p={12}
                  rounded={6}
                >
                  <Input
                    className="signupInput"
                    placeholder="Your username"
                    mb={3}
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <Input
                    className="signupInput"
                    placeholder="Email"
                    mb={3}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <Input
                    className="passwordInput"
                    placeholder="Password"
                    mb={3}
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <Button mb={3} colorScheme="blue" style={{ curser: "pointer" }} type="submit">
                    Signup
                  </Button>

                  <Button onClick={toggleColorMode}>
                    Toggle Theme
                  </Button>
                </Flex>
              </Flex>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
