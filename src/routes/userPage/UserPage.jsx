//import {Button, Col, Modal} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../hoc/AuthProvider";
import { ref, remove, child } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import _ from "lodash";
import { Button, Card, Col, Container, Nav, Row, Stack } from "react-bootstrap";
import CreateCollection from "./modals/CreateCollection";
import { ref as sRef, deleteObject } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";

const UserPage = () => {
  const { auth, db, storage } = useContext(AuthContext);
  const navigate = useNavigate();
  const [checkCollectionForm, setCheckCollectionForm] = useState({});
  const [collections, loading, error] = useListVals(
    ref(db, "collections/" + auth.currentUser.uid),
    {
      keyField: "collectionKey",
    }
  );
  const [editCollection, setEditCollection] = useState(null);

  const deleteCollection = async (data) => {
    try {
      const userCollectionRef = ref(
        db,
        `collections/${auth.currentUser.uid}/${data.collectionKey}`
      );
      await remove(userCollectionRef);
      const imageRef = sRef(storage, `images/${data.info.imageName}`);
      if(!imageRef === "images/undefined"){
        await deleteObject(imageRef)
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const visionOfCollectionForm = () => {
    setCheckCollectionForm({ edited: true });
    setEditCollection(null);
  };

  const edit = (collectionKey) => {
    visionOfCollectionForm();
    setEditCollection(collectionKey);
  };

  return (
    <Container>
      <Nav className="justify-content-center my-3">
        <Button
          className="me-2"
          variant="outline-secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button onClick={() => visionOfCollectionForm()}>
          Create collection
        </Button>
        {checkCollectionForm.edited ? (
          <CreateCollection
            setCheckCollectionForm={setCheckCollectionForm}
            editCollection={editCollection}
          />
        ) : null}
      </Nav>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading &&
          _.map(collections, (collection) => (
            <Col key={collection.collectionKey}>
              <Card
                className="mx-3"
                border="dark"
                style={{ maxWidth: "20rem" }}
              >
                <Card.Img
                  variant="top"
                  style={{ maxHeight: "20rem" }}
                  className="img-thumbnail"
                  src={collection.info.imageURL}
                  alt="No Image"
                />
                <Card.Body>
                  <Card.Title>{collection.info.CollectionName}</Card.Title>
                  <Card.Header>{collection.info.topic}</Card.Header>
                  <Card.Text>{collection.info.description}</Card.Text>
                  <Button
                    className="me-2"
                    variant="outline-info"
                    onClick={() =>
                      navigate("/user-page/create-collection/items", {
                        state: collection.collectionKey,
                      })
                    }
                  >
                    View collection
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => edit(collection.collectionKey)}
                  >
                    Edit collection
                  </Button>
                </Card.Body>
                <Stack className="col-md-6 mx-auto mb-3">
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteCollection(collection)}
                  >
                    Delete collection
                  </Button>
                </Stack>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default UserPage;
