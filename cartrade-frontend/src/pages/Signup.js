import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (name.length < 3) {
      setError('Name must be at least 3 characters');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address');
      return;
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }


    try {
      await axios.post(
        'https://cartrade-backend-9y1g.onrender.com/api/auth/signup',
        form,
        { withCredentials: true }
      );

      

      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const password = form.password;

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">Create Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            placeholder="Enter your full name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gmail Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            placeholder="yourname@gmail.com"
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            Only Gmail accounts are allowed.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter strong password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="mb-4">
          <strong>Password must include:</strong>
          <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
            <li style={{ color: password.length >= 8 ? 'green' : 'red' }}>
              Minimum 8 characters
            </li>
            <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>
              At least one uppercase letter
            </li>
            <li style={{ color: /[a-z]/.test(password) ? 'green' : 'red' }}>
              At least one lowercase letter
            </li>
            <li style={{ color: /\d/.test(password) ? 'green' : 'red' }}>
              At least one number
            </li>
            <li style={{ color: /[@$!%*?#&_]/.test(password) ? 'green' : 'red' }}>
              At least one special character (@$!%*?#&_)
            </li>
          </ul>
        </div>

        <Button variant="primary" type="submit" className="w-100">
          Signup
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
