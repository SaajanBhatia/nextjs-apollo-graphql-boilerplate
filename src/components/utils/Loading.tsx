import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const FullScreenLoading = ({ message = 'Loading...' }) => {
    return (
        <Flex
            position="fixed" // Use 'fixed' to cover the entire screen
            top="0"
            left="0"
            right="0"
            bottom="0"
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            flexDirection="column" // Stack vertically
            bg="white" // Background color, adjust as needed
            zIndex="overlay" // Ensure it's above other content
        >
            <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500" // Spinner color, adjust as needed
                size="xl" // Spinner size, adjust as needed
            />
            <Text mt={4} color="gray.500" fontSize="lg">{message}</Text>
        </Flex>
    );
};

export default FullScreenLoading;
