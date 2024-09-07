// src/components/RoomList.js
import React from 'react';

const RoomList = ({ rooms }) => {
  return (
    <div className="mb-8">
      <h2 className="text-base text-sm font-normal underline underline-offset-1 mb-4">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map(room => (
            <div key={room.id} class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-primary text-secondary dark:text-white rounded-md shadow-lg">
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M5 21h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/></path><path stroke-dasharray="16" stroke-dashoffset="16" d="M5 21v-13M19 21v-13"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="16;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M9 21v-8h6v8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0"/></path><path stroke-dasharray="32" stroke-dashoffset="32" d="M2 10l10 -8l10 8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.7s" values="32;0"/></path></g></svg>
    </span>
  </div>
  <h3 class="text-slate-900 dark:text-white mt-5 text-base text-sm font-light tracking-tight">{room.name}</h3>
  <p class="text-slate-500 dark:text-slate-400 font-light mt-2 text-sm">
  Location: {room.location}
  </p>
</div>
        ))}
      </div>
      
    </div>

    
  );
};

export default RoomList;
