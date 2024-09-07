import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditReservationForm = ({ reservationId, onCancel }) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext); // Get auth data (including token)

  // Fetch reservation and room data
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:4700/api/reservations/oneby/${reservationId}`);
        const reservation = response.data;
        setSelectedRoom(reservation.room_id);
        setStartTime(reservation.start_time);
        setEndTime(reservation.end_time);
      } catch (error) {
        setMessage('Error fetching reservation data.');
        console.error(error);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:4700/api/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchReservation();
    fetchRooms();
  }, [reservationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4700/api/reservations/${reservationId}`,
        {
          room_id: selectedRoom,
          start_time: startTime,
          end_time: endTime,
         
        },
        { headers: {
            Authorization: `Bearer ${authData.token}`, // Use token to authenticate
          },
        }
      );

      setMessage('Reservation updated successfully!');
      navigate('/my-reservations'); // Redirect to the reservations list
    } catch (error) {
      setMessage('Error updating the reservation.');
      console.error(error);
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-base text-sm font-normal underline underline-offset-1 mb-4">Edit Reservation</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 shadow-md rounded-lg">
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label className="block text-slate-900 dark:text-white ">Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 dark:text-primary"
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

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary hover:text-primary"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservationForm;
