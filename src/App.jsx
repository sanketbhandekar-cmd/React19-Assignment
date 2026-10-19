import { useState, Suspense, use } from 'react';
import { preconnect, preload } from 'react-dom';
import { UserProvider, UserContext } from './context/UserContext';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { ErrorBoundary } from './components/ErrorBoundary';
import { productPromise, refreshProductPromise } from './services/productApi';
import './App.css';

// React 19 Asset Loading APIs
preconnect('https://images.unsplash.com');
preload('https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', {
  as: 'image',
});

function MainApp() {
  const { user } = use(UserContext);
  const [currentPromise, setCurrentPromise] = useState(productPromise);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const handleReload = () => {
    setCurrentPromise(refreshProductPromise());
  };

  // Simulated asynchronous API request for adding to cart
  const handleAddToCart = async () => {
    if (!navigator.onLine) {
      throw new Error('Network offline: Failed to add item to cart.');
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!navigator.onLine) {
      throw new Error('Network disconnected during request.');
    }

    setCartCount((prev) => prev + 1);
  };

  // Simulated asynchronous API request for removing from cart
  const handleRemoveFromCart = async () => {
    if (!navigator.onLine) {
      throw new Error('Network offline: Failed to remove item from cart.');
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!navigator.onLine) {
      throw new Error('Network disconnected during request.');
    }

    setCartCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="app-container">
      <Header cartCount={cartCount} />

      <main className="content">
        {!user ? (
          <RegistrationForm />
        ) : selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        ) : (
          <div>
            <div className="catalog-header-actions">
              <button type="button" onClick={handleReload} className="btn-refresh">
                Reload Products (Test Suspense)
              </button>
            </div>

            <ErrorBoundary onRetry={handleReload}>
              <Suspense fallback={<div className="loading-state">Loading products, please wait...</div>}>
                <ProductList
                  productsPromise={currentPromise}
                  onSelectProduct={setSelectedProduct}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <MainApp />
    </UserProvider>
  );
}
