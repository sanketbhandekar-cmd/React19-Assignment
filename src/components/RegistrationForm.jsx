import { useActionState, use } from 'react';
import { SubmitButton } from './SubmitButton';
import { UserContext } from '../context/UserContext';

async function registerAction(previousState, formData) {
  const name = formData.get('name')?.trim();
  const email = formData.get('email')?.trim();
  const password = formData.get('password');

  const errors = {};

  if (!name || name.length < 3) {
    errors.name = 'Name must be at least 3 characters long.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  // 2.5 second delay to comfortably observe and screenshot the pending state
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return {
    success: true,
    message: 'Registration successful! Welcome, ' + name,
    user: { name, email },
  };
}

export function RegistrationForm() {
  const { setUser } = use(UserContext);
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <div className="form-container">
      {/* React 19 Document Metadata */}
      <title>Mini E-Commerce Store – Register</title>
      <meta name="description" content="Register to access the electronics product catalog" />

      <h2>User Registration</h2>
      <p className="subtitle">Please register before interacting with the application.</p>

      {state?.success ? (
        <div className="alert-success">
          <p className="success-message">{state.message}</p>
          <button
            type="button"
            onClick={() => setUser(state.user)}
            className="btn-continue"
          >
            Go to Product Catalog &rarr;
          </button>
        </div>
      ) : (
        <form action={formAction} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
            {state?.errors?.name && (
              <span className="error-text">{state.errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            {state?.errors?.email && (
              <span className="error-text">{state.errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {state?.errors?.password && (
              <span className="error-text">{state.errors.password}</span>
            )}
          </div>

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
