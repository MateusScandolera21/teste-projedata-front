import { Box, Text, Button, HStack } from "@chakra-ui/react";

export default function EntityCard({ title, subtitle, onEdit, onDelete }) {
    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            p={4}
            w="250px"
            boxShadow="sm"
        >
            <Text fontWeight="bold">{title}</Text>
            <Text fontSize="sm" color="gray.600" mb={3}>
                {subtitle}
            </Text>

            <HStack spacing={2}>
                <Button size="sm" colorScheme="blue" onClick={onEdit}>
                    Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={onDelete}>
                    Delete
                </Button>
            </HStack>
        </Box>
    );
}