import {useEffect, useState} from "react";
import {database} from "../../firebase";
import {collection, getDocs} from "@firebase/firestore";


const HomePage = () => {
  const [users, setUsers] = useState([])
  const usersCollectionReference = collection(database, "users")

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionReference);
      console.log(data);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getUsers()
  }, [])

  return (
    <>
      <div>
        {users.map((user) => {
          return (
            <div>
              <h1>user uid: {user.userUid}</h1>
            </div>)
        })}
      </div>
    </>
  )
}

export default HomePage;