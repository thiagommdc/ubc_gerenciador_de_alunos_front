import { createContext } from 'react';

export interface AuthContextType {
  token: string | null;
  setToken: (newToken: string) => void;
  setLogged: (login: boolean) => void;
  logged: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  setLogged: () => {},
  logged: false,
});
