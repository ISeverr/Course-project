import { createContext, useReducer } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import { AuthContext } from "./AuthProvider";
import { ref as sRef, uploadBytes } from "firebase/storage";
import { object, string } from "yup";

export const CollectionContext = createContext(null);

export const CollectionProvider = ({ children }) => {
  const imageTypes = ["JPG", "PNG", "GIF"];

  const validationCollectionSchema = object({
    CollectionName: string().required("*CollectionName is reuired"),
    topic: string().required("*Topic is reuired"),
    description: string().required("*Description is reuired"),
  });

  const validationItemSchema = object({
    itemName: string().required("*CollectionName is reuired"),
    tag: string().required("*Topic is reuired"),
    description: string().required("*Description is reuired"),
  });

  const imageId = () => {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 17; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  return (
    <CollectionContext.Provider
      value={{ imageId, imageTypes, validationCollectionSchema, validationItemSchema }}
    >
      {children}
    </CollectionContext.Provider>
  );
};
