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
            showError("Preencha todos os campos");
            return;
        }

        if (numericStock <= 0) {
            showError("Quantidade em estoque deve ser maior que zero");
            return;
        }

        try {

            if (editingMaterial) {
                await updateRawMaterial(editingMaterial.id, {
                    name,
                    stockQuantity: numericStock
                });
                showSuccess("Material atualizado");
            } else {
                await createRawMaterial({
                    name,
                    stockQuantity: numericStock
                });
                showSuccess("Material adicionado");
            }

            setName("");
            setStockQuantity("");
            setEditingMaterial(null);
            setOpen(false);

            load();

        } catch (error) {
            showError("Erro ao salvar material");
        }
    }


    async function handleDelete(id) {
        try {
            await deleteRawMaterial(id);
            showSuccess("Material removido");
            load();
        }
        catch (error) {
            showError("Erro ao remover material, ele pode estar relacionado a um produto");
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
                <Heading>Matérias-Primas</Heading>

                <DialogRoot open={open} onOpenChange={(e) => setOpen(e.open)}>

                    <Button colorScheme="blue" onClick={() => setOpen(true)}>
                        Nova Matéria-Prima
                    </Button>

                    <DialogBackdrop />

                    <DialogPositioner>

                        <DialogContent>

                            <DialogHeader>
                                <Heading size="md">Criar Matéria-Prima</Heading>
                            </DialogHeader>

                            <DialogBody>
                                <VStack gap={3}>
                                    <Input
                                        placeholder="Nome do Material"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />

                                    <Input
                                        placeholder="Quantidade em Estoque"
                                        type="number"
                                        value={stockQuantity}
                                        onChange={e => setStockQuantity(e.target.value)}
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
