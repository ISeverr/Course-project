import { useListVals } from "react-firebase-hooks/database";
import { ref, remove } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../hoc/AuthProvider";
import _ from "lodash";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CreateItem from "./modals/CreateItem";
import { CARD } from "../../styles/CardStyle";

const ItemsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { auth, db } = useContext(AuthContext);
  const [itemState, setItemState] = useState({});
  const [checkItemForm, setCheckItemForm] = useState({});
  const [items, loading, error] = useListVals(
    ref(db, `collections/${auth.currentUser.uid}/${state}`)
  );
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (items) {
      const checkItems = items.filter((item) => !item.hasOwnProperty("topic"));
      setItemState(checkItems[0]);
    }
  }, [items]);

  const visionOfItemForm = () => {
    setCheckItemForm({ edited: true });
    setEditItem(null);
  };

  const edit = (itemKey) => {
    visionOfItemForm();
    setEditItem(itemKey);
  };

  const deleteItem = async ({ item, key }) => {
    try {
      const collectionItemRef = ref(
        db,
        `collections/${auth.currentUser.uid}/${state}/items/${key}`
      );
      await remove(collectionItemRef);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Nav className="justify-content-center my-3">
        <Button
          className="me-2"
          variant="outline-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button onClick={() => visionOfItemForm()}>Create Item</Button>
        {checkItemForm.edited ? (
          <CreateItem
            setCheckItemForm={setCheckItemForm}
            collectionKey={state}
            editItem={editItem}
          />
        ) : null}
      </Nav>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading &&
          _.map(itemState, (item, key) => (
            <Col key={key}>
              <CARD
                className="mx-3 "
                border="dark"
                style={{ maxWidth: "20rem" }}
              >
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.tag}</Card.Subtitle>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    className="me-2"
                    variant="outline-danger"
                    onClick={() => deleteItem({ item, key })}
                  >
                    Delete
                  </Button>
                  <Button variant="outline-warning" onClick={() => edit(key)}>
                    Edit item
                  </Button>
                </Card.Body>
              </CARD>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ItemsPage;
