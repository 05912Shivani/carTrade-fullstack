import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const SellCar = () => {
  const [formData, setFormData] = useState({
    owner: '',
    contact: '',
    name: '',
    brand: '',
    year: '',
    price: '',
    location: '',
    image: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    fetchCarListings();
  }, []);

  const fetchCarListings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars', { withCredentials: true });
      setCarList(res.data);
    } catch (err) {
      console.error('Error fetching car listings:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/cars', formData, { withCredentials: true });
      setCarList((prev) => [...prev, res.data]);
      setSubmitted(true);
      setFormData({ owner: '',contact: '',name: '', brand: '', year: '', price: '', location: '', image: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Error submitting car:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, { withCredentials: true });
      setCarList((prev) => prev.filter((car) => car._id !== id));
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Sell Your Car</h2>
      {submitted && <Alert variant="success">Car listing submitted successfully!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="owner" className="mb-3">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                placeholder="e.g., Shivani Sharma"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="contact" className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="e.g., 9876543210"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Car Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Swift VXI"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g., Maruti"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="year" className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="e.g., 2021"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Expected Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 450000"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="location" className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Delhi"
                required
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Car Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste direct image URL here"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">Submit Listing</Button>
      </Form>

      {/* Car List Preview */}
      <div className="mt-5">
        <h4>Your Submitted Cars</h4>
        <Row>
          {carList.map((car) => (
            <Col md={4} className="mb-4" key={car._id}>
              <Card>
              <img
  src={car.image || 'https://source.unsplash.com/400x250/?car'}
  alt="car"
  style={{ height: '200px', width: '100%', objectFit: 'cover' }}
/>


                <Card.Body>
                  <Card.Title>{car.name} - {car.brand}</Card.Title>
                  <Card.Text>
                    <strong>Owner:</strong> {car.owner}<br />
                    <strong>Contact:</strong> {car.contact}<br />
                    <strong>Year:</strong> {car.year}<br />
                    <strong>Price:</strong> ₹{parseInt(car.price).toLocaleString()}<br />
                    <strong>Location:</strong> {car.location}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(car._id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default SellCar;
