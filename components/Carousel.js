import { Carousel, Image } from "react-bootstrap";

function MyCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image
          style={{ width: "100%", height: "auto" }}
          src="/Met1.avif"
          fluid
          rounded
          alt="Central Park, NYC"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          style={{ width: "100%", height: "auto" }}
          src="/Met2.avif"
          fluid
          rounded
          alt="Met Cloister"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
