import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react';

function LoginPage () {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700")
    return (
    <Flex height="100vh" alignItems="center" justifyContent="center">   
        <Flex direction="column" background={formBackground} p={12} rounded={6}>
            <Heading mb={6}>Log in</Heading>
            <Input placeholder="Email" variant="outline" mb={3} type="email"/>
            <Input placeholder='********' variant='outline'  type='password'/>
            <Button mb={6} colorScheme="blue">Log In</Button>
            <Button onClick={toggleColorMode}>Toggle Theme</Button>

        </Flex>
    </Flex>
    )
};

export default LoginPage