import React from 'react'
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import styles from '../styles/History.module.css';

export default function history(){
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h.query);
        let entries = params.entries();

        parsedHistory.push(Object.fromEntries(entries));
    });
    console.log(parsedHistory)

    function historyClicked(e,index){
        router.push(`/artwork?${searchHistory[index].query}`)
    }

    function removeHistoryClicked(e,index){
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });   
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
  return (
    <>
      {searchHistory.length === 0 && (
        <Card>
        <Card.Body>
          <h4 style={{color : 'black'}}>Nothing Here</h4>
          Try searching for some artwork.
        </Card.Body>
      </Card>
      )}
      {searchHistory.length > 0 && (
        <ListGroup>
          {searchHistory.map((historyItem, index) => {
            const params = new URLSearchParams(historyItem.query);
            const queryObj = Object.fromEntries(params.entries());
            const timestamp = new Date(historyItem.timestamp).toLocaleString();
            return (
              <ListGroup.Item className={styles.historyListItem} key={index} onClick={e => historyClicked(e, index)}>
                <span className="float-start ms-3">{timestamp}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                {Object.keys(queryObj).map(key => (
                  <React.Fragment key={key}>
                    {capitalizeFirstLetter(key)}: <strong>{queryObj[key]}</strong>&nbsp;
                  </React.Fragment>
                ))}
                
                <Button
                  className="float-end ms-3"
                  variant="danger"
                  size="sm"
                  onClick={e => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  )
}
