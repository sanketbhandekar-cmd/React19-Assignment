import { use } from 'react';
import { UserContext } from '../context/UserContext';

export function UserProfile() {
  const { user, logout } = use(UserContext);

  if (!user) return null;

  return (
    <div className="header-user">
      <span>Welcome, <strong>{user.name}</strong> ({user.email})</span>
      <button type="button" onClick={logout} className="btn-logout">
        Logout
      </button>
    </div>
  );
}
