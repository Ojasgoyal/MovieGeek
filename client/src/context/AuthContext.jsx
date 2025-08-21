import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    accessToken: null,
  });

  // ✅ on mount, check if user exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.accessToken) {
        setUser(parsedUser);
      }
    }
  }, []);

  // ✅ login
  const login = (data) => {
    const existingUser = JSON.parse(localStorage.getItem("user")) || {};
    const userData = {
      username: data?.user?.username || existingUser.username,
      accessToken: data?.accessToken,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // ✅ logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser({ username: null, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
