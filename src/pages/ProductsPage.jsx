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
            showError("Preencha todos os campos");
            return;
        }

        if (numericPrice <= 0) {
            showError("Preço deve ser maior que zero");
            return;
        }

        try {

            if (editingProduct) {
                await updateProduct(editingProduct.id, {
                    name,
                    price: numericPrice
                });
                showSuccess("Produto atualizado");
            } else {
                await createProduct({
                    name,
                    price: numericPrice
                });
                showSuccess("Produto adicionado");
            }

            setName("");
            setPrice("");
            setEditingProduct(null);
            setOpen(false);

            load();

        } catch (error) {
            showError("Erro ao salvar produto");
        }
    }


    async function handleDelete(id) {
        try {
            await deleteProduct(id);
            showSuccess("Produto removido");
            load();
        } catch (error) {
            showError("Não é possível remover este produto, ele pode estar relacionado a uma produção");
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
                <Heading>Produtos</Heading>

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
                        Novo Produto
                    </Button>

                    <DialogBackdrop />

                    <DialogPositioner>

                        <DialogContent>

                            <DialogHeader>
                                <Heading size="md">
                                    {editingProduct ? "Editar Produto" : "Criar Produto"}
                                </Heading>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={3}>
                                    <Input
                                        placeholder="Nome do Produto"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />

                                    <Input
                                        placeholder="Preço"
                                        type="number"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </VStack>
                            </DialogBody>

                            <DialogFooter>
                                <Button colorScheme="blue" onClick={handleSave}>
                                    Salvar
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
