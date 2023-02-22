import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button, Pagination } from 'react-bootstrap';
import Error from 'next/error';
import useSWR from 'swr';
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';



const PER_PAGE = 12;

function Home() {

const [artworkList, setArtworkList] = useState([]);
const [page, setPage] = useState(1);
const router = useRouter();
let finalQuery = router.asPath.split('?')[1];



const { data, error } = useSWR(
  
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0
    }
);

function previousPage(){
    if(page > 1 ){
        setPage(page - 1)
    } 
};

function nextPage(){
    if(page < artworkList.length ){
        setPage(page + 1)
    }
};

useEffect(() => {
    if (data) {
      const results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if(error){
    return  <Error statusCode={404} /> 
  }

  if (!artworkList) {
    return null;
  }


return(
<>
<Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map(currentObjectID => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectId={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              {page > 1 && <Pagination.Prev onClick={previousPage} />}
              <Pagination.Item>{page}</Pagination.Item>
              {page < artworkList.length && <Pagination.Next onClick={nextPage} />}
            </Pagination>
          </Col>
        </Row>
      )}
</>

)

}

export default Home;
