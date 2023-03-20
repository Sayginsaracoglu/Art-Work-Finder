import validObjectIDList from '../../public/data/validObjectIDList.json';
import { useEffect, useState, useRef } from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Button, Pagination } from 'react-bootstrap';
import Error from 'next/error';
import useSWR from 'swr';
import { Row, Col } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';
import NumberFormat from 'react-number-format';
import styles from '../../styles/Button.module.css'


const PER_PAGE = 12;

function Home() {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  const pageNumberInput = useRef(null);
  const [pageNumberError, setPageNumberError] = useState('');

  
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0
    }
  );

  useEffect(() => {
    if (data) {
      const results = [];
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  function goToPage(event) {
    event.preventDefault();
    const newPageNumber = parseInt(pageNumberInput.current.value, 10);
    if (newPageNumber >= 1 && newPageNumber <= artworkList.length) {
      setPage(newPageNumber);
      setPageNumberError('');
    } else {
      setPageNumberError(`Please enter a page number between 1 and ${artworkList.length}`);
    }
    pageNumberInput.current.value = '';
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!artworkList) {
    return null;
  }
  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={4} key={currentObjectID}>
              <ArtworkCard objectId={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4 style={{color : 'black'}}>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      {artworkList.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          
          <div className="d-flex justify-content-center mb-2">
            
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <div className="d-flex justify-content-center mb-4">
                <Pagination style={{ borderRadius: '0.25rem' }}>
                  {page > 1 && <Pagination.Prev onClick={previousPage} />}
                  <Pagination.Item>{page}</Pagination.Item>
                  {page < artworkList.length && <Pagination.Next onClick={nextPage} />}
                </Pagination>
              </div>
              <input
                type="number"
                min="1"
                max={artworkList.length}
                ref={pageNumberInput}
                className="form-control form-control-sm d-inline-block mx-2"
                style={{ width: '5rem', height: '37px', textAlign: 'center' }}
                placeholder={`1 ... ${artworkList.length}`}
              />
              <button onClick={goToPage} type="submit" className={`btn btn-primary btn-sm ${styles.Button}`} style={{height:'35px', width:'5rem', marginTop: '3px', marginBottom: '15px' }}>Go</button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );  
}
export default Home;
