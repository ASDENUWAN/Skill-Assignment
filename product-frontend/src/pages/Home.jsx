import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  const handleProductAdded = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Product Catalogue</h2>
      <div className="row">
        <div className="col-md-5">
          <ProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="col-md-7">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default Home;
