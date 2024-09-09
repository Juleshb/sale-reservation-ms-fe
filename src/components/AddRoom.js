import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      // Send data to the backend (assuming the endpoint is '/api/rooms')
      const response = await axios.post('http://localhost:4700/api/rooms', {
        name,
        location,
      });

      // Success message
      setMessage(`Room "${response.data.name}" added successfully!`);
      setName('');
      setLocation('');
    } catch (error) {
      setMessage('Error adding room. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Room</h2>

      {message && <p className="mb-4 text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter room name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 mt-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            placeholder="Enter room location"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
