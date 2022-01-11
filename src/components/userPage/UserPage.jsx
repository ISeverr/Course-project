import {Button, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {database} from "../../firebase";
import {AuthContext} from "../../hoc/AuthProvider";


const UserPage = () => {
  const {auth} = useContext(AuthContext);
  const [docs, setDocs] = useState([]);
  const usersCollectionReference = collection(database, "users", auth.currentUser.uid, "items-collection")

  useEffect(() => {

    const getCollectionDocs = async () => {
      const data = await getDocs(usersCollectionReference);
      console.log(data);
      setDocs(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getCollectionDocs()
  }, [])

  return (
    <>
      <h1>USER PAGE</h1>
      <Link to="/user-page/create-collection">Create collection</Link>
      <div>
        {docs.map((doc) => {
          return (
            <div>
              <h2>name: {doc.name}</h2>
              <h2>description: {doc.description}</h2>
              <h2>topic: {doc.topic}</h2>
            </div>)
        })}
      </div>
    </>
  )
}


export default UserPage;