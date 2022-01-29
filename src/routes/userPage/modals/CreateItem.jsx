import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../hoc/AuthProvider";
import { push, ref, set } from "firebase/database";
import { FileUploader } from "react-drag-drop-files";
import { uploadBytes, ref as sRef, getDownloadURL } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { CollectionContext } from "../../../hoc/CollectionProvider";

const CreateItem = ({ setCheckItemForm, collectionKey, editItem }) => {
  console.log(editItem);
  const { auth, db, storage } = useContext(AuthContext);
  const { imageId, imageTypes } = useContext(CollectionContext);
  const [image, setImage] = useState(null);
  const [checkImage, setCheckImage] = useState(false);
  const [imageName, setImageName] = useState("");
  const [form, setForm] = useState({
    name: "",
    tag: "",
    value: "",
  });
  const [value] = useDownloadURL(sRef(storage, `images/${imageName}`));
  const [altValue] = useDownloadURL(sRef(storage, "images/noImage.png"));
  const userItemRef = ref(
    db,
    `collections/${auth.currentUser.uid}/${collectionKey}/items`
  );
  const newItemRef = editItem
    ? ref(
        db,
        `collections/${auth.currentUser.uid}/${collectionKey}/items/${editItem}`
      )
    : push(userItemRef);

  const handleClose = () => {
    setCheckItemForm([]);
    console.log("close");
  };

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const imageHandlerChange = async (image) => {
    try {
      setImage(image);
      image ? setCheckImage(true) : setCheckImage(false);
      const imageRef = await sRef(storage, `images/${imageId()}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        setImageName(snapshot.metadata.name);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const createItem = async () => {
    try {
      await set(newItemRef, {
        name: form.name,
        tag: form.tag,
        value: form.value,
        imageURL: value ? value : altValue,
        imageName: imageName ? imageName : null,
      });
    } catch (e) {
      alert(e.message);
    }
    setCheckItemForm([]);
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} backdrop="static">
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
                  types={imageTypes}
                />
                <InputGroup className="mb-3">
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
                <InputGroup className="mb-3">
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
                <InputGroup className="mb-3">
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
  );
};

export default CreateItem;
