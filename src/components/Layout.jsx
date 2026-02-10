import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children, setPage }) {
    return (
        <Box minH="100vh" bg="gray.100">

            <Toaster position="top-right" />

            <Flex
                bg="blue.600"
                color="white"
                px={6}
                py={4}
                justify="space-between"
                align="center"
            >
                <Heading size="md">Production System</Heading>

                <Flex gap={2} wrap="wrap">
                    <Button size="sm" colorScheme="whiteAlpha" onClick={() => setPage("products")}>
                        Products
                    </Button>

                    <Button size="sm" colorScheme="whiteAlpha" onClick={() => setPage("materials")}>
                        Raw Materials
                    </Button>

                    <Button size="sm" colorScheme="whiteAlpha" onClick={() => setPage("relations")}>
                        Relations
                    </Button>

                    <Button size="sm" colorScheme="whiteAlpha" onClick={() => setPage("production")}>
                        Production
                    </Button>
                </Flex>
            </Flex>

            <Box
                maxW="1200px"
                mx="auto"
                p={{ base: 4, md: 6 }}
            >
                {children}
            </Box>

        </Box>
    );
}
