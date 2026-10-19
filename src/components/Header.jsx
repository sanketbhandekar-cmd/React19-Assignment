import { use } from 'react';
import { UserContext } from '../context/UserContext';
import { UserProfile } from './UserProfile';

export function Header({ cartCount = 0 }) {
  const { user } = use(UserContext);

  return (
    <header className="header">
      <div className="header-title">Mini E-Commerce Store</div>
      {user && (
        <div className="header-right">
          <span className="cart-badge">Cart: <strong>{cartCount}</strong></span>
          <UserProfile />
        </div>
      )}
    </header>
  );
}
