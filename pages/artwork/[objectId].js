import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "../../components/ArtworkCardDetail";

function ArtworkById() {
  const router = useRouter();
  const { objectId } = router.query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectId={objectId} />
      </Col>
    </Row>
  );
}
export default ArtworkById;
