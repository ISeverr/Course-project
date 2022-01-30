import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../hoc/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ref, push, set, child } from "firebase/database";
import { FileUploader } from "react-drag-drop-files";
import { uploadBytes, ref as sRef } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { CollectionContext } from "../../../hoc/CollectionProvider";
import { Formik } from "formik";
import { INPUTGROUP } from "../../../styles/CreateFormStyle";

const CreateCollection = ({ setCheckCollectionForm, editCollection }) => {
  const { auth, db, storage } = useContext(AuthContext);
  const { imageId, fileTypes, validationCreateSchema } =
    useContext(CollectionContext);
  const [image, setImage] = useState(null);
  const [checkImage, setCheckImage] = useState(false);
  const [imageName, setImageName] = useState("");
  const [value] = useDownloadURL(sRef(storage, `images/${imageName}`));
  const [altValue] = useDownloadURL(sRef(storage, "images/noImage.png"));

  const userCollectionRef = ref(db, `collections/${auth.currentUser.uid}`);

  const newCollectionRef = editCollection
    ? ref(db, `collections/${auth.currentUser.uid}/${editCollection}`)
    : push(userCollectionRef);

  const imageHandlerChange = async (image) => {
    setImage(image);
    image ? setCheckImage(true) : setCheckImage(false);
    const imageRef = await sRef(storage, `images/${imageId()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      setImageName(snapshot.metadata.name);
    });
  };
  

  const createCollection = async (collectionName, topic, description) => {
    try {
      await set(newCollectionRef, {
        info: {
          CollectionName: collectionName,
          topic: topic,
          description: description,
          imageURL: value ? value : altValue,
          imageName: imageName ? imageName : null,
        },
      });
      setCheckCollectionForm({ edited: false });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleClose = () => {
    setCheckCollectionForm({ edited: false });
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Collection</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            CollectionName: "",
            topic: "",
            description: "",
          }}
          validationSchema={validationCreateSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
            <>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                      <FileUploader
                        handleChange={imageHandlerChange}
                        name="file"
                        disabled={checkImage}
                        types={fileTypes}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-4">
                        <FormControl
                          name="CollectionName"
                          type="text"
                          placeholder="Enter collection name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.CollectionName}
                          className={
                            touched.CollectionName && errors.CollectionName
                              ? "error"
                              : null
                          }
                        />
                        {touched.CollectionName && errors.CollectionName ? (
                          <div className="error-message">
                            {errors.CollectionName}
                          </div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-4">
                        <FormControl
                          name="topic"
                          type="text"
                          placeholder="Enter collection topic"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.topic}
                          className={
                            touched.topic && errors.topic ? "error" : null
                          }
                        />
                        {touched.topic && errors.topic ? (
                          <div className="error-message">{errors.topic}</div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-3">
                        <FormControl
                          name="description"
                          type="text"
                          placeholder="Enter collection description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          className={
                            touched.description && errors.description
                              ? "error"
                              : null
                          }
                        />
                        {touched.description && errors.description ? (
                          <div className="error-message">
                            {errors.description}
                          </div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-primary"
                  disabled={!errors.values  && !dirty}
                  onClick={() =>
                    createCollection(
                      values.CollectionName,
                      values.description,
                      values.topic
                    )
                  }
                >
                  Create
                </Button>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateCollection;
