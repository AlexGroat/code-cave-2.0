import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react';

function SignupPage() {
    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue("gray.100", "gray.700")
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Signup</Heading>
                <Input placeholder="Username" variant="outline" mb={3} type="username" name='username' />
                <Input placeholder="Email" variant="outline" mb={3} type="email" name='email' />
                <Input placeholder='********' variant='outline' mb={6} type='password' />
                <Button mb={6} colorScheme="blue">Signup</Button>
                <Button onClick={toggleColorMode}>Toggle Theme</Button>

            </Flex>
        </Flex>
    )
};

export default SignupPage