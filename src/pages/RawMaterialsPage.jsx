import { useEffect, useState } from "react";
import {
    getRawMaterials,
    createRawMaterial,
    deleteRawMaterial,
    updateRawMaterial
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
    const [editingMaterial, setEditingMaterial] = useState(null);

    function load() {
        getRawMaterials().then(setMaterials);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleSave() {

        const numericStock = Number(stockQuantity);

        if (!name || !stockQuantity) {
            showError("Fill all fields");
            return;
        }

        if (numericStock <= 0) {
            showError("Stock must be greater than zero");
            return;
        }

        try {

            if (editingMaterial) {
                await updateRawMaterial(editingMaterial.id, {
                    name,
                    stockQuantity: numericStock
                });
                showSuccess("Material updated");
            } else {
                await createRawMaterial({
                    name,
                    stockQuantity: numericStock
                });
                showSuccess("Material added");
            }

            setName("");
            setStockQuantity("");
            setEditingMaterial(null);
            setOpen(false);

            load();

        } catch {
            showError("Error saving material");
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

    function handleEdit(material) {
        setEditingMaterial(material);
        setName(material.name);
        setStockQuantity(String(material.stockQuantity));
        setOpen(true);
    }


    return (
        <Box>

            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Raw Materials</Heading>

                <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>

                    <Button colorScheme="blue" onClick={() => setOpen(true)}>
                        New Raw Material
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
                                <Button colorScheme="blue" onClick={handleSave}>
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
                        onEdit={() => handleEdit(m)}
                        onDelete={() => handleDelete(m.id)}
                    />
                ))}
            </SimpleGrid>

        </Box>
    );
}
