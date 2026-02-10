import { useEffect, useState } from "react";
import {
    getRawMaterials,
    createRawMaterial,
    deleteRawMaterial
} from "../services/api";

import {
    Box,
    Heading,
    Input,
    Button,
    VStack,
    SimpleGrid
} from "@chakra-ui/react";

import EntityCard from "../components/EntityCard";

export default function RawMaterialsPage() {

    const [materials, setMaterials] = useState([]);
    const [name, setName] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    function load() {
        getRawMaterials().then(setMaterials);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {
        await createRawMaterial({
            name,
            stockQuantity
        });

        setName("");
        setStockQuantity("");
        load();
    }

    async function handleDelete(id) {
        await deleteRawMaterial(id);
        load();
    }

    return (
        <Box>
            <Heading mb={4}>Raw Materials</Heading>

            <VStack align="start" mb={6} maxW="300px">
                <Input
                    placeholder="Material name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="Stock quantity"
                    type="number"
                    value={stockQuantity}
                    onChange={e => setStockQuantity(e.target.value)}
                />

                <Button colorScheme="blue" onClick={handleCreate}>
                    Add Material
                </Button>
            </VStack>

            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {materials.map(m => (
                    <EntityCard
                        key={m.id}
                        title={m.name}
                        subtitle={`Stock: ${m.stockQuantity}`}
                        onEdit={() => { }}
                        onDelete={() => handleDelete(m.id)}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}
