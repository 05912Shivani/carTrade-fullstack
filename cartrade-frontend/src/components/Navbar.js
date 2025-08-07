import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const AppNavbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        dispatch(logout());
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed');
    }
  };

  const handleSellCarClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault(); // stop the default navigation
      alert('Please log in to sell your car');
      navigate('/login');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🚗 CarTrade</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Saved Cars</Nav.Link>
            <Nav.Link as={Link} to="/sell-car" onClick={handleSellCarClick}>
              Sell Car
            </Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link> 

            {isAuthenticated ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user?.name || 'User'}!
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
