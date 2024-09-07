// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import RoomList from './RoomList';
import ReservationForm from './ReservationForm';
import axios from 'axios';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Fetch rooms from backend
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:4700/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-sm font-light text-center mb-8">Room Reservation System</h1>
      <RoomList rooms={rooms} />
      <ReservationForm rooms={rooms} />
    </div>
  );
};

export default HomePage;
