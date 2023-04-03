import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer
      className={`fixed-bottom mt-5 bg-dark text-center ${styles.footer}`}
    >
      <Container className={styles["footer-content"]}>
        <p>&copy; Saygin Saracoglu {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}
export default Footer;
