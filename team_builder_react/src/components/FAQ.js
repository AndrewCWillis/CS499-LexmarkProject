import React, { useState } from 'react';
import help from '../data/help.json';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const FAQ = () => {
    const [show, setShow] = useState(false);
    const [displayedTitle, setTitle] = useState(false);
    const [displayedBody, setBody] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) =>{
        switch(e.currentTarget.id) {
            case "BP10":
              setTitle(help['titles'][0])
              setBody(help['bodies'][0])
              break;
            case "Starting":
                setTitle(help['titles'][1])
                setBody(help['bodies'][1])
              break;
            case "Purpose":
                setTitle(help['titles'][2])
                setBody(help['bodies'][2])
              break;
            default:
                setTitle("Lorem Ipsum")
                setBody("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
              
          }

        setShow(true)
    };

    return ( 
        <>
        <Navbar bg="primary" variant="dark" expand="lg" fixed="bottom">
            <Nav>
                <Navbar.Brand >Frequently Asked Questions</Navbar.Brand>
                <Nav.Link onClick={handleShow} id="BP10">What is BP10?</Nav.Link>
                <Nav.Link onClick={handleShow} id="Starting">How do I get started?</Nav.Link>
                <Nav.Link onClick={handleShow} id="Purpose">Our Purpose</Nav.Link>
                <Nav.Link href="Template.xlsx" id="Format" download>Download Data Format</Nav.Link>
            </Nav>
        </Navbar>

        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title id = "title">{displayedTitle}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body id = "body">
                {displayedBody}
            </Offcanvas.Body>
        </Offcanvas>

        </>
     );
}
 
export default FAQ;