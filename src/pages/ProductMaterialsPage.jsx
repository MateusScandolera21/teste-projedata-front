import { useEffect, useState } from "react";
import {
    getProductMaterials,
    createProductMaterial,
    deleteProductMaterial,
    getProducts,
    getRawMaterials
} from "../services/api";

import {
    Box,
    Heading,
    Button,
    VStack,
    SimpleGrid,
    Input,
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
import { showSuccess, showError } from "../components/toast";

export default function ProductMaterialsPage() {

    const [relations, setRelations] = useState([]);
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [productId, setProductId] = useState("");
    const [rawMaterialId, setRawMaterialId] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState("");
    const [open, setOpen] = useState(false);
    
    function load() {
        getProductMaterials().then(setRelations);
        getProducts().then(setProducts);
        getRawMaterials().then(setMaterials);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {

        const numericQty = Number(requiredQuantity);

        if (!productId || !rawMaterialId || !requiredQuantity) {
            showError("Fill all fields");
            return;
        }

        if (numericQty <= 0) {
            showError("Quantity must be greater than zero");
            return;
        }

        try {
            await createProductMaterial({
                productId,
                rawMaterialId,
                requiredQuantity: numericQty
            });

            showSuccess("Relation added");

            setRequiredQuantity("");
            setOpen(false);

            load();
        } catch {
            showError("Error adding relation");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteProductMaterial(id);
            showSuccess("Relation removed");
            load();
        } catch {
            showError("Error removing relation");
        }
    }

    return (
        <Box>

            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Product Materials</Heading>

                <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>

                    <Button colorScheme="blue" onClick={() => setOpen(true)}>
                        New Product
                    </Button>

                    <DialogBackdrop />

                    <DialogPositioner>

                        <DialogContent>

                            <DialogHeader>
                                <Heading size="md">Create Relation</Heading>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={3}>

                                    <select
                                        value={productId}
                                        onChange={e => setProductId(e.target.value)}
                                        style={{
                                            padding: "8px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                            width: "100%"
                                        }}
                                    >
                                        <option value="">Select product</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={rawMaterialId}
                                        onChange={e => setRawMaterialId(e.target.value)}
                                        style={{
                                            padding: "8px",
                                            borderRadius: "6px",
                                            border: "1px solid #ccc",
                                            width: "100%"
                                        }}
                                    >
                                        <option value="">Select raw material</option>
                                        {materials.map(m => (
                                            <option key={m.id} value={m.id}>
                                                {m.name}
                                            </option>
                                        ))}
                                    </select>

                                    <Input
                                        placeholder="Required quantity"
                                        type="number"
                                        value={requiredQuantity}
                                        onChange={e => setRequiredQuantity(e.target.value)}
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
                {relations.map(r => (
                    <EntityCard
                        key={r.id}
                        title={r.product?.name || "Product"}
                        subtitle={`${r.rawMaterial?.name} - Qty: ${r.requiredQuantity}`}
                        onDelete={() => handleDelete(r.id)}
                    />
                ))}
            </SimpleGrid>

        </Box>
    );
}
