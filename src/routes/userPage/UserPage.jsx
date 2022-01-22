//import {Button, Col, Modal} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import {ref, remove, child} from 'firebase/database';
import {useListKeys, useListVals, useObjectVal} from "react-firebase-hooks/database";
import _ from "lodash";
import {Button, Card, Col, Nav, Row} from "react-bootstrap";
import CreateUserCollection from "./CreateUserCollection";

const UserPage = () => {
  const {auth, db} = useContext(AuthContext);
  const navigate = useNavigate();
  const [checkCollectionForm, setCheckCollectionForm] = useState({})
  const [collections, loading, error] = useListVals(ref(db, 'collections/' + auth.currentUser.uid ), {
    keyField: "collectionKey"
  })



  //const test = child(ref(db), auth.currentUser.uid)
  console.log(collections);

  const deleteCollection = async (collectionId) => {
    try {
      const userCollectionRef = ref(db, "collections/" + auth.currentUser.uid + "/" + collectionId);
      await remove(userCollectionRef)
    } catch (e) {
      alert(e.message)
    }
  };

  const visionOfCollectionForm = () => {
    setCheckCollectionForm({edited: true})
  };

  console.log(collections)
  return (
    <>
      <Nav className="justify-content-center my-3">
        <Button onClick={() => visionOfCollectionForm()}>Create collection</Button>
        {checkCollectionForm.edited
          ?
          <CreateUserCollection
            setCheckCollectionForm={setCheckCollectionForm}
          />
          : null
        }
      </Nav>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4 ">

        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(collections, (collection, key) => (
            <Col key={key}>
              <Card className="mx-3" border="dark" style={{width: '20rem'}}>
                <Card.Img variant="top" src={collection.info.image} alt="..."/>
                <Card.Body>
                  <Card.Title >{collection.info.CollectionName}</Card.Title>
                  <Card.Header >{collection.info.topic}</Card.Header>
                  <Card.Text >{collection.info.description}</Card.Text>
                  <Button className="me-2" variant="outline-info" onClick={() => navigate("/user-page/create-collection/items",
                    {
                      state: collection.collectionKey
                    })}>
                    View collection
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteCollection(collection.collectionKey)}>
                    Delete collection
                  </Button>

                </Card.Body>
              </Card>
            </Col>
        ))}
      </Row>
    </>
  )
}


export default UserPage;