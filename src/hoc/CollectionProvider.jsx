import {createContext, useReducer} from "react";
import {getAuth} from "firebase/auth";
import {getDatabase, push, ref, set} from "firebase/database";
import {AuthContext} from "./AuthProvider";
const initialState = {}
export const CollectionContext = createContext(initialState);

export  const CollectionProvider = ({children}) => {

  // const addCollection = async (userCollectionRef, form, navigate) => {
  //   try {
  //     const newCollectionKey = push(userCollectionRef).key
  //     const newCollectionRef = await push(userCollectionRef)
  //     console.log(newCollectionKey);
  //     await set(newCollectionRef, {
  //       name: form.name,
  //       topic: form.topic,
  //       description: form.description
  //     })
  //     navigate()
  //   } catch (e) {
  //     alert(e.message)
  //   }
  //
  // }

  const collectionKey = (userCollectionRef) => {
    const newCollectionKey =   push(userCollectionRef).key;
    console.log(collectionKey)

  }


  return <CollectionContext.Provider value={{collectionKey}}>
    {children}
  </CollectionContext.Provider>
}

