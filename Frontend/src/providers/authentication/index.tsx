import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

type Context = {
  currentUser?: CurrentUser;
  error: string;
  loading: boolean;
  login: React.Dispatch<LoginUser>;
  setCurrentUser: (user: CurrentUser) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  signup: React.Dispatch<SignupUser>;
};

interface Props {
  children: React.ReactNode;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const localStorageCurrentUser = localStorage.getItem("currentUser");
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    localStorageCurrentUser !== null && JSON.parse(localStorageCurrentUser)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const login = async (newUser: LoginUser) => {
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

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      const user: CurrentUser = {
        email: newUser.email,
        token: responseData.token,
      };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      history.replace("/");
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
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      const user: CurrentUser = {
        email: newUser.email,
        token: responseData.token,
      };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      history.replace("/");
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
  email: string;
  token: string;
};

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignupUser {
  name: string;
  surname: string;
  email: string;
  password: string;
}
