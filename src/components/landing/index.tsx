'use client'

import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import Link from 'next/link'

const LUXURIO_IMAGE_URL = 'https://mcaleer-rushe.co.uk/site/wp-content/uploads/2020/05/Luxurio-Loughborough-I.jpg'

export default function LandingHeroSection() {

    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={
                `url(${LUXURIO_IMAGE_URL})`
            }
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({ base: 4, md: 8 })}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
                    <Text
                        color={'white'}
                        fontWeight={900}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
                        Welcome to the Luxurio Booking System
                    </Text>
                    <Stack direction={'row'}>
                        <Link href={'/signin'}>
                            <Button
                                bg={'blue.400'}
                                rounded={'full'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}>
                                Sign In
                            </Button>
                        </Link>
                        <Link href={'/signup'}>
                            <Button
                                bg={'whiteAlpha.300'}
                                rounded={'full'}
                                color={'white'}
                                _hover={{ bg: 'whiteAlpha.500' }}>
                                Sign Up
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </VStack>
        </Flex>
    )
}