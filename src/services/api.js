const API_URL = "http://localhost:8080";

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
}

export async function getRawMaterials() {
    const res = await fetch(`${API_URL}/raw-materials`);
    return res.json();
}

export async function getProduction() {
    const res = await fetch(`${API_URL}/products/production`);
    return res.json();
}

export async function createProduct(product) {
    return fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
}

export async function deleteProduct(id) {
    return fetch(`${API_URL}/products/${id}`, {
        method: "DELETE"
    });
}

export async function createRawMaterial(material) {
    return fetch(`${API_URL}/raw-materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(material)
    });
}

export async function deleteRawMaterial(id) {
    return fetch(`${API_URL}/raw-materials/${id}`, {
        method: "DELETE"
    });
}

export async function getProductMaterials() {
    return fetch(`${API_URL}/product-materials`).then(r => r.json());
}

export async function createProductMaterial(data) {
    return fetch(`${API_URL}/product-materials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function deleteProductMaterial(id) {
    return fetch(`${API_URL}/product-materials/${id}`, {
        method: "DELETE"
    });
}