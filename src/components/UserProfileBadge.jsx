import { use } from 'react';
import { UserContext } from '../context/UserContext';

/**
 * Displays the registered user's information.
 * Uses React 19's use() API directly with UserContext to demonstrate
 * the new context consumption capability without useContext.
 */
export function UserProfileBadge() {
  const { user, logout } = use(UserContext);

  if (!user) {
    return (
      <div className="user-badge unauthenticated">
        <span className="user-badge-status-dot"></span>
        <span className="user-badge-text">Guest Mode (Not Registered)</span>
      </div>
    );
  }

  return (
    <div className="user-profile-widget">
      <div className="user-profile-card">
        <div className="user-avatar-wrapper">
          <img
            src={user.avatar}
            alt={user.name}
            className="user-avatar"
            width="40"
            height="40"
          />
          <span className="online-indicator" title="Active Session"></span>
        </div>

        <div className="user-details">
          <div className="user-name-row">
            <span className="user-name">{user.name}</span>
            <span className="user-role-tag">{user.role || 'Member'}</span>
          </div>
          <span className="user-email">{user.email}</span>
        </div>

        <button
          type="button"
          onClick={logout}
          className="btn-logout"
          title="Sign out & test registration flow again"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
