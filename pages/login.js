import { useState } from "react";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import Link from "next/link";
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { favouritesAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import styles from "../styles/Button.module.css";

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"];

export default function Login(props) {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      updateAtoms();
      router.push("/favourites");
    } catch (err) {
      setWarning(err.message);
    }
  }

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      {warning && (
        <Alert variant="danger" dismissible onClose={() => setWarning("")}>
          <span>{warning}</span>
        </Alert>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "85vh",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "450px",
            paddingBottom: "10px",
            borderRadius: "13px",
            backgroundColor: "rgba(33, 37, 41, 0.8)",
            height: "370px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)", // for Safari
            //border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              width: "106%",
              display: "flex",
              borderRadius: "10px 10px 0 0 ",
              backgroundColor: "rgba(33, 37, 41, 0.8)",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)", // for Safari
              //border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: "1px 1px 19px rgba(0, 0, 0, 1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
          </div>
          <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
            <Form.Group>
              <Form.Label></Form.Label>

              <Form.Control
                className={styles["userInput"]}
                style={{ backgroundColor: "black", color: "white" }}
                type="text"
                id="userName"
                name="userName"
                placeholder="Username"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                className={styles["userInput"]}
                style={{ backgroundColor: "black", color: "white" }}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                className={styles["RegisterLoginBtn"]}
                variant="primary"
                type="submit"
                style={{
                  width: "100%",
                  marginBottom: "15px",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                Login
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ borderBottom: "1px solid white", width: "45%" }} />
              <div style={{ color: "white" }}>or</div>
              <div style={{ borderBottom: "1px solid white", width: "45%" }} />
            </div>
          </Form>
          <Link passHref legacyBehavior href="/login">
            Don't have an account? Register
          </Link>
        </Container>
      </div>
    </>
  );
}
