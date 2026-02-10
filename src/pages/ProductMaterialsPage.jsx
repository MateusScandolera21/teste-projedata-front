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
    Grid
} from "@chakra-ui/react";

import EntityCard from "../components/EntityCard";

export default function ProductMaterialsPage() {

    const [relations, setRelations] = useState([]);
    const [products, setProducts] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [productId, setProductId] = useState("");
    const [rawMaterialId, setRawMaterialId] = useState("");
    const [requiredQuantity, setRequiredQuantity] = useState("");

    function load() {
        getProductMaterials().then(setRelations);
        getProducts().then(setProducts);
        getRawMaterials().then(setMaterials);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {
        await createProductMaterial({
            productId,
            rawMaterialId,
            requiredQuantity
        });

        setRequiredQuantity("");
        load();
    }

    async function handleDelete(id) {
        await deleteProductMaterial(id);
        load();
    }

    return (
        <Box>

            <Heading mb={6}>Product Materials</Heading>

            {/* 🔥 GRID RESPONSIVO */}
            <Grid
                templateColumns={{ base: "1fr", md: "320px 1fr" }}
                gap={6}
                alignItems="start"
            >

                {/* 🧾 FORM PANEL LATERAL */}
                <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    bg="gray.50"
                    position={{ md: "sticky" }}
                    top={{ md: "20px" }}
                >
                    <VStack align="stretch" gap={3}>

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

                        <Button colorScheme="blue" onClick={handleCreate}>
                            Add Relation
                        </Button>

                    </VStack>
                </Box>

                {/* 🧩 CARDS GRID */}
                <SimpleGrid
                    columns={{ base: 1, md: 2, xl: 3 }}
                    spacing={4}
                >
                    {relations.map(r => (
                        <EntityCard
                            key={r.id}
                            title={r.product?.name || "Product"}
                            subtitle={`${r.rawMaterial?.name} - Qty: ${r.requiredQuantity}`}
                            onEdit={() => { }}
                            onDelete={() => handleDelete(r.id)}
                        />
                    ))}
                </SimpleGrid>

            </Grid>

        </Box>
    );
}
