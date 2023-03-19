import React from 'react'
import { Card} from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store.js';
import ArtworkCard from '../components/ArtworkCard';

function favourites() {
//let favouritesList =  ['8079','5624'];

const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

console.log(favouritesList)
console.log(favouritesList.length)

  return (
    <>
    <Row className="gy-4">
      {favouritesList.length > 0 ? (
        favouritesList.map((currentObject) => (
          <Col lg={4} key={currentObject}>
            <ArtworkCard objectId={currentObject} />
          </Col>
        ))
      ) : (
        <Col>
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try adding some new artwork to the list.
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  </>
  )
}

export default favourites;


