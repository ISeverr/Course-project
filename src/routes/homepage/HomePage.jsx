import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import {useList, useListVals} from "react-firebase-hooks/database";
//import {collection, getDocs} from "@firebase/firestore";
import { ref, getDatabase } from 'firebase/database';
import _ from 'lodash';
import {map} from 'lodash'



const HomePage = () => {
  const {db} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  //const usersCollectionReference = collection(database, "users");

  // const getUsers = async () => {
  //   const data = await getDocs(usersCollectionReference);
  //   console.log(data);
  //   setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))


  const [values, loading, error] = useListVals(ref(db, 'collections'));


  console.log(values)
  // useEffect(() => {
  //   useList()
  // }, [])

  return (
    <>
      <div>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(values,(value, key)=> (
          <div key={key}>{value.id}</div>,
          _.map(value,(item, key) => (
            <>
              <div>Collection</div>
              <div key={key}>name: {item.name}</div>
              <div key={key}>description: {item.description}</div>
              <div key={key}>topic: {item.topic}</div>
            </>
          ))
        ))

        }
      </div>
    </>
  )
}


export default HomePage;