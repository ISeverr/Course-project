import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import { useListVals} from "react-firebase-hooks/database";
import {ref} from "firebase/database";
import _ from 'lodash';
import { Card, Col, Container, Row, Stack} from "react-bootstrap";


const HomePage = () => {
  const {db} = useContext(AuthContext);
  const [values, loading, error] = useListVals(ref(db, 'collections'));
  const [showCollection, setShowCollection] = useState(null);

  useEffect(() => {
    const checkCollection = _.map(values, (value) => _.map(value, (items) => {
      if (items.items)
        return items.items
    }));
    setShowCollection(checkCollection)
  }, [values])

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4 mx-4 my-3">
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(showCollection, (collections) => (
          _.map(collections, (collection) => (
            _.map(collection, (items, key) => (
              <Col key={key}>
                <Card
                  className="mx-3"
                  border="dark"
                  style={{maxWidth: '20rem'}}
                >
                  <Card.Body>
                    <Card.Title>{items.name}</Card.Title>
                    <Card.Header>{items.tag}</Card.Header>
                    <Card.Text>{items.value}</Card.Text>
                  </Card.Body>
                  <Stack className="col-md-6 mx-auto mb-3">
                  </Stack>
                </Card>
              </Col>
            ))
          ))
        ))

        }
      </Row>
    </Container>
  )
}


export default HomePage;