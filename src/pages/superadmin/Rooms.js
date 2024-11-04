import Navbar from "../../components/navs/nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddRoom from "../../components/AddRoom";
import RoomList from "../../components/RoomList";
import { Icon } from '@iconify/react';


import React, { useState, useEffect } from 'react';

import axios from 'axios';

  

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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
            <i className='mr-2'><Icon icon="simple-icons:googleclassroom" /></i>
            Rooms
        </button>
        <button
          className={`px-4 items-center mt-2 mb-2 rounded-lg text-xs flex  py-3 block ${
            activeTab === 2
            ? 'bg-white text-primary'
            : ''
          }`}
          onClick={() => handleTabClick(2)}
        >
            
            <i className='mr-2'><Icon icon="zondicons:add-outline" /></i>
            New Room
        </button>
       
      </div>
      <div className="mt-4">
        {activeTab === 1 && (
          <div className=" p-4 rounded-lg ">
          <RoomList rooms={rooms} />
          
          </div>
        )}
        {activeTab === 2 && (
          <div className=" p-4 rounded-lg ">
          <AddRoom />
          </div>
        )}
 
      </div>
    </div>
       
      </div>



      
    </>
  );
}