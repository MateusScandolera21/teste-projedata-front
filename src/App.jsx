import { useState } from "react";
import Layout from "./components/Layout";
import ProductsPage from "./pages/ProductsPage";
import RawMaterialsPage from "./pages/RawMaterialsPage";
import ProductionPage from "./pages/ProductionPage";
import ProductMaterialsPage from "./pages/ProductMaterialsPage";

export default function App() {

  const [page, setPage] = useState("production");

  function renderPage() {
    switch (page) {
      case "products":
        return <ProductsPage />;
      case "materials":
        return <RawMaterialsPage />;
      case "relations":
        return <ProductMaterialsPage />;
      default:
        return <ProductionPage />;
    }
  }

  return (
    <Layout setPage={setPage}>
      {renderPage()}
    </Layout>
  );
}
