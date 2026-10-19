import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="submit-btn">
      {pending ? 'Registering...' : 'Register'}
    </button>
  );
}
