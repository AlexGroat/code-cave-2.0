import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  Button,
  Flex,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
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
                  <Button
                    mb={3}
                    colorScheme="blue"
                    style={{ curser: "pointer" }}
                    type="submit"
                  >
                    Login
                  </Button>

                  <Button onClick={toggleColorMode}>Toggle Theme</Button>
                </Flex>
              </Flex>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

