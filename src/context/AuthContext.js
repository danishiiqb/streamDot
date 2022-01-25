import { createContext, useContext } from 'react';
import useAuthListener from '../hooks/useAuthListener';
import { auth } from '../lib/firebase';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user] = useAuthListener(auth);
  const signUp = function (email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const signOut = function () {
    return auth.signOut();
  };
  const login = function (email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const loginWGoogle = function (provider) {
    return auth.signInWithPopup(provider);
  };
  const vals = {
    signUp,
    user,
    login,
    signOut,
    loginWGoogle,
  };
  return <AuthContext.Provider value={vals}>{children}</AuthContext.Provider>;
};
