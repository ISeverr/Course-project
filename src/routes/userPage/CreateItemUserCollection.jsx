import {Button, FormControl, InputGroup, Modal} from "react-bootstrap"
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import {addDoc, collection} from "@firebase/firestore";
import {push, ref, set} from "firebase/database";

const CreateItemUserCollection = ({setCheckForm, collectionId}) => {
  console.log(collectionId)
  const {auth, db} = useContext(AuthContext);
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    tag: "",
    value: ""
  })


  const userItemRef = ref(db, "collections/" + auth.currentUser.uid + "/" + collectionId);
  console.log(auth.currentUser.uid)
  const createItem = async () => {
    try {
      const newItemRef = await push(userItemRef)
      const newItem = await set(newItemRef, {
        name: form.name,
        tag: form.tag,
        value: form.value
      })
      console.log(newItem)
      navigate("/user-page")
    } catch (e) {
      alert(e.message)
    }
    setCheckForm([]);
  }

  const handleClose = () => {
    setCheckForm([]);
    console.log("close")
  }

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body><InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="name"
          type="text"
          placeholder="Enter name"
          onChange={handlerChange}
        />
        <InputGroup.Text id="inputGroup-sizing-default">Tag</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="tag"
          type="text"
          placeholder="Enter topic"
          onChange={handlerChange}
        />
        <InputGroup.Text id="inputGroup-sizing-default">Value</InputGroup.Text>
        <FormControl
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="value"
          type="number"
          placeholder="Enter date"
          onChange={handlerChange}
        />
      </InputGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="secondary" onClick={createItem}>
          Create item
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateItemUserCollection;