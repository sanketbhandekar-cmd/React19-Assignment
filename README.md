# Mini E-Commerce Store (React 19 - Task 1)

This project is a simple e-commerce application built with React 19 and Vite to demonstrate key React 19 features.

---

### 1. How `use()` is Implemented
* In `src/services/productApi.js`, we create a `productPromise` that fetches mock product data.
* We create this Promise outside the component so it does not get recreated on every render.
* In `src/components/ProductList.jsx`, we read the data directly using `const products = use(productsPromise);`.
* React pauses rendering of the component until the Promise is resolved.
* We also use `use(UserContext)` in components to read user data from Context.

---

### 2. How `<Suspense>` is Used
* In `src/App.jsx`, we wrap `<ProductList>` inside `<Suspense>`.
* While `use(productPromise)` is waiting for data, `<Suspense>` displays the fallback text: `"Loading products, please wait..."`.
* We also wrap it with an `<ErrorBoundary>` to show a friendly error message and a retry button if loading fails.

---

### 3. How `useActionState()` is Used
* In `src/components/RegistrationForm.jsx`, we use `const [state, formAction] = useActionState(registerAction, null);`.
* We pass `formAction` to the form using `<form action={formAction}>` instead of using `onSubmit`.
* The `registerAction` function checks that:
  * Name is at least 3 characters.
  * Email is valid.
  * Password is at least 6 characters.
* It simulates a network delay using `setTimeout()` and returns either error messages or the registered user object.

---

### 4. How `useFormStatus()` is Used
* In `src/components/SubmitButton.jsx`, we import `useFormStatus` from `react-dom`.
* Inside the button component, `const { pending } = useFormStatus();` gets the current status of the parent form.
* When the form is submitting, `pending` becomes `true`.
* The button automatically disables itself and changes its text from `"Register"` to `"Registering..."`.

---

### 5. How Context is Implemented Using React 19 Syntax
* In `src/context/UserContext.jsx`, we create the context using `createContext(null)`.
* In React 19, we no longer need `<UserContext.Provider>`. Instead, we directly use `<UserContext value={{ user, setUser, logout }}>`.
* When registration succeeds, the user data is saved in this context.
* Another component (`src/components/UserProfile.jsx` inside the header) reads this context and shows `"Logged in as: [Name] ([Email])"`.

---

### 6. Which Asset Loading APIs Were Selected and Why
We used two built-in asset loading APIs from `react-dom` in `src/App.jsx`:
* **`preconnect('https://images.unsplash.com')`**:
  * Establishes an early network connection (DNS, TCP, TLS) with Unsplash so product images load faster.
* **`preload('https://images.unsplash.com/...', { as: 'image' })`**:
  * Downloads the first product image in advance so it is ready before the product card is displayed.

---

### 7. How Document Metadata is Implemented
* React 19 lets us write `<title>` and `<meta>` tags directly inside components without any extra libraries like `react-helmet`.
* React automatically hoists these tags into the HTML `<head>`.
* In `RegistrationForm.jsx`:
  * `<title>Mini E-Commerce Store – Register</title>`
  * `<meta name="description" content="Register to access the electronics product catalog" />`
* In `ProductList.jsx`:
  * `<title>Mini E-Commerce Store – Products</title>`
  * `<meta name="description" content="Browse our collection of modern electronics, smart cameras, and accessories" />`
* The browser tab title and description update automatically when moving between pages.

---
