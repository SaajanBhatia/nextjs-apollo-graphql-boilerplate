'use client'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import { FormEvent } from 'react'

type SignInProps = {
    username: string,
    password: string,
    updateUsername: React.Dispatch<React.SetStateAction<string>>,
    updatePassword: React.Dispatch<React.SetStateAction<string>>,
    handleSignIn: (e: FormEvent) => Promise<void>
}

export default function SimpleCard(props: SignInProps) {
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to use <Box as="span" color={'blue.400'}>Lux Booking System</Box> ✌️
                    </Text>
                </Stack>
                <form onSubmit={props.handleSignIn}>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder='john@email.com'
                                    value={props.username}
                                    onChange={e => props.updateUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>LUX ID</FormLabel>
                                <Input
                                    type="text"
                                    value={props.password}
                                    placeholder={'LUX'}
                                    onChange={e => props.updatePassword(e.target.value)}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    {/* <Checkbox>Remember me</Checkbox>
                                    <Text color={'blue.400'}>Forgot password?</Text> */}
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    type={'submit'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </form>
            </Stack>
        </Flex>
    )
}