import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Saved Cars</h2>
      {items.length === 0 ? (
        <p>No cars saved.</p>
      ) : (
        <>
          <Row>
            {items.map((car, index) => (
              <Col key={car._id || car.id || index} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={car.image}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                    }}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{car.make} {car.model}</Card.Title>
                    <Card.Text>
                      <strong>Year:</strong> {car.year}<br />
                      <strong>MSRP:</strong> ₹{car.msrp}
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeFromCart(car._id || car.id))}
                    >
                      Remove
                    </Button>

                  </Card.Body>
                </Card>
              </Col>
            ))}

          </Row>

          <div className="mt-4 text-end">
            <h5>Total Saved Cars: {items.length}</h5>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
