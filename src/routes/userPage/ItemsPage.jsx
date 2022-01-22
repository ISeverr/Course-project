import {useList, useListVals, useObjectVal} from "react-firebase-hooks/database";
import {ref, remove} from "firebase/database";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import _ from "lodash";
import {Button, Card, Col, Nav, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import CreateUserCollection from "./CreateUserCollection";
import CreateItemUserCollection from "./CreateItemUserCollection";


const ItemsPage = () => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const {auth, db} = useContext(AuthContext);
  const [itemState, setItemState] = useState({})
  const [checkItemForm, setCheckItemForm] = useState({})
  console.log(state)
  const [items, loading, error] = useListVals(ref(db, 'collections/' + auth.currentUser.uid + "/" + state))


  useEffect(() => {
    if (items) {
      const FFFF = items.filter((item) => !item.hasOwnProperty("topic"))
      setItemState(FFFF[0])
    }
  }, [items]);


  const visionOfItemForm = () => {
    setCheckItemForm({edited: true})
  };

  const deleteItem = async (itemId) => {
    try {
      const collectionItemRef = ref(db, 'collections/' + auth.currentUser.uid + "/" + state + "/items" + "/" + itemId)
      console.log(itemId)
      await remove(collectionItemRef)
      console.log(collectionItemRef)
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
          <CreateItemUserCollection
            setCheckItemForm={setCheckItemForm}
            collectionKey={state}
          />
          : null
        }
      </Nav>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4 ">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(itemState, (item, key) => (
          <Col key={key}>
            <Card className="mx-3" border="dark" style={{width: '20rem'}}>
              <Card.Img variant="top" src={item.image} alt="..."/>
              <Card.Body>
                <Card.Title key={item.name}>{item.name}</Card.Title>
                <Card.Header key={item.tag}>{item.tag}</Card.Header>
                <Card.Text key={item.value}>{item.value}</Card.Text>
                <Button  variant="danger" onClick={() => deleteItem(key)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>

  )
}

export default ItemsPage