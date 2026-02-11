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
    SimpleGrid,
    Flex
} from "@chakra-ui/react";

import {
    DialogRoot,
    DialogTrigger,
    DialogBackdrop,
    DialogPositioner,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter
} from "@chakra-ui/react";

import EntityCard from "../components/EntityCard";
import { showError, showSuccess } from "../components/toast";

export default function RawMaterialsPage() {

    const [materials, setMaterials] = useState([]);
    const [name, setName] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [open, setOpen] = useState(false);

    function load() {
        getRawMaterials().then(setMaterials);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {

        const numericStock = Number(stockQuantity);

        if (!name || !stockQuantity) {
            showError("Fill all fields");
            return;
        }

        if (numericStock <= 0) {
            showError("Stock cannot be less than or equal to zero");
            return;
        }

        try {
            await createRawMaterial({
                name,
                stockQuantity: numericStock
            });

            showSuccess("Stock added");

            setName("");
            setStockQuantity("");

            setOpen(false);

            load();
        }
        catch {
            showError("Error adding stock");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteRawMaterial(id);
            showSuccess("Stock removed");
            load();
        }
        catch {
            showError("Error removing stock");
        }
    }

    return (
        <Box>

            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Raw Materials</Heading>

                <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>

                    <Button colorScheme="blue" onClick={() => setOpen(true)}>
                        New Product
                    </Button>

                    <DialogBackdrop />

                    <DialogPositioner>

                        <DialogContent>

                            <DialogHeader>
                                <Heading size="md">Create Raw Material</Heading>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={3}>
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
                                </VStack>
                            </DialogBody>

                            <DialogFooter>
                                <Button colorScheme="blue" onClick={handleCreate}>
                                    Save
                                </Button>
                            </DialogFooter>

                        </DialogContent>

                    </DialogPositioner>

                </DialogRoot>

            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
                {materials.map(m => (
                    <EntityCard
                        key={m.id}
                        title={m.name}
                        subtitle={`Stock: ${m.stockQuantity}`}
                        onDelete={() => handleDelete(m.id)}
                    />
                ))}
            </SimpleGrid>

        </Box>
    );
}
