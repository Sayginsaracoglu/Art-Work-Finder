import { useState } from 'react';
import { SWRConfig } from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import useSWR from 'swr';
import styles from '../styles/Card.module.css';

function ArtworkCard({ objectId }) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`, {
    revalidateOnFocus: false,
    errorRetryCount: 0,
  });

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const { primaryImageSmall, additionalImages, title, objectDate, classification, medium } = data;
  let imageSrc = '';
  if (primaryImageSmall) {
    imageSrc = primaryImageSmall;
  } else if (additionalImages.length > 0) {
    imageSrc = additionalImages[0];
  } else {
    imageSrc = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  }

  const artworkTitle = title || 'N/A';
  const artworkDate = objectDate || 'N/A';
  const artworkClassification = classification || 'N/A';
  const artworkMedium = medium || 'N/A';

  return (
    <Card className={`${styles.card} ${styles.modernCard}`}>
    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
      <Card.Title style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff', fontFamily: 'Roboto', fontWeight: 600, marginRight: 'auto' }}>{artworkTitle}</Card.Title>
      
    </Card.Body>
    <Link href={`/artwork/${objectId}`} passHref>
    <Card.Img style={{ height: '15rem', borderRadius: '15px', boxShadow: '-10px 15px 7px rgba(0, 0, 0, .7), 10px 15px 7px rgba(0, 0, 0, .7)', objectFit: 'cover' }} variant="top" src={imageSrc} />

    </Link>
    <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <Card.Text style={{ height: '11rem', overflow: 'auto',textAlign: 'left', color: '#fff', fontFamily: 'Roboto', fontSize: '1.2rem', marginBottom: '1rem' }}>
        Date: {artworkDate}
        <br />
        Classification: {artworkClassification}
        <br />
        Medium: {artworkMedium}
      </Card.Text>
      <Link href={`/artwork/${objectId}`} passHref>
        <Button className={`${styles.ButtonCard}`} variant="primary">
          ID : {objectId}
        </Button>
      </Link>
    </Card.Body>
  </Card>
  );
}

export default ArtworkCard;
