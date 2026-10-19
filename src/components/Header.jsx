import { UserProfile } from './UserProfile';

export function Header() {
  return (
    <header className="header">
      <div className="header-title">Mini E-Commerce Store</div>
      <UserProfile />
    </header>
  );
}
