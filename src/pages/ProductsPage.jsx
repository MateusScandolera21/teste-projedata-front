import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "../services/api";
import {
    Box,
    Heading,
    SimpleGrid,
    Input,
    Button,
    VStack,
    Grid
} from "@chakra-ui/react";

import EntityCard from "../components/EntityCard";
import { showSuccess, showError } from "../components/toast";


export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    function load() {
        getProducts().then(setProducts);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleCreate() {
        if (!name || !price) {
            showError("Fill all fields");
            return;
        }

        if (price <= 0) {
            showError("The price cannot be less than or equal to zero.");
            return;
        }

        try {
            await createProduct({ name, price });
            showSuccess("Product added successfully");
            setName("");
            setPrice("");
            load();
        } catch {
            showError("Error adding product");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteProduct(id);
            showSuccess("Product removed");
            load();
        } catch {
            showError("Cannot delete this product");
        }
    }

    return (
        <Box>

            <Heading mb={6}>Products</Heading>

            <Grid
                templateColumns={{ base: "1fr", md: "300px 1fr" }}
                gap={6}
                alignItems="start"
            >
                <Box
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    bg="gray.50"
                    position={{ md: "sticky" }}
                    top={{ md: "20px" }}
                >
                    <VStack align="stretch" gap={3}>
                        <Input
                            placeholder="Product name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Price"
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />

                        <Button colorScheme="blue" onClick={handleCreate}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>

                <SimpleGrid
                    columns={{ base: 1, md: 2, xl: 3 }}
                    spacing={4}
                >
                    {products.map(p => (
                        <EntityCard
                            key={p.id}
                            title={p.name}
                            subtitle={`$${p.price}`}
                            onEdit={() => { }}
                            onDelete={() => handleDelete(p.id)}
                        />
                    ))}
                </SimpleGrid>

            </Grid>

        </Box>
    );
}
