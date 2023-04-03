/*********************************************************************************
 *  WEB422 – Assignment 5
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Saygin Saracoglu Student ID: 178139218  Date: 3/19/2023
 *
 *
 ********************************************************************************/

import Image from "react-bootstrap/Image";
import { Row, Col } from "react-bootstrap";
import Carousel from "../components/Carousel";

function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>The Metropolitan Museum of Art</h2>
      <Carousel />
      <br />

      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art, colloquially "the Met", is located
            in New York City and is the largest art museum in the United States.
            With 7.06 million visitors in 2016, it was the second most visited
            art museum in the world, and the fifth most visited museum of any
            kind. Its permanent collection contains over 2 million works,
            divided among 17 curatorial departments.
          </p>
        </Col>
        <Col md={6}>
          <p>
            The main building, located on the eastern edge of Central Park along
            Museum Mile, is by area one of the world's largest art galleries.
            There is also a much smaller second location at "The Cloisters" in
            Upper Manhattan that features medieval art.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
            target="_blank"
            rel="noreferrer"
          >
            Read more on Wikipedia
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
