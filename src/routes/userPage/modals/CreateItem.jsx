import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../../../hoc/AuthProvider";
import { push, ref, set } from "firebase/database";
import { Formik } from "formik";
import { INPUTGROUP } from "../../../styles/CreateFormStyle";
import { CollectionContext } from "../../../hoc/CollectionProvider";

const CreateItem = ({ setCheckItemForm, collectionKey, editItem }) => {
  console.log(editItem);
  const { auth, db, storage } = useContext(AuthContext);
  const { validationItemSchema } = useContext(CollectionContext);
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

  const createItem = async (name, tag, description) => {
    try {
      await set(newItemRef, {
        name: name,
        tag: tag,
        description: description,
      });
    } catch (e) {
      alert(e.message);
    }
    setCheckItemForm([]);
  };

  return (
    <>
      <Modal size="lg" show={true} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Item</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            itemName: "",
            tag: "",
            description: "",
          }}
          validationSchema={validationItemSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            dirty,
          }) => (
            <>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-4">
                        <FormControl
                          name="itemName" 
                          type="text"
                          placeholder="Enter item name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.itemName}
                          className={
                            touched.itemName && errors.itemName ? "error" : null
                          }
                        />
                        {touched.itemName && errors.itemName ? (
                          <div className="error-message">{errors.itemName}</div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-4">
                        <FormControl
                          name="tag"
                          type="text"
                          placeholder="Enter item tag"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tag}
                          className={touched.tag && errors.tag ? "error" : null}
                        />
                        {touched.tag && errors.tag ? (
                          <div className="error-message">{errors.tag}</div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-4">
                        <FormControl
                          name="description"
                          type="text"
                          placeholder="Enter item description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          className={touched.description && errors.description ? "error" : null}
                        />
                        {touched.description && errors.description ? (
                          <div className="error-message">{errors.description}</div>
                        ) : null}
                      </INPUTGROUP>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline-primary"
                  disabled={!errors.values && !dirty}
                  onClick={() =>
                    createItem(
                      values.itemName,
                      values.tag,
                      values.description
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

export default CreateItem;
