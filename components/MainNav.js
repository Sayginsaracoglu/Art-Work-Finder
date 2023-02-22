import React from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';



function MainNav() {

  const { register, handleSubmit } = useForm();
  const router = useRouter();
    
    
  const onSubmit = (data) => {
      const searchField = data.search;
      router.push(`/artwork?title=true&q=${searchField}`);
  };
    

  return(<>
 
  <Navbar className="fixed-top navbar-dark bg-dark">
    <Container>
    <Link href="/" passHref legacyBehavior><Navbar.Brand>Saygin Saracoglu</Navbar.Brand></Link>
      <Nav className="me-auto">
      <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
      <Link href="/search" passHref legacyBehavior><Nav.Link>Advanced Search</Nav.Link></Link>
      <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              {...register("search")}
            />
            <Button  variant="outline-success" type='submit'>Search</Button>
          </Form>
      </Nav>
    </Container>
  </Navbar>
  <br />
  <br />
</>
) 
}

export default MainNav;
