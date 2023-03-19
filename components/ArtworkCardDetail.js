import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import FavouritesIcon from './FavouritesIcon';

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
    <Card>
      {primaryImage && <Card.Img src={primaryImage} />}
      <Card.Body>
        <div className="flex items-center justify-between">
          
        <Card.Title>{title || 'N/A'}</Card.Title>
        <div className="ml-2">
        <FavouritesIcon objectId={objectId} />
          </div>
        </div>
        <Card.Text>
          {objectDate || 'N/A'} | {classification || 'N/A'} | {medium || 'N/A'}
          <br />
          <br />
          {artistDisplayName && (
            <span>
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
            </span>
          )}
          {artistDisplayName || 'N/A'} | {creditLine || 'N/A'} | {dimensions || 'N/A'}
          

        </Card.Text>
        <Link href={`/artwork/${objectId}`} passHref>
          <button>View details ({objectId})</button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
