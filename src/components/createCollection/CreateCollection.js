import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useContext, useState} from "react";
import {addDoc, doc, collection} from "@firebase/firestore";
import {database} from "../../firebase";
import {AuthContext} from "../../hoc/AuthProvider";
import {useNavigate} from "react-router-dom";

const CreateCollection = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    topic: "",
    description: ""
  });

  const {auth} = useContext(AuthContext);
  const itemsCollection = collection(database, "users", auth.currentUser.uid, "items-collection");

    const createUserCollection = async () => {
    try {
      await addDoc(itemsCollection, {
        name: form.name,
        topic: form.topic,
        description: form.description
      });
      navigate("/user-page")
    } catch (e) {
      alert(e.message)
    }

    }

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
      <Button onClick={createUserCollection}>
        Create collection
      </Button>
    </>
  )
}

export default CreateCollection;