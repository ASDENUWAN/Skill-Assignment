import { useState } from "react";
import { addProduct } from "../services/api";
import AlertMessage from "./AlertMessage";

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    product_name: "",
    price: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!form.product_name.trim()) {
      setError("Product name is required");
      return false;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(form.price)) {
      setError("Price must be a positive number with up to 2 decimals");
      return false;
    }
    if (parseFloat(form.price) <= 0) {
      setError("Price must be greater than 0");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await addProduct(form);
      setSuccess(res.data.message);
      setForm({ product_name: "", price: "", description: "" });
      onProductAdded(res.data.product);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3">
      <h5>Add Product</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Product Name</label>
          <input
            className="form-control"
            value={form.product_name}
            onChange={(e) => setForm({ ...form, product_name: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Price</label>
          <input
            className="form-control"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
      <AlertMessage type="success" message={success} />
      <AlertMessage type="danger" message={error} />
    </div>
  );
}

export default ProductForm;
