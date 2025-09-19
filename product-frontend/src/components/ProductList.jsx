function ProductList({ products }) {
  return (
    <div className="mt-4">
      <h5>All Products</h5>
      {products.length === 0 && <p>No products yet.</p>}
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-12 mb-2">
            <div className="card p-2 d-flex justify-content-between flex-row">
              <div>
                <strong>{p.product_name}</strong>
                <div className="small text-muted">{p.description}</div>
              </div>
              <div className="text-end">
                <span className="fw-bold">₹{Number(p.price).toFixed(2)}</span>
                <div className="small text-muted">
                  {new Date(p.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
