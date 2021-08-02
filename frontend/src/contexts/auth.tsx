import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

type AuthContextType = {
  loading: boolean,
  signed: boolean,
  user: Object | null,
  signIn: Function,
  signOut: Function,
  validate: Function
};

const AuthContextData = {
  loading: Boolean(),
  signed: Boolean(),
  user: Object || null,
  signIn: Function,
  signOut: Function,
  validate: Function
};

const AuthContext = createContext<AuthContextType>(AuthContextData);

///JWT (Stateless)

export const AuthProvider = ({ children }) => {
  const route = useRouter()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStoragedData() {
      const storagedUser = localStorage.getItem("@RNAuth:user");
      const storagedToken = localStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;

        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }

    loadStoragedData();
  }, []);

  async function signIn(data) {
    const res = await api
      .post("/user/login", data)
      .then((response) => {
        localStorage.setItem(
          "@RNAuth:user",
          JSON.stringify(response.data.user)
        );
        localStorage.setItem("@RNAuth:user", response.data);
        setUser(response.data);
        return true;
      })
      .catch((error) => {
        console.log("Erro ao fazer login");
        console.log(error);
        return false;
      });

    return res;
  }

  async function validate() {
    await api
      .get("/api/validate")
      .then((response) => {
        if (!response.data) {
          signOut();
        }
      })
      .catch((err) => {
        alert("Erro de validação");
        console.log(err);
        signOut();
      });
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    route.push("/")
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, validate, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}