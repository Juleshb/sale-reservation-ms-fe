import Navbar from "../../components/navs/nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddRoom from "../../components/AddRoom";
import RoomList from "../../components/RoomList";


import React, { useState, useEffect } from 'react';

import axios from 'axios';

  

export default function Rooms() {
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
    <>
      <Sidebar />
      <div className="relative md:ml-64 ">
        <Navbar />

        <div className="relative md:pt-32  pt-10"> 
      </div>
        <div className="px-4 md:px-10 mx-auto w-full m-2">
          
        <div className="container mx-auto p-4">
      <RoomList rooms={rooms} />
      <AddRoom />
    </div>
         
        </div>
        
       
      </div>
    </>
  );
}