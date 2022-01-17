//import {Button, Col, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import {ref, getDatabase} from 'firebase/database';
import {useList, useListVals} from "react-firebase-hooks/database";
import _ from "lodash";
import CreateItemUserCollection from "./CreateItemUserCollection";

const UserPage = () => {
  const {auth, db} = useContext(AuthContext);
  const [checkForm, setCheckForm] = useState([{}])
  const [collections, loading, error] = useListVals(ref(db, 'collections/' + auth.currentUser.uid),
    {
      keyField: "collectionKey"
    });

  const visionOfForm = (collectionId) => {
    setCheckForm([...checkForm, {id: collectionId, edited: true}])
  }

  return (
    <>
      {/*<h1>USER PAGE</h1>*/}
      <Link to="/user-page/create-collection">Create collection</Link>
      <Link to="/user-page/create-collection/edit-collection">Edit collection</Link>
      <div>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>List: Loading...</span>}
        {!loading && _.map(collections, (collection, key) => (
          <>
            <div key={collection.collectionKey}>Collection</div>
            <div key={collection.name}>name: {collection.name}</div>
            <div key={collection.description}>description: {collection.description}</div>
            <div key={collection.topic}>topic: {collection.topic}</div>
            <button key={key} onClick={() => visionOfForm(collection.collectionKey)}>Create item</button>
            {checkForm.find((docId) => docId.id === collection.collectionKey && docId.edited) ?
              <div><CreateItemUserCollection setCheckForm={setCheckForm} collectionId={collection.collectionKey}/></div> : null}
            <hr/>
          </>
        ))}
      </div>
    </>
  )
}


export default UserPage;