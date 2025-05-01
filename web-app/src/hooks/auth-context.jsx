import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase.config.js";

import { Spin } from "antd";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    }); // Cleanup subscription
  }, []);

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setCurrentUser(null);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="flex justify-center flex-col items-center h-screen bg-gray-50 dark:bg-neutral-900">
          <Spin size="large" />
          <p className="mt-2 text-blue-400 font-semibold">Loading</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return {
    currentUser: context.currentUser,
    isLoading: context.isLoading,
    isAuthenticated: !!context.currentUser,
    logout: context.logout,
  };
};
