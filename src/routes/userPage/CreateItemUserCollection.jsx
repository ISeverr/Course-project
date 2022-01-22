import {Button, Col, Container, FormControl, InputGroup, Modal, Row} from "react-bootstrap"
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import {push, ref, set} from "firebase/database";
import { FileUploader } from "react-drag-drop-files";
import {  uploadBytes, ref as sRef , getDownloadURL} from "firebase/storage";
import {useDownloadURL} from "react-firebase-hooks/storage";


const CreateItemUserCollection = ({setCheckItemForm, collectionKey}) => {
  const {auth, db, storage} = useContext(AuthContext);
  const {state} = useLocation()
  const [image, setImage] = useState(null);
  const [checkImage, setCheckImage] = useState(false)
  const [imageName, setImageName] = useState("");
  const [form, setForm] = useState({
    name: "",
    tag: "",
    value: ""
  });
  const [value] = useDownloadURL(sRef(storage, `images/${imageName}`));
  const fileTypes = ["JPG", "PNG", "GIF"];
  const userItemRef = ref(db, "collections/" + auth.currentUser.uid + "/" + collectionKey + "/items");
  console.log(auth.currentUser.uid);

  const  imageId = () => {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 17; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  const imageHandlerChange = async (image) => {
    setImage(image);
    image ? setCheckImage(true) : setCheckImage(false);
    const imageRef = await sRef(storage, `images/${imageId()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      setImageName(snapshot.metadata.name);
    });
  };

  const createItem = async () => {
    try {
      const newItemRef = await push(userItemRef)
      const newItem = await set(newItemRef, {
          name: form.name,
          tag: form.tag,
          value: form.value,
          image: value,
      })
    } catch (e) {
      alert(e.message)
    }
    setCheckItemForm([]);
  };

  const handleClose = () => {
    setCheckItemForm([]);
    console.log("close")
  };

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <FileUploader
                  className="mb-3"
                  handleChange={imageHandlerChange}
                  name="file"
                  disabled={checkImage}
                  types={fileTypes}

                />
                <InputGroup className="mb-3" >
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="name"
                    type="text"
                    placeholder="Enter item name"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3" >
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="tag"
                    type="text"
                    placeholder="Enter item tag"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3" >
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="value"
                    type="number"
                    placeholder="Enter item value"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={createItem}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateItemUserCollection;