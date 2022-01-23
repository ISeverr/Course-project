import {createContext, useReducer} from "react";
import {getAuth} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import {AuthContext} from "./AuthProvider";
import {ref as sRef, uploadBytes} from "firebase/storage";
export const CollectionContext = createContext(null);

export  const CollectionProvider = ({children}) => {
  const imageTypes = ["JPG", "PNG", "GIF"];

  const  imageId = () => {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 17; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

return <CollectionContext.Provider value={{imageId, imageTypes}}>
    {children}
  </CollectionContext.Provider>
}

