// React 19: ref is accepted directly as a prop without forwardRef()
export function ProductSpecs({ product, ref }) {
  return (
    <div ref={ref} className="product-specs-section">
      <h3 className="specs-heading">Product Specifications</h3>
      <table className="specs-table">
        <tbody>
          <tr>
            <td className="specs-label">Category</td>
            <td className="specs-value">{product.category}</td>
          </tr>
          <tr>
            <td className="specs-label">Model SKU</td>
            <td className="specs-value">SKU-EL-{product.id}08</td>
          </tr>
          <tr>
            <td className="specs-label">Warranty</td>
            <td className="specs-value">1 Year Limited Warranty</td>
          </tr>
          <tr>
            <td className="specs-label">Delivery</td>
            <td className="specs-value">Free Shipping (3–5 business days)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
