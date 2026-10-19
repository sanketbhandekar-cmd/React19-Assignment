export function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-desc">{product.description}</p>
        <button
          type="button"
          onClick={() => onSelect(product)}
          className="btn-view-details"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
