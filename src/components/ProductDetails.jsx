import { useState, useRef, useTransition, useOptimistic } from 'react';
import { ProductSpecs } from './ProductSpecs';

export function ProductDetails({
  product,
  onBack,
  cartCount,
  onAddToCart,
  onRemoveFromCart,
}) {
  const [isPending, startTransition] = useTransition();
  const [actionError, setActionError] = useState(null);
  const [hoverStatus, setHoverStatus] = useState('Hover over the image to inspect');
  const [showSpecs, setShowSpecs] = useState(false);

  // React 19 useOptimistic: updates the count immediately while async request is pending
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartCount,
    (current, amount) => Math.max(0, current + amount)
  );

  // React 19 Ref as a Prop: specs section ref passed to ProductSpecs without forwardRef()
  const specsRef = useRef(null);

  const handleToggleSpecs = () => {
    if (!showSpecs) {
      setShowSpecs(true);
      setTimeout(() => {
        specsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setShowSpecs(false);
    }
  };

  const handleAddToCartClick = () => {
    setActionError(null);

    startTransition(async () => {
      // 1. Immediately update UI optimistically
      setOptimisticCart(1);

      try {
        // 2. Perform async API request
        await onAddToCart();
      } catch (err) {
        // 4. Handle failure: React automatically rolls back optimisticCart to cartCount
        setActionError(err.message || 'Failed to add item to cart.');
      }
    });
  };

  const handleRemoveFromCartClick = () => {
    if (optimisticCart <= 0) return;
    setActionError(null);

    startTransition(async () => {
      // 1. Immediately update UI optimistically
      setOptimisticCart(-1);

      try {
        // 2. Perform async API request
        await onRemoveFromCart();
      } catch (err) {
        // 4. Handle failure: React automatically rolls back optimisticCart to cartCount
        setActionError(err.message || 'Failed to remove item from cart.');
      }
    });
  };

  return (
    <div className="product-details-container">
      {/* React 19 Document Metadata */}
      <title>{`Mini E-Commerce Store – ${product.name}`}</title>
      <meta name="description" content={product.description} />

      <button type="button" onClick={onBack} className="btn-back">
        &larr; Back to Products
      </button>

      <div className="product-details-content">
        <div className="details-media-column">
          {/* React 19 Ref Cleanup Function: attaches event listeners and returns cleanup function */}
          <div
            className="details-image-box"
            ref={(element) => {
              if (!element) return;

              const onEnter = () => setHoverStatus('Image preview active');
              const onLeave = () => setHoverStatus('Hover over the image to inspect');

              element.addEventListener('mouseenter', onEnter);
              element.addEventListener('mouseleave', onLeave);

              // React 19 cleanup function returned directly from callback ref
              return () => {
                element.removeEventListener('mouseenter', onEnter);
                element.removeEventListener('mouseleave', onLeave);
              };
            }}
          >
            <img src={product.image} alt={product.name} className="details-image" />
          </div>
          <p className="ref-cleanup-indicator">{hoverStatus}</p>
        </div>

        <div className="details-info-column">
          <span className="product-category">{product.category}</span>
          <h2 className="details-title">{product.name}</h2>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-desc">{product.description}</p>

          <div className="details-nav-row">
            <button
              type="button"
              onClick={handleToggleSpecs}
              className="btn-scroll-link"
            >
              {showSpecs ? 'Hide Specifications ↑' : 'View Specifications ↓'}
            </button>
          </div>

          <hr className="divider" />

          {/* Task 2: Add & Remove Cart with useOptimistic() */}
          <div className="optimistic-cart-section">
            <div className="cart-counter-display">
              <span>Cart Count: </span>
              <strong>{optimisticCart}</strong>
              {isPending && <span className="updating-tag"> (Updating...)</span>}
            </div>

            {actionError && (
              <div className="error-text alert-cart-error">
                {actionError} (Rollback to actual count)
              </div>
            )}

            <div className="cart-actions-row">
              <button
                type="button"
                onClick={handleAddToCartClick}
                disabled={isPending}
                className="btn-add-cart"
              >
                {isPending ? 'Updating...' : 'Add to Cart'}
              </button>

              <button
                type="button"
                onClick={handleRemoveFromCartClick}
                disabled={isPending || optimisticCart <= 0}
                className="btn-remove-cart"
              >
                Remove from Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task 2: Ref as a Prop demonstration - ProductSpecs receives ref directly */}
      {showSpecs && (
        <>
          <hr className="divider section-divider" />
          <ProductSpecs ref={specsRef} product={product} />
        </>
      )}
    </div>
  );
}
