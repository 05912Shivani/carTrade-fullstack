import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5 border-top">
      <Container>
        <Row className="text-md-start text-center">
          {/* About */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">🚗 About CarTrade</h5>
            <p>
              CarTrade is your trusted destination to explore, buy, and sell used and new cars across India. 
              Compare models, read reviews, and make the right decision with confidence.
            </p>
          </Col>

          {/* Popular Brands */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Popular Brands</h5>
           <ul className="list-unstyled">
  <li><a href="https://www.marutisuzuki.com/" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Maruti Suzuki</a></li>
  <li><a href="https://www.hyundai.com/in/en" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Hyundai</a></li>
  <li><a href="https://cars.tatamotors.com/" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Tata</a></li>
  <li><a href="https://auto.mahindra.com/" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Mahindra</a></li>
  <li><a href="https://www.kia.com/in/home.html" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Kia</a></li>
</ul>

          </Col>

          {/* Contact */}
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase fw-bold mb-3">Contact Us</h5>
            <p><FaEnvelope className="me-2" /> support@cartrade.com</p>
            <p><FaPhoneAlt className="me-2" /> +91-99999-99999</p>
            <p><FaMapMarkerAlt className="me-2" /> Mumbai, India</p>
            <div className="mt-3">
              <a href="#" className="text-light me-3 fs-5"><FaFacebook /></a>
              <a href="#" className="text-light me-3 fs-5"><FaTwitter /></a>
              <a href="#" className="text-light me-3 fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-light" />

        <p className="text-center mb-0 small">
          &copy; {new Date().getFullYear()} <strong>CarTrade WebApp</strong>. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
