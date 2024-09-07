import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddRoom from './components/AddRoom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ReservationList from './components/ReservationList';
import { AuthContext } from './context/AuthContext';


function App() {
  const { authData } = useContext(AuthContext);

  return (
    <Router>
      <div className="bg-secondary min-h-screen dark:bg-slate-900  text-primary dark:text-white text-sm flex flex-col">
        <Navbar />
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/add-room" element={<AddRoom />} />
            <Route path="/my-reservations" element={<ReservationList />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route
              path="/"
              element={authData ? <HomePage  /> : <Navigate to="/login" />}
            />
            {/* Add other protected routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
