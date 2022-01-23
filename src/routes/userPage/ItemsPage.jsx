import {useListVals} from "react-firebase-hooks/database";
import {ref, remove} from "firebase/database";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import _ from "lodash";
import {Button, Card, Col, Nav, Row, Stack} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import CreateItem from "./modals/CreateItem";
import {deleteObject, ref as sRef} from "firebase/storage";


const ItemsPage = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const {auth, db, storage} = useContext(AuthContext);
  const [itemState, setItemState] = useState({});
  const [checkItemForm, setCheckItemForm] = useState({});
  const [items, loading, error] = useListVals(ref(db, `collections/${auth.currentUser.uid}/${state}`));
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (items) {
      const checkItems = items.filter((item) => !item.hasOwnProperty("topic"))
      setItemState(checkItems[0])
      console.log(items)
    }
  }, [items]);

  const visionOfItemForm = () => {
    setCheckItemForm({edited: true})
    setEditItem(null)
  };

  const edit = (itemKey) => {
    visionOfItemForm();
    setEditItem(itemKey);
  };

  const deleteItem = async ({item, key}) => {
    console.log(item)
    console.log(key)
    try {
      const collectionItemRef = ref(db, `collections/${auth.currentUser.uid}/${state}/items/${key}`);
      await remove(collectionItemRef);
      const imageRef = sRef(storage, `images/${item.imageName}`);
      await deleteObject(imageRef)
    } catch (e) {
      alert(e.message)
    }
  };

  return (
    <>
      <Nav className="justify-content-center my-3">
        <Button className="me-2" variant="outline-secondary" onClick={() => navigate('/user-page')}>Back</Button>
        <Button onClick={() => visionOfItemForm()}>Create Item</Button>
        {checkItemForm.edited
          ?
          <CreateItem
            setCheckItemForm={setCheckItemForm}
            collectionKey={state}
            editItem={editItem}
          />
          : null
        }
      </Nav>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(itemState, (item, key) => (
          <Col key={key}>
            <Card
              className="mx-3 "
              border="dark"
              style={{maxWidth: '20rem'}}
            >
              <Card.Img
                variant="top"
                style={{maxHeight: '20rem'}}
                className="img-thumbnail"
                src={item.imageURL} alt="..."
              />
              <Card.Body>
                <Card.Title >{item.name}</Card.Title>
                <Card.Header >{item.tag}</Card.Header>
                <Card.Text >{item.value}</Card.Text>
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={() => deleteItem({item, key})}
                >
                  Delete
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => edit(key)}
                >
                  Edit item
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>

  )
}

export default ItemsPage