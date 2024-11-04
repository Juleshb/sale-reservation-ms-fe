// src/components/ReservationList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar CSS
import { AuthContext } from '../context/AuthContext';
import EditReservationForm from './EditReservationForm'; // Import the EditReservationForm
import CustomToolbar from './CustomToolbar'; // Import the CustomToolbar component
import { Icon } from '@iconify/react';

const localizer = momentLocalizer(moment); // Use moment for date localization

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const { authData } = useContext(AuthContext); // Get auth data (including token)
  const [editingReservationId, setEditingReservationId] = useState(null); // Track which reservation is being edited
  const [message, setMessage] = useState('');

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  // Fetch the reservations
  useEffect(() => {
    const fetchReservations = async () => {
      if (!authData || !authData.token) {
        setMessage('You must be logged in to view reservations.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4700/api/reservations/user', {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Use token to authenticate
          },
        });

        setReservations(response.data);
      } catch (error) {
        setMessage('Error fetching reservations.');
        console.error(error);
      }
    };

    fetchReservations();
  }, [authData]);

  // Delete a reservation
  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`http://localhost:4700/api/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Send token for authorization
        },
      });
      setMessage('Reservation deleted successfully');
      setReservations(reservations.filter((reservation) => reservation.id !== reservationId)); // Remove the deleted reservation from the list
    } catch (error) {
      setMessage('Error deleting reservation');
      console.error(error);
    }
  };

  // Map reservations to calendar event format
  const calendarEvents = reservations.map((reservation) => ({
    title: reservation.room?.name,
    start: new Date(reservation.start_time),
    end: new Date(reservation.end_time),
    id: reservation.id,
  }));

  // Custom event styling based on reservation details
  const eventPropGetter = (event) => {
    let className = '';

    if (event.end - event.start > 4 * 60 * 60 * 1000) {
      className = 'bg-blue-500 text-white';
    } else if (event.room?.name.includes('Conference')) {
      className = 'bg-blue-500 text-white';
    } else {
      className = 'bg-primary text-white';
    }

    return { className };
  };

  // Event selection handler for editing reservations
  const handleSelectEvent = (event) => {
    setEditingReservationId(event.id);
  };

  if (editingReservationId) {
    return (
      <EditReservationForm
        reservationId={editingReservationId}
        onCancel={() => setEditingReservationId(null)}
      />
    );
  }

  return (
    <div className="mt-16">
      <h2 className="text-base text-sm font-normal underline underline-offset-1 mb-4">My Reservations</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      {reservations.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6  border border-primary">
      <div className="items-center flex flex-wrap justify-center bg-primary text-white w-full h-auto space-x-4 ">

        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 1
              ? 'bg-white text-primary '
              : ''
          }`}
          onClick={() => handleTabClick(1)}
        >
            <Icon icon="fluent-mdl2:timeline-delivery" className="mr-2 text-sm" />
            Reservations
        </button>
        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 2
            ? 'bg-white text-primary'
            : ''
          }`}
          onClick={() => handleTabClick(2)}
        >
            
        <i className='mr-2'><Icon icon="el:list-alt" /></i>
        Calender
        </button>
       
      </div>
      <div className="mt-4">
        {activeTab === 1 && (
          <div className="p-4 rounded-lg ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="bg-white dark:bg-slate-800 p-4 shadow-md rounded-lg">
                <div>
                  <span className="inline-flex items-center justify-center p-2 bg-primary text-secondary dark:text-white rounded-md shadow-lg">
                    <Icon icon="mdi:events-check" />
                  </span>
                </div>
                <h3 className="text-slate-900 dark:text-white mt-5 text-base text-sm font-light tracking-tight">{reservation.room?.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-light mt-2 text-sm">
                  <strong>Start:</strong> {new Date(reservation.start_time).toLocaleString()}
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-light mt-2 text-sm">
                  <strong>End:</strong> {new Date(reservation.end_time).toLocaleString()}
                </p>
                <div className="mt-4 flex">
                  <button
                    className="p-2 mr-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
                    onClick={() => setEditingReservationId(reservation.id)}
                  >
                    <Icon icon="basil:edit-outline" />
                  </button>
                  <button
                    className="p-2 mr-2 bg-gray-200 flex dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 items-center flex"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    <Icon icon="mdi-light:delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          </div>
        )}
        {activeTab === 2 && (
          <div className=" p-4 rounded-lg ">
          <div className="w-full  bg-white dark:bg-slate-800 p-6">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              onSelectEvent={handleSelectEvent} // Handle event clicks for editing
              eventPropGetter={eventPropGetter} // Custom event styling
              components={{
                toolbar: CustomToolbar, // Use custom toolbar
              }}
            />
          </div>
          </div>
        )}
 
      </div>
    </div>
         
        </div>
      ) : (
        <p>No reservations found.</p>
      )}


      

    </div>
  );
};

export default ReservationList;
