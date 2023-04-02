import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, Form, Button, NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { removeToken, readToken } from '../lib/authenticate';


export default function MainNav() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let token = readToken();
  

  useEffect(() => {
    // add click event listener to the document
    document.addEventListener('click', handleClickOutside);
    return () => {
      // cleanup: remove click event listener from the document
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    
    if (navRef.current && path) {
      const isInsideDropdown = path.some(
        (element) => element.classList && element.classList.contains('dropdown-menu')
      );
      if (!isInsideDropdown && !navRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
  };
  
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };
  
  const handleClickDropdownChild = (event) => {
    setIsExpanded(false);
  }
  
  const handleSearchClick = (event) => {
    event.preventDefault();
    handleSubmit(onSubmit)();
  };

   const  onSubmit = async (data) => {
    if (isSubmitting) return; 
    setIsSubmitting(true);

    const searchField = data.search;
    const timestamp = new Date().toISOString(); 
    const queryString = `title=true&q=${searchField}`;
  
    const searchObject = {
      query: queryString,
      timestamp: timestamp
    };
    const searchObjectString = JSON.stringify(searchObject);
    //setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
    setSearchHistory(await addToHistory(searchObjectString));
 
    //setSearchHistory(current => [...current, searchObject]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false); // set isExpanded to false when form is submitted
    setIsSubmitting(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavClick = (event) => {
    setIsExpanded(false); // set isExpanded to false when a nav link is clicked
  };

  const logOut = () =>{
    removeToken()
    router.push('/')
  }

  return (
    <>
      <Navbar style={{borderBottom : '15px solid #D2042D ', borderRadius : '0px 0px 10px 10px'}}  className="fixed-top navbar-dark bg-dark" expand="lg" expanded={isExpanded} ref={navRef}>
        <Container>
        <Navbar.Brand href="/">
        <img
          src="/favicon.ico"
          height="40"
          className="d-inline-block align-top"
          alt="My logo"
        />
      </Navbar.Brand>
          <Link href="/" passHref legacyBehavior><Navbar.Brand>Saygin Saracoglu</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleExpanded} />
           <Navbar.Collapse id="responsive-navbar-nav"> 
            <Nav className="me-auto" onClick={handleNavClick}>
              <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"}>Home</Nav.Link></Link>
              {token &&
              <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link> }
              {token &&<NavDropdown onClick={handleDropdownClick} title="More" id="basic-nav-dropdown" style={{color:'white'}} active={router.pathname === "/favourites" || router.pathname === "/history"}>
                <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item onClick={handleClickDropdownChild} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item></Link>
                <Link href="/history" passHref legacyBehavior><NavDropdown.Item onClick={handleClickDropdownChild} active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
              </NavDropdown>}
            </Nav>
            {token && <Form className="d-flex" onSubmit={handleSubmit(onSubmit)}>
              &nbsp;
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                {...register("search")}
              />
              <Button
                variant="outline-success"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSearchClick}
              >Search
              </Button>   
              </Form>}           &nbsp;
              
              {token && <Button 
                variant="outline-danger"
                type="submit"
                onClick={logOut}
              >Log out
              </Button> }
              
              {!token &&<Nav>
              <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"}>Register</Nav.Link></Link>
              <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"}>Login</Nav.Link></Link>
              </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}

