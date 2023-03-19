import { useState } from 'react';
import { SWRConfig } from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import useSWR from 'swr';
import styles from '../styles/Card.module.css'
import FavouritesIcon from './FavouritesIcon';


function ArtworkCard({objectId}) {

  

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
        {
          revalidateOnFocus: false,
          errorRetryCount: 0
        }
    );

    if (error) {
        return <Error statusCode={404} />;
    }

    if (!data) {
    return null;
    }
  
    
  const { primaryImageSmall,additionalImages, title, objectDate, classification, medium } = data;
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

    return(
        <>  
    <Card className={`${styles.card}`} >
      <Card.Img style={{height:'15rem'}} variant="top" src={imageSrc} />
      <Card.Body style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Card.Title style={{color:'white'}}>{artworkTitle}</Card.Title>
        <FavouritesIcon objectId={objectId} />
        <Card.Text style={{height:'11rem', overflow:'auto'}}>
          Date: {artworkDate}
          <br />
          Classification: {artworkClassification}
          <br />
          Medium: {artworkMedium}
        </Card.Text>
        <Link href={`/artwork/${objectId}`} passHref>
          <Button className={`${styles.ButtonCard}`} variant="primary">ID : {objectId}</Button>
        </Link>
      </Card.Body>
    </Card>
        </>

    )

}

export default ArtworkCard;