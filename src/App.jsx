import { useState, Suspense, use } from 'react';
import { preconnect, preload } from 'react-dom';
import { UserProvider, UserContext } from './context/UserContext';
import { Header } from './components/Header';
import { RegistrationForm } from './components/RegistrationForm';
import { ProductList } from './components/ProductList';
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

  const handleReload = () => {
    setCurrentPromise(refreshProductPromise());
  };

  return (
    <div className="app-container">
      <Header />

      <main className="content">
        {!user ? (
          <RegistrationForm />
        ) : (
          <div>
            <div className="catalog-header-actions">
              <button type="button" onClick={handleReload} className="btn-refresh">
                Reload Products (Test Suspense)
              </button>
            </div>

            <ErrorBoundary onRetry={handleReload}>
              <Suspense fallback={<div className="loading-state">Loading products, please wait...</div>}>
                <ProductList productsPromise={currentPromise} />
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
