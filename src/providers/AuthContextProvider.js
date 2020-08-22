import React, { useState } from "react";

import { AuthContext } from "context/auth";
import { AUTH_TOKEN } from "utils/constants";

export default function AuthContextProvider({ children }) {
  const currentAuthToken = localStorage.getItem(AUTH_TOKEN);
  const [authToken, setAuthToken] = useState(currentAuthToken);

  const setToken = (payload) => {
    localStorage.setItem(AUTH_TOKEN, payload);
    setAuthToken(payload);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
