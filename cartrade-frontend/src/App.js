// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import CarDetail from './pages/CarDetail';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Cart from './pages/Cart';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import SellCar from './pages/SellCar';
// import ServicesPage from './pages/ServicesPage';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Router>
//         <Navbar />
//         <div className="flex-fill">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/car/:id" element={<CarDetail />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/sell-car" element={<SellCar />} />
//             <Route path="/services" element={<ServicesPage />} />
//           </Routes>
//         </div>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SellCar from './pages/SellCar';
import ServicesPage from './pages/ServicesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {

          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.user) {
          dispatch(login(data.user));
          localStorage.setItem('userInfo', JSON.stringify(data.user)); // Optional for future
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar />
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car/:id" element={<CarDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sell-car" element={<SellCar />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

