import { Carousel, Image } from 'react-bootstrap';

function MyCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/The_Met_Cloisters.jpg" fluid rounded  />
      </Carousel.Item>
      <Carousel.Item>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/The_Cloisters_Hudson_River_crop.jpg/1200px-The_Cloisters_Hudson_River_crop.jpg" alt="The Cloisters Hudson River crop.jpg" fluid rounded />
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;