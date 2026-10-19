import { use } from 'react';
import { ProductCard } from './ProductCard';

export function ProductList({ productsPromise, onSelectProduct }) {
  const products = use(productsPromise);

  return (
    <div className="product-list-section">
      {/* React 19 Document Metadata */}
      <title>Mini E-Commerce Store – Products</title>
      <meta name="description" content="Browse our collection of modern electronics, smart cameras, and accessories" />

      <h2>Electronics Catalog</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
}
