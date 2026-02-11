import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../services/api";
import {
    Box,
    Heading,
    SimpleGrid,
    Input,
    Button,
    VStack,
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


export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    function load() {
        getProducts().then(setProducts);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleSave() {

        const numericPrice = Number(price);

        if (!name || !price) {
            showError("Fill all fields");
            return;
        }

        if (numericPrice <= 0) {
            showError("Price must be greater than zero");
            return;
        }

        try {

            if (editingProduct) {
                await updateProduct(editingProduct.id, {
                    name,
                    price: numericPrice
                });
                showSuccess("Product updated");
            } else {
                await createProduct({
                    name,
                    price: numericPrice
                });
                showSuccess("Product added");
            }

            setName("");
            setPrice("");
            setEditingProduct(null);
            setOpen(false);

            load();

        } catch {
            showError("Error saving product");
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

    function handleEdit(product) {
        setEditingProduct(product);
        setName(product.name);
        setPrice(product.price);
        setOpen(true);
    }

    return (
        <Box>

            <Flex justify="space-between" align="center" mb={6}>
                <Heading>Products</Heading>

                <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>

                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            setEditingProduct(null);
                            setName("");
                            setPrice("");
                            setOpen(true);
                        }}
                    >
                        New Product
                    </Button>

                    <DialogBackdrop />

                    <DialogPositioner>

                        <DialogContent>

                            <DialogHeader>
                                <Heading size="md">
                                    {editingProduct ? "Edit Product" : "Create Product"}
                                </Heading>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={3}>
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
                {products.map(p => (
                    <EntityCard
                        key={p.id}
                        title={p.name}
                        subtitle={`$${p.price}`}
                        onEdit={() => handleEdit(p)}
                        onDelete={() => handleDelete(p.id)}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
}
