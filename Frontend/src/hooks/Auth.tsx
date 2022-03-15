import { createContext, useContext } from 'react';

export const AuthContext = createContext<any>('');

export function useAuth() {
  return (useContext(AuthContext))
}