import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Rooms from './pages/superadmin/Rooms';
import Login from './components/login2';

import Reservation from './pages/superadmin/reservations';

import LandingPage from './pages/index';
import Admin from './pages/superadmin';
import User from './pages/user';
import { AuthContext } from './context/AuthContext';
import Reservations from './pages/user/reservations';


function App() {
  const { authData } = useContext(AuthContext);

  return (
   
    <BrowserRouter>
      <div className="bg-secondary min-h-screen dark:bg-slate-900  text-primary dark:text-white text-sm flex flex-col">
     
        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/room" element={<Rooms />} />
            <Route path="/my-reservations" element={<Reservation />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route
              path="/admin"
              element={authData ? <Admin  /> : <Navigate to="/login" />}
            />
            <Route
              path="/user"
              element={authData ? <User  /> : <Navigate to="/login" />}
            />
            <Route
              path="/reservations"
              element={authData ? <Reservations  /> : <Navigate to="/login" />}
            />
            {/* Add other protected routes as needed */}
          </Routes>
        </main>
       
      </div>
      </BrowserRouter>
    
  );
}

export default App;
