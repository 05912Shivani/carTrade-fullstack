import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import mockCars from '../data/mockCars';
import HeroBanner from '../components/HeroBanner';
import FeaturedCarousel from '../components/FeaturedCarousel';

import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

const popularBrands = [
  { name: 'Maruti', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCHPEZfCWoAHjrN-FMbkVbTnoBnbZeZvY0HQ&s' },
  { name: 'Hyundai', logo: 'data:image/jpeg;base64,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' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/512px-Honda_Logo.svg.png' },
  { name: 'Tata', logo: 'https://www.purppledesigns.com/wp-content/uploads/2023/11/images-1.jpg' },
  { name: 'Toyota', logo: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMHBhUSBxMWFhUWGBYXGBgYGRcdGhwaGh0XHx0YGxggHSgiGBslGxgYITEjJSkuLi8uFx8/RDMsNygtLisBCgoKDQ0NDg0NDi0ZHxk3KysrKystNysrLSsrKysrKysrKysrKysrKysrKysrKysrLSsrKysrKysrKysrKysrK//AABEIAKMBNgMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xABGEAACAQMBBAYFCQUGBgMAAAAAAQIDBBEFBhIhMRNBUWFxgQciMpGhFBUzQlJicpKxIySCosEWssLR8PFDU2Oz0+ElNJP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR91qihXdOzi6tVc4xxiOf+ZN8IduPaa5JgSBp3uqUbCSV5VhFvlFtbz8I85eSNC8pyjQdTX7lUodcKcnTj4OrwnN/hcM/ZISW1VrpknDQrdylLrUdzeffwdST73HzAsD1t1F+5W1xU79xU/8AvSg/ceSvLyX0VtSiv+pXafujSkviV/5x1bUv/q0I0ovk5JRa/M5N/kRg1DSr6hYzrazfxpwhFyk477wl+Ho8vyAsburtL1o2y/jqS/wIwz1O6p8427/iqL/Cyv6Bo069lGrrNSvmaUo05VJKST4pzxJ7smvqJvHb1LDtBpNSlaueiVKilHjuOpPEu5SzmL95RYf7RXFN/tbek19yu8+6VJfqfdPa6Cf73Qr0+/dhNeSpylL4FX0DTLjXNIjcaVeqUZZTjVjPehKLxKE05zSknlcvgzJcaTqNqv2tGnWXbBxz5JdF+jILtYa7bahPdtK0HL7De7PzhLEl7iROQ3dSFV7mo0p039mpHeXjhxi1/CpGxZ6vdaTHe0+tv01zjNupBdzy1Ok+xNx8GB1YFV0DbijqdRU75dBVfBKTzCT7IVOGX3SSfYmWoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR2pxlePoaDcU/pJLmo/ZT6pS5dyYGvUuZ6vWcLCThSi2p1Y+1JrnCm+pdTn5LjxWltTrlLYvQN6nCKy9ynDqcnluUnza5yb5vxZu09XoWmuU7C3wp9G54XKKjjdj4tbzx2RZEekawr3dhCVjGnOMc70KlOM1x5SSfmuHaBg0HQpa5Tjda1OUnNb0c8Huvj6seVKLXUuL63kt1lYUrGGLOEY+C4vxfN+ZobOa7S1izj0TUaiS36fXFrnhdcex/7EwAK/tHbfOd5Ro1ONKEumqLqlucYQfat/dbXgWAwQpKfrS6/wBM/wCWPcBU9d1lWN1TpQjv168moQzzS9qb4NqKyuS4trvaw0L51L9297Ho66j0kY8cTgubjnipLs45XFPg0sexVuta2vvdRq8Y05/I7f7safGrJfim8Z7n2m76SbJ09Mhf2i/bWM1XTX1qS4Vqb7nTy/GKA0NkY/NG1tanDhTuIqtjqU1iMmvfFP8AFHsL+Vu6sFK6t7i0fq72Mr7FaLX9503/AAlhpT6Skn2pMD5uLeFzT3bmMZLskk18Sr61slFRdTScxnFPEU+OOtRff9l5TLaaWpanT06H7eS3n7MV7T8F2d/IDkis4a7p06lvHEoS3KsN3Ce9ndmov2U8NOPU1w4PClNl9saugV40NoG5UHwjVllypdim/rU+98Y969m+zpqtZ7lOKTliU8LHf72+3qKxrVtbVNThZXKSqVIOafniMX2b2J4/CwL7F70cx5HpVNjI1dIzZX2XGPGhJ/Y66b/D1dzx1FrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPirUVKk5T5JNvwRqXFytM0qda6+pGU5+OMtf0XkfOu11b6a3Lk50ovwnUhF/CRWvSjqC/sdVjbvjLdi/DP/AKAoWzOjXe1yuNSsqu5cU68Z0G+UpxT34PP1ejmoLq4nUNn9p46klS1KPQ3HJ05cFJrn0bftfh9pdmOL1/RfZKx2Gt0ucoyqPxnKUv0aXkS+saHR1am1cxWe3C6uWVyYGtqey1C+q78U6dTnvweHnt7M9/PvNb5DqFgv3OvCslyVWLT964vzka7tL7RV+5TdamvqzzPC7m2pr80kuw8pbcwpT3dUoypy68NNe6W5L3RYGx8831vwurHe+9TqL4RxJ/EmLu4dvosqiTzGm2ljjnd4LHbk0aW1lpVjlVd38cZQ+MkkbkdWpVKG/CcXB8pZW6/PkBS9gdW/s/stSoX9vc9Kt+dRqmmt+pOU3x3uON7HkTd7tPSu7SdOpbXTjOMoNdEuUk0/rdjJZ6tTfsyj70Yqmr017Tj70Ua+xVCpR2OtqeprFSnTjCWf+m8KWexqKfmaVHXLvc3bW1TWXic6iSabbTUMJ4x3khDW4ST6GUXjnhr44NGe19CEcwnvL7kZSXvimgPej1G++mqRpLspxeffL+kjZ07ZmFtV36zcp83KT3pZ7ePBeab7yInto6092wpSnLqy0l7o70v5TPGzv9ZX73UdGm/qwzBtdjll1H5OBBv69tJR0WLpWcemr9VKDy8vk6kuO4n3+s+pM57ruy13aaTPU9WqZup1oTnGPs06S9WnCPHhuyef4utrL6douz9HR4fu8VvcXnC5vm0upvt5vtM+vWqvtFrU5fWpzXnh4+OANbZ+8jrejUq0vaaWX1qWMNktSnv00/8AWetHO9l7+Wj6RBT4ZlL4f7lx2bvvnDT3OP8AzKq/mb/qBKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAK76Qsx2Pryj9RQqeVOcJt+6LKNTuPn20dJvOUmvJo6nqFnHULCpRuFmFSEoSX3ZJp/BnAdCvZ6DrSp6h7VGo6dT+F4bXc16y7mgO57M0Pk2g0ab+pFR93AkyvaFrEZ6lO3qNb2N+HeuHLyafvLCAMVxbwuYYuIRkuySTXuZlAFT2n2Xtaeh3FW1oRhUhRqzg4ZjiUYSaeItJ8UuDRRfnP5ZsdBJ8eig1+JJNPxysnX7+h8psakPtwlH3pr+p+ctn73/4KnGfVHda8OAHTNmNiqOtbOW9xXrV1OrShOSi6e6pSSckswbSTzzbJReje3T+nufzUv/GZ/RfcdJslCm+dGdSm/DLlH+WcfcWLVrr5FplSp9mEmvHHBebwgOU2V2rTR01zlKs8vm4xk4wy+v1V+pLeifRqGrbLqvqVKNSbq1knPL9WM2orD4YXLlyKTr9x8hpxpJ/R0kn+Jpt/FnTfQ5bu39HNt0nOfS1PKdSbX8rQFutrWFrDFtCMF2RSS+BmAAHzUW9Bp9awfR8t5ljzA5f6Ta0dJnRpUOHqzk/Npf0ZYfRM3U2MhUqf8SpXl5KpKKfuicp9ImsS2g2tnHT/AF/WjQpJfWae6sdzm3x7Gju+z+mLRdDo21J5VKnCGe1xSTl4t5fmBIAAAAAAAAAAAAAAAAAAAAAAAAAAAAABy/0sbIyrVPl2mRzLCVaK5tLgp97Swn3JHUDyUVKOJLKfBoDhGialPUben8mk1d23Gn21KceO6u2cOPDri32HXdl9oYa/YqUcRqJLfh2PtXbF9TKTtpsC6Vx8p0NuDT3sJ43ZLjlPq49f+nE6XqbV6ndv5NdJ+37NOo+/qpzfWn6su7kB2cFf0vaPfe5q0ejmuv6r7/u+fDvJ+MlOOYvKfWgPT8161ZPR9fuqL4KNeq4/hm9+P8s0fpQ5l6UdnOnvOnoLjUiov8dPOPOUG1/AgMfo+1ylpujdNdS3Y78aNb7rf0dTw4uL8c8olv1PV6N5RqNSUqFGPSVZp5jJrO5Ti+UuKy8Pg1FdbxxLTK0rGUlKO/Tnjfg21ndeYtP6sk+KeHzfBpsn9rNrau0NsqVKmqVL1d5KW9Ke7y3pYXqptvGOYFN1u7nfyqzSblPeeO98l+iP0ls9p3zRoNC3X/CpU6fnGKTfvRyHYDZn5w1alKuvVjJVH+Gm8r31N1eEWduAA8k91ZlyMSrOr9By+0+Xl9r9O8D7nU3XiPFvkv6+BQ/SftctC0529jLNzVXFrnCD4OT7JPlH39Rm2n22jYuVDZ1dPcPg584Qfe17Ul9lcF145OG2R2AleXnyvaRucpPealxcn2vuA1fRFsW43Cv9Tjjdz0EX2vg6jXhlLxfYjrh5CKhFKCwlwSR6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK9reytLUYN04xT7H7L8Ps/p3FhAHM56dX0PEIv9muCp1lvQ8IVE8w8E8fdN6x1j5I/XVWg+5dLSfnFZ83BeJfZRU44ksp9TIi62boVnmknTfbTe6vy8Y/ADHp+tu6X7B0q3b0U45XjHOU/cZb+4he2jp3dOpHPXuN4a5NYzyZDXuxsqr9SpTnjkqtJZ/NF8Pymr8wXtt9Dy7Kd1WivytJAVvUtGVOu5NYTfPDUc9qb5Z7HxMFto6r1MQTl27qy/hy8y2fJ9Sh7KuPKrbv8AvcR0GpT9pXH/AOtsv7vECb2dto6dZ4p05b0sZxFpJLlFN44L9WzevNThZRzfVKdJffksvwTa4+8qvzDe3P02fCpdVmvyxTRtWWxsqUsznThnn0VJZ/PJ8fygZrrailn9wpVK8uqUk4QTXXmSXvjFkTXhd7TPdrzapvnTo5jDwnUbzLwzh/ZLTa7O0KDzUTqPtqPK/Lwj8CWjFRjiPBAQGh7K0dMgsxi2upLgv8/9cCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=' },
  { name: 'Kia', logo: 'data:image/jpeg;base64,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' },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Use Redux auth state instead of localStorage
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const makes = [...new Set(mockCars.map(car => car.make))];

  const filteredCars = mockCars
    .filter(car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(car =>
      selectedMake ? car.make === selectedMake : true
    );


  return (

    <Container className="mt-4">
      <h2 className="mb-4">Explore Cars</h2>
      <HeroBanner />
      <FeaturedCarousel />




      {/* Search & Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by make or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>

        <Col md={4}>
          <Form.Select
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">All Makes</option>
            {makes.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchTerm('');
              setSelectedMake('');
            }}
          >
            Reset
          </Button>
        </Col>
      </Row>

      {/* Car Cards */}
      <Row>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <Col key={car.id} md={4} className="mb-4">
              <Card className="h-100">
                <div className="d-flex flex-column h-100">
                  <Card.Img variant="top" src={car.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{car.make} {car.model}</Card.Title>
                    <Card.Text>{car.description}</Card.Text>
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>MSRP:</strong> ₹{car.msrp}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <Link to={`/car/${car.id}`}>
                        <Button variant="primary">View Details</Button>
                      </Link>
                      <Button
                        variant="success"
                        onClick={() => {
                          if (!isAuthenticated) {
                            alert('Please login to add cars to your cart.');
                            navigate('/login');
                          } else {
                            dispatch(addToCart(car));
                            alert('Car added to Saved Cars!');
                          }
                        }}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </Col>

          ))
        ) : (
          <p>No cars found.</p>
        )}
      </Row>
      <h3 className="mt-5 mb-3">Popular Brands</h3>
      <Row>
        {popularBrands.map((brand, index) => (
          <Col xs={6} md={4} lg={2} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm border-0 text-center">
              <Card.Img
                variant="top"
                src={brand.logo}
                alt={brand.name}
                style={{ height: '80px', objectFit: 'contain', marginTop: '15px' }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: '1rem' }}>{brand.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
