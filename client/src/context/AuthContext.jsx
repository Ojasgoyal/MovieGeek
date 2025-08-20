import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // on mount, check if token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token }); // you could decode jwt to get username/email
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
