import { products } from '../data/products';

export function fetchProducts() {
  return new Promise((resolve) => {
    // 2.5 second delay to comfortably observe and screenshot the Suspense loading state
    setTimeout(() => {
      resolve(products);
    }, 2500);
  });
}

// Created outside rendering so React 19 use() does not trigger infinite fetches
export let productPromise = fetchProducts();

export function refreshProductPromise() {
  productPromise = fetchProducts();
  return productPromise;
}
