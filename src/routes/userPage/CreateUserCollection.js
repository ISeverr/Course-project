import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useContext, useState} from "react";
import {addDoc, doc, collection} from "@firebase/firestore";
import {AuthContext} from "../../hoc/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import { getDatabase, ref, push, set } from "firebase/database";


const CreateUserCollection = () => {
  const {auth, db} = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    topic: "",
    description: ""
  });

  const userCollectionRef = ref(db, "collections/" + auth.currentUser.uid );

  const createCollection = async () => {
    try {
     const newCollectionRef =  await push(userCollectionRef)
      const newCollection = await set(newCollectionRef, {
        name: form.name,
        topic: form.topic,
        description: form.description
      })
     console.log(newCollection)
      navigate("/user-page")
    } catch (e) {
      alert(e.message)
    }

  }
  //console.log(itemsCollection)

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  return (
    <>
      <InputGroup className="mb-3">

        <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="name"
          type="text"
          placeholder="Enter name"
          onChange={handlerChange}
        />
        <InputGroup.Text id="inputGroup-sizing-default">Topic</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="topic"
          type="text"
          placeholder="Enter topic"
          onChange={handlerChange}
        />
        <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="description"
          type="text"
          placeholder="Enter description"
          onChange={handlerChange}
        />
      </InputGroup>
      <Button onClick={createCollection}>
        Create collection
      </Button>

    </>
  )
}

export default CreateUserCollection;