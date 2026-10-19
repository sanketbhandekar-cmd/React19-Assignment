export function ProductSkeleton() {
  return (
    <div className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton-media shimmer"></div>
      <div className="product-content">
        <div className="skeleton-line shimmer line-sm"></div>
        <div className="skeleton-line shimmer line-lg"></div>
        <div className="skeleton-line shimmer line-md"></div>
        <div className="skeleton-line shimmer line-btn"></div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 6 }) {
  return (
    <div className="skeleton-grid-wrapper" aria-label="Loading products catalog...">
      <div className="skeleton-header shimmer">
        <div className="skeleton-pill"></div>
        <div className="skeleton-pill"></div>
      </div>
      <div className="product-grid">
        {Array.from({ length: count }).map((_, idx) => (
          <ProductSkeleton key={`skeleton-${idx}`} />
        ))}
      </div>
    </div>
  );
}
