import Image from 'react-bootstrap/Image';
import { Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
      <h2>The Metropolitan Museum of Art</h2>
      <Image style={{boxShadow: '1px 6px 6px 1px black'}} src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
      <br />
      
      <Row>
        <Col md={6}>
          <p>The Metropolitan Museum of Art, colloquially "the Met", is located in New York City and is the largest art museum in the United States. With 7.06 million visitors in 2016, it was the second most visited art museum in the world, and the fifth most visited museum of any kind. Its permanent collection contains over 2 million works, divided among 17 curatorial departments.</p>
        </Col>
        <Col md={6}>
          <p>The main building, located on the eastern edge of Central Park along Museum Mile, is by area one of the world's largest art galleries. There is also a much smaller second location at "The Cloisters" in Upper Manhattan that features medieval art.</p>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Read more on Wikipedia</a>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
