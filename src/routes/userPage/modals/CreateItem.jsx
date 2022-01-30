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
import { FieldArray, Formik } from "formik";
import { INPUTGROUP } from "../../../styles/CreateFormStyle";
import { CollectionContext } from "../../../hoc/CollectionProvider";

const CreateItem = ({ setCheckItemForm, collectionKey, editItem }) => {
  console.log(editItem);
  const { auth, db, storage } = useContext(AuthContext);
  const { validationCreateSchema } = useContext(CollectionContext);
  const [form, setForm] = useState({
    name: "",
    tag: "",
    value: "",
  });
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

  const createItem = async (name, tag, stringFields, textFields, valueFields) => {
    try {
      await set(newItemRef, {
        name: name,
        tag: tag,
        stringFields: stringFields,
        textFields: textFields,
        valueFields: valueFields,
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
          <Modal.Title>Collection</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={{
            itemName: "",
            tag: "",
            stringFields: [{ string: "" }],
            textFields: [{ text: "" }],
            valueFields: [{ value: 0 }],
          }}
          validationSchema={validationCreateSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
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
                      <INPUTGROUP className="mb-3">
                        <FieldArray name="stringFields">
                          {({ push, remove }) => (
                            <Row>
                              <INPUTGROUP>test array fields</INPUTGROUP>
                              {values.stringFields.map((_, index) => (
                                <Row>
                                  <Col>
                                    <FormControl
                                      name={`stringFields[${index}].string`}
                                      type="text"
                                      onChange={handleChange}
                                      value={values.name}
                                    />
                                  </Col>
                                  <Col>
                                    <Button onClick={() => remove(index)}>
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              ))}
                              <Col>
                                <Button onClick={() => push({ string: "" })}>
                                  Add
                                </Button>
                              </Col>
                            </Row>
                          )}
                        </FieldArray>
                      </INPUTGROUP>
                    </Col>
                    <Col>
                      <INPUTGROUP className="mb-3">
                        <FieldArray name="textFields">
                          {({ push, remove }) => (
                            <Row>
                              <INPUTGROUP>test array fields</INPUTGROUP>
                              {values.textFields.map((_, index) => (
                                <Row>
                                  <Col>
                                    <FormControl
                                      name={`textFields[${index}].text`}
                                      type="text"
                                      onChange={handleChange}
                                      value={values.name}
                                    />
                                  </Col>
                                  <Col>
                                    <Button onClick={() => remove(index)}>
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              ))}
                              <Col>
                                <Button onClick={() => push({ text: "" })}>
                                  Add
                                </Button>
                              </Col>
                            </Row>
                          )}
                        </FieldArray>
                      </INPUTGROUP>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <INPUTGROUP className="mb-3">
                        <FieldArray name="valueFields">
                          {({ push, remove }) => (
                            <Row>
                              <INPUTGROUP>test array fields</INPUTGROUP>
                              {values.valueFields.map((_, index) => (
                                <Row>
                                  <Col>
                                    <FormControl
                                      name={`valueFields[${index}].value`}
                                      type="value"
                                      onChange={handleChange}
                                      value={values.name}
                                    />
                                  </Col>
                                  <Col className="md-auto">
                                    <Button onClick={() => remove(index)}>
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              ))}
                              <Col>
                                <Button onClick={() => push({ value: "" })}>
                                  Add
                                </Button>
                              </Col>
                            </Row>
                          )}
                        </FieldArray>
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
                    createItem(values.itemName, values.tag, values.stringFields, values.textFields, values.valueFields)
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
