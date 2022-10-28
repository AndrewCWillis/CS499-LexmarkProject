import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const FAQ = () => {
    const [show, setShow] = useState(false);
    const [displayedTitle, setTitle] = useState(false);
    const [displayedBody, setBody] = useState(false);

    const titles = ["Gallup's BP10", "Getting Started"]
    const bodies = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores \
    et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, \
    id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. \
    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, \
    omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus \
    saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, \
    ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."]
    

    const handleClose = () => setShow(false);
    const handleShow = (e) =>{
        switch(e.currentTarget.id) {
            case "BP10":
              setTitle(titles[0])
              setBody(bodies[0])
              break;
            case "Starting":
                setTitle(titles[1])
                setBody(bodies[1])
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