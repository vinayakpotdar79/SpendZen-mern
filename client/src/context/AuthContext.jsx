import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  authTokens: null,
  loginUser: async () => {},
  logoutUser: () => {},
  registerUser: async () => {}
});

export default AuthContext;