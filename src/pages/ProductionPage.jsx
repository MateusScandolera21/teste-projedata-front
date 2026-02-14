import { useEffect, useState } from "react";
import { getProduction } from "../services/api";

import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Grid
} from "@chakra-ui/react";

export default function ProductionPage() {

    const [data, setData] = useState(null);

    useEffect(() => {
        getProduction()
            .then(setData)
            .catch(err => console.error(err));
    }, []);

    if (!data) return <Text>Carregando...</Text>;

    return (
        <Box>

            <Heading mb={6}>Dashboard de Produção</Heading>

            <Grid gap={6}>

                <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={6}
                    bg="blue.50"
                >
                    <Text fontSize="sm" color="gray.600">
                        Valor Total de Produção
                    </Text>

                    <Heading size="lg">
                        ${data.totalValue}
                    </Heading>
                </Box>

                <SimpleGrid
                    columns={{ base: 1, md: 2, xl: 3 }}
                    spacing={4}
                >
                    {data.products.map(p => (
                        <Box
                            key={p.id}
                            borderWidth="1px"
                            borderRadius="md"
                            p={4}
                            boxShadow="sm"
                            bg="white"
                        >
                            <Heading size="sm" mb={2}>
                                {p.name}
                            </Heading>

                            <Text fontSize="sm" color="gray.600">
                                Quantidade: {p.quantity}
                            </Text>

                            <Text fontSize="sm" color="gray.600">
                                Preço: ${p.price}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

            </Grid>

        </Box>
    );
}
