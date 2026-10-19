# Mini E-Commerce Store (React 19 - Task 1 & Task 2)

This project is a simple e-commerce application built with React 19 and Vite demonstrating React 19 features for Task 1 and Task 2.

---

## Task 1 Features

### 1. How `use()` is Implemented
* In `src/services/productApi.js`, we create `productPromise` that fetches mock product data.
* We create this Promise outside the component so it does not recreate on every render.
* In `src/components/ProductList.jsx`, we read the data directly using `const products = use(productsPromise);`.
* React pauses rendering until the Promise resolves.
* We also use `use(UserContext)` to read user data from Context.

---

### 2. How `<Suspense>` is Used
* In `src/App.jsx`, we wrap `<ProductList>` inside `<Suspense>`.
* While `use(productPromise)` is waiting for data, `<Suspense>` shows: `"Loading products, please wait..."`.
* An `<ErrorBoundary>` wraps the Suspense boundary to catch errors and show a retry button.

---

### 3. How `useActionState()` is Used
* In `src/components/RegistrationForm.jsx`, we use `const [state, formAction] = useActionState(registerAction, null);`.
* We pass `formAction` to `<form action={formAction}>` without using `onSubmit`.
* `registerAction` validates name, email, and password, and returns errors or the user object.

---

### 4. How `useFormStatus()` is Used
* In `src/components/SubmitButton.jsx`, we use `const { pending } = useFormStatus();`.
* When the form is submitting, `pending` becomes `true`.
* The button disables automatically and changes text to `"Registering..."`.

---

### 5. How Context is Implemented Using React 19 Syntax
* In `src/context/UserContext.jsx`, we use `<UserContext value={{ user, setUser, logout }}>`.
* In React 19, the `.Provider` wrapper is no longer required.
* The header component (`src/components/UserProfile.jsx`) reads this context and displays `"Logged in as: [Name] ([Email])"`.

---

### 6. Which Asset Loading APIs Were Selected and Why
In `src/App.jsx`, we use:
* **`preconnect('https://images.unsplash.com')`**: Establishes early connection to Unsplash to load product images faster.
* **`preload('https://images.unsplash.com/...', { as: 'image' })`**: Downloads the first product image in advance before rendering.

---

### 7. How Document Metadata is Implemented
* React 19 natively hoists `<title>` and `<meta>` tags rendered inside components directly into the HTML `<head>`.
* Used in `RegistrationForm.jsx`, `ProductList.jsx`, and `ProductDetails.jsx`.

---

## Task 2 Features

### 8. Add to Cart with `useOptimistic()`
* In `src/components/ProductDetails.jsx`, we use:
  ```jsx
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartCount,
    (current, amount) => current + amount
  );
  ```
* When the user clicks "Add to Cart", `setOptimisticCart(1)` runs inside `startTransition` to update the count immediately on screen.
* While the 1.5-second API request is pending, it displays `(Updating...)`.
* If the request succeeds, the real `cartCount` state updates.
* Similarly, clicking "Remove from Cart" runs `setOptimisticCart(-1)` inside `startTransition` to immediately decrement the count, with automatic rollback if offline or failed.
* If the request fails (e.g. network offline), React automatically rolls back the optimistic count to the real count.

---

### 9. Ref as a Prop (No `forwardRef`)
* In React 19, functional components accept `ref` directly as a regular prop without needing `forwardRef()`.
* In `src/components/ProductSpecs.jsx`:
  ```jsx
  export function ProductSpecs({ product, ref }) {
    return (
      <div ref={ref} className="product-specs-section">
        <h3>Product Specifications</h3>
        ...
      </div>
    );
  }
  ```
* In `src/components/ProductDetails.jsx`, we pass `specsRef` directly to `<ProductSpecs ref={specsRef} product={product} />`.
* Clicking the "View Specifications ↓" button reveals the specifications section and smoothly scrolls down to it using `specsRef.current?.scrollIntoView({ behavior: 'smooth' })`.

---

### 10. Ref Cleanup Function
* React 19 allows callback refs to return a cleanup function.
* In `src/components/ProductDetails.jsx`, the image container uses a callback ref:
  ```jsx
  ref={(element) => {
    if (!element) return;
    const onEnter = () => setHoverStatus('Image preview active');
    const onLeave = () => setHoverStatus('Hover over the image to inspect');

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);

    // React 19 ref cleanup function
    return () => {
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
    };
  }}
  ```
* When the element is removed from the DOM, React automatically invokes the returned cleanup function to prevent memory leaks.

---

### 11. Server & Client Components (Conceptual)
* **Why Product Details can be a Server Component**:
  * It fetches product data directly on the server from a database or API.
  * It only renders static information (title, price, image, description) and does not need browser APIs or state.
  * Rendering it on the server reduces JavaScript sent to the client and improves SEO.
* **Why Add to Cart needs to remain a Client Component**:
  * It needs interactivity and browser event handlers (`onClick`).
  * It manages UI state and pending transitions using `useState`, `useTransition`, and `useOptimistic`.
* **How Server and Client Components work together**:
  * The Server Component fetches product details and renders the layout.
  * It imports and embeds the Client Component (like `<AddToCartButton />`) to handle the interactive cart actions.

---

### 12. React Compiler
* **What React Compiler does**:
  * It is a build-time optimization tool that automatically memoizes components, values, and functions.
  * It reduces the need for manual `useMemo()`, `useCallback()`, and `React.memo()`.
* **How it could optimize this application**:
  * It automatically detects which parts of the component depend on changing state and skips re-rendering unchanged parts.
* **Example from this application**:
  * In `ProductDetails.jsx`, when `cartCount` updates or the user types in the input, the static product details (image, title, description) would normally re-render.
  * React Compiler automatically memoizes the static product JSX and function handlers so only the changed cart counter re-renders.
