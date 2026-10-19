import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext value={{ user, setUser, logout }}>
      {children}
    </UserContext>
  );
}
