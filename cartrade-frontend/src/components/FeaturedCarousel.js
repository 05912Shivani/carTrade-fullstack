// src/components/FeaturedCarousel.js
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import mockCars from '../data/mockCars';

const featuredCars = mockCars.slice(0, 5); 

const FeaturedCarousel = () => {
  return (
    <Container className="my-5">
      <h3 className="mb-4">Featured Cars</h3>
      <Carousel>
        {featuredCars.map((car, index) => (
          <Carousel.Item key={car.id}>
           <img
  className="d-block w-100"
  src={car.image || 'https://via.placeholder.com/800x400?text=No+Image'}
  alt={`${car.make} ${car.model}`}
  style={{ height: '400px', objectFit: 'cover' }}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
  }}
/>

            <Carousel.Caption>
              <h4>{car.make} {car.model}</h4>
              <p>{car.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default FeaturedCarousel;
