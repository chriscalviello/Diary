import React, { useState, useMemo } from "react";

type Context = {
  currentUser?: CurrentUser;
  error: string;
  loading: boolean;
  login: React.Dispatch<SignupUser>;
  setCurrentUser: (user: CurrentUser) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  signup: React.Dispatch<SignupUser>;
};

interface Props {
  children: React.ReactNode;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const x = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    x !== null && JSON.parse(x)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (newUser: SignupUser) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser }),
      });
      const responseData = await response.json();

      const user: CurrentUser = {
        username: newUser.username,
        token: responseData.token,
      };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const signup = async (newUser: SignupUser) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser }),
      });
      const responseData = await response.json();

      const user: CurrentUser = {
        username: newUser.username,
        token: responseData.token,
      };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const context: Context = useMemo<Context>(
    () => ({
      currentUser,
      error,
      loading,
      setCurrentUser,
      setLoading,
      setError,
      login,
      signup,
    }),
    [
      currentUser,
      error,
      loading,
      setCurrentUser,
      setLoading,
      setError,
      login,
      signup,
    ]
  );

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

const Context = React.createContext<Context | null>(null);

export const useAuthentication = (): Context => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(
      "useAuthentication must be used under a <AuthenticationProvider>"
    );
  }
  return context;
};

type CurrentUser = {
  username: string;
  token: string;
};

export interface SignupUser {
  username: string;
  password: string;
}
