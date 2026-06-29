// import { createContext, useState, useContext } from 'react';

// // Context create பண்றோம்
// export const UserContext = createContext(null);

// // Custom hook — எளிதா use பண்ண
// export function useUser() {

//   return useContext(UserContext);
  
// }

// // Provider component
// export function UserProvider({ children }) {
//   const [username, setUsername] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (name) => {
//     setUsername(name);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setUsername('');
//     setIsLoggedIn(false);
//   };

//   return (
//     <UserContext.Provider value={{ username, isLoggedIn, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }








import { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ login now takes username + role
  const login = (name, userRole) => {
    setUsername(name);
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setRole('');
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ username, role, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}