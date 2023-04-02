import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import FavouritesIcon from './FavouritesIcon';
import styles from '../styles/CardDetails.module.css';


const ArtworkCardDetail = ({ objectId }) => {
  const { data, error } = useSWR(objectId ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}` : null);


  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions
  } = data;

  return (
  <Card className={styles['artwork-card']}>
  {primaryImage && <Card.Img src={primaryImage} />}
  <Card.Body>
    <div className="d-flex justify-content-between align-items-center">
      <Card.Title>{title || 'N/A'}</Card.Title>
      <div className="favourites-icon">
        <FavouritesIcon objectId={objectId} />
      </div>
    </div>
    <Card.Text>
      <span className="card-info">
        <span className="card-info__row">
          <span className="card-info__label">Date: </span>
          <span className="card-info__value">{objectDate || 'N/A'}</span>
        </span>
        <br/>
        <span className="card-info__row">
          <span className="card-info__label">Classification: </span>
          <span className="card-info__value">{classification || 'N/A'}</span>
        </span>
        <br/>
        <span className="card-info__row">
          <span className="card-info__label">Medium: </span>
          <span className="card-info__value">{medium || 'N/A'}</span>
        </span>
        <br/>
      </span>
      {artistDisplayName && (
        <span className="card-artist">
          <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
          {artistDisplayName || 'N/A'}
        </span>
      )}
      
      <span className="card-info">
        <span className="card-info__row">
          <span className="card-info__label">Credit Line: </span>
          <span className="card-info__value">{creditLine || 'N/A'}</span>
        </span>
        <br/>
        <span className="card-info__row">
          <span className="card-info__label">Dimensions: </span>
          <span className="card-info__value">{dimensions || 'N/A'}</span>
        </span>
      </span>
    </Card.Text>
  </Card.Body>
</Card>
  );
};

export default ArtworkCardDetail;
