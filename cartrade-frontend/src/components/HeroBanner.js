import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';

const HeroBanner = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div
      className="bg-dark text-white text-center py-5"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1549921296-3a6b7c7c863b)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Container>
        <h1 className="display-4 fw-bold">Find Your Dream Car</h1>
        <p className="lead">Search from a wide range of cars. Best deals, verified listings.</p>
        <Button variant="light" onClick={handleShow}>
          Get Started
        </Button>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to CarTrade!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>🚗 You can browse all cars below without logging in.</p>
          <p>🔒 To bookmark cars or save them, please log in.</p>
          <p>✨ Enjoy exploring a wide range of vehicles!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Start Browsing
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HeroBanner;
