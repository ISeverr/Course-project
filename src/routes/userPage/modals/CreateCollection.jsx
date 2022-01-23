import {Button, Col, Container, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../hoc/AuthProvider";
import {useNavigate} from "react-router-dom";
import {ref, push, set, child} from "firebase/database";
import {FileUploader} from "react-drag-drop-files";
import {uploadBytes, ref as sRef} from "firebase/storage";
import {useDownloadURL} from "react-firebase-hooks/storage";
import {CollectionContext} from "../../../hoc/CollectionProvider";


const CreateCollection = ({setCheckCollectionForm, editCollection}) => {
  //console.log(editCollection)
  const {auth, db, storage} = useContext(AuthContext);
  const {imageId, fileTypes} = useContext(CollectionContext);
  const [image, setImage] = useState(null);
  const [checkImage, setCheckImage] = useState(false)
  const [imageName, setImageName] = useState("");
  const [form, setForm] = useState({
    name: "",
    topic: "",
    description: ""
  });
  const [value] = useDownloadURL(sRef(storage, `images/${imageName}`));
  const userCollectionRef = ref(db, `collections/${auth.currentUser.uid}`);
  const newCollectionRef = editCollection
    ? ref(db, `collections/${auth.currentUser.uid}/${editCollection}`)
    : push(userCollectionRef);

  const handlerChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const imageHandlerChange = async (image,) => {
    setImage(image);
    image ? setCheckImage(true) : setCheckImage(false);
    const imageRef = await sRef(storage, `images/${imageId()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      setImageName(snapshot.metadata.name);
    });
  };

  const createCollection = async () => {
    try {
      await set(newCollectionRef, {
        info: {
          CollectionName: form.CollectionName,
          topic: form.topic,
          description: form.description,
          imageURL: value,
          imageName: imageName,
        }
      });
      setCheckCollectionForm({edited: false});
    } catch (e) {
      alert(e.message)
    }
  };

  const handleClose = () => {
    setCheckCollectionForm({edited: false});
    console.log(setCheckCollectionForm)
    console.log("close")
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
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="CollectionName"
                    type="text"
                    placeholder="Enter collection name"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="topic"
                    type="text"
                    placeholder="Enter collection topic"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <InputGroup className="mb-3" hasValidation>
                  <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    name="description"
                    type="text"
                    placeholder="Enter collection description"
                    onChange={handlerChange}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={createCollection}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateCollection;