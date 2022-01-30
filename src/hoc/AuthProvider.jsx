import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { object, string } from "yup";


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const { user } = getAuth();
  const db = getDatabase();
  const storage = getStorage();

  const validationAuthSchema = object({
    email: string()
      .email("*Must be a valid email address")
      .required("*Email is reuired"),
    password: string()
      .min(6, "*Password must have at least 6 characters")
      .required("*Password is reuired"),
  });

  const login = async (auth, email, password, navigate) => {
    try {
      console.log(email, password)
      await signInWithEmailAndPassword(auth, email, password);
      navigate();
    } catch (error) {
      console.error(error);
      toast(error.message)
    }
  };

  const registration = async (auth, email, password, navigate) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = response;
      const newUser = await set(ref(db, "users/" + auth.currentUser.uid), {
        email: email,
      });
      console.log(newUser);
      navigate();
      console.log(user);
    } catch (err) {
      console.log(err);
      toast(err.message)
    }
  };

  const logout = (auth) => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(auth);

  return (
    <AuthContext.Provider
      value={{ auth, login, registration, logout, user, db, storage, validationAuthSchema }}
    >
      {children}
    </AuthContext.Provider>
  );
};
