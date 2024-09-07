import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ReservationForm = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const { authData } = useContext(AuthContext); // Get auth data from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoom || !startTime || !endTime) {
      setMessage('Please fill all fields.');
      return;
    }

    if (!authData || !authData.token) {
      setMessage('You must be logged in to make a reservation.');
      return;
    }

    try {
      // Send reservation request with user_id
      const response = await axios.post(
        'http://localhost:4700/api/reservations',
        {
          user_id: authData.user.id, // Get user_id from authData context
          room_id: selectedRoom,
          start_time: startTime,
          end_time: endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Include the token for authentication
          },
        }
      );

      setMessage('Reservation successful!');
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Error booking the room.'
      );
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-base text-sm font-normal underline underline-offset-1 mb-4">Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-slate-900 dark:text-white ">Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:text-primary rounded mt-1"
          >
            <option value="">-- Select a Room --</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-slate-900 dark:text-white ">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-900 dark:text-white ">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary hover:text-primary"
        >
          Book Room
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ReservationForm;
