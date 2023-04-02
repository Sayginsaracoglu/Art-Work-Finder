// import React from 'react'
// import { useAtom } from 'jotai';
// import { searchHistoryAtom } from '../store';
// import { useRouter } from 'next/router';
// import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
// import styles from '../styles/History.module.css';
// import { removeFromHistory } from '../lib/userData';

// export default function history(){
//     const router = useRouter();
//     const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
//     if(!searchHistory) return null;
//     let parsedHistory = [];


//     searchHistory.forEach(h => {
//       let parsedHistoryItem = {};
//       try {
//           parsedHistoryItem = JSON.parse(h.query);
//       } catch (error) {
//           console.error(`Error parsing history item with query "${h.query}"`);
//       }
//       parsedHistory.push(parsedHistoryItem);
//   });
//   console.log(parsedHistory)

//     function historyClicked(e,index){
//       router.push(`/artwork?${JSON.stringify(searchHistory[index].query)}`)
//     }

//     async function removeHistoryClicked(e,index){
//         e.stopPropagation(); // stop the event from trigging other events
        
//         setSearchHistory(await removeFromHistory(JSON.stringify(searchHistory[index].query))) 
//         // setSearchHistory(current => {
//         //     let x = [...current];
//         //     x.splice(index, 1)
//         //     return x;
//         // });   
//     }

//     function capitalizeFirstLetter(str) {
//         return str.charAt(0).toUpperCase() + str.slice(1);
//       }
//   return (
//     <>
//       {searchHistory.length === 0 && (
//         <Card>
//         <Card.Body>
//           <h4 style={{color : 'black'}}>Nothing Here</h4>
//           Try searching for some artwork.
//         </Card.Body>
//       </Card>
//       )}
//       {searchHistory.length > 0 && (
//         <ListGroup>
//           {searchHistory.map((historyItem, index) => {
//             const params = new URLSearchParams(historyItem.query);
//             const queryObj = Object.fromEntries(params.entries());
//             const timestamp = new Date(historyItem.timestamp).toLocaleString();
//             return (
//               <ListGroup.Item className={styles.historyListItem} key={index} onClick={e => historyClicked(e, index)}>
//                 <span className="float-start ms-3">{timestamp}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
//                 {Object.keys(queryObj).map(key => (
//                   <React.Fragment key={key}>
//                     {capitalizeFirstLetter(key)}: <strong>{queryObj[key]}</strong>&nbsp;
//                   </React.Fragment>
//                 ))}
                
//                 <Button
//                   className="float-end ms-3"
//                   variant="danger"
//                   size="sm"
//                   onClick={e => removeHistoryClicked(e, index)}
//                 >
//                   &times;
//                 </Button>
//               </ListGroup.Item>
//             );
//           })}
//         </ListGroup>
//       )}
//     </>
//   )
// }

import React from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { useRouter } from 'next/router';
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import styles from '../styles/History.module.css';
import { removeFromHistory } from '../lib/userData';

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  console.log(typeof searchHistory)
  if (!searchHistory) return null;

  const parsedHistory = [];
  searchHistory.forEach(doc => {
    const searchObject = JSON.parse(doc);
    const query = searchObject.query;
    const timestamp = searchObject.timestamp;
    parsedHistory.push({ query, timestamp });
  });
  

  async function historyClicked(e, index) {
    const query = parsedHistory[index].query;
    router.push(`/artwork?${query}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from triggering other events
    const query = searchHistory[index].query;
    const newHistory = await removeFromHistory(searchHistory[index]);
    setSearchHistory(newHistory);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {searchHistory.length === 0 && (
        <Card>
          <Card.Body>
            <h4 style={{ color: 'black' }}>Nothing Here</h4>
            Try searching for some artwork.
          </Card.Body>
        </Card>
      )}
      {searchHistory.length > 0 && (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => {
            const query = historyItem.query;
            const timestamp = new Date(historyItem.timestamp).toLocaleString();
            const queryObj = historyItem.query;
            return (
              <ListGroup.Item
                className={styles.historyListItem}
                key={index}
                onClick={e => historyClicked(e, index)}
              >
                <span className="float-start ms-3">
                  {timestamp}&nbsp;&nbsp;|&nbsp;&nbsp;
                </span>
                <div style={{overflow:'hidden',}}>
                   <strong>{queryObj}</strong>&nbsp;
                </div>
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
  );
}
