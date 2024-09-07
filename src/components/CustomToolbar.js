// src/components/CustomToolbar.js
import React from 'react';

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };

  const goToToday = () => {
    toolbar.onNavigate('TODAY');
  };

  const handleViewChange = (view) => {
    toolbar.onView(view);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
      {/* Navigation Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={goToBack}
          className="px-3 py-1 md:px-4 md:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-base text-sm font-light tracking-tight"
        >
          Prev
        </button>
        <button
          onClick={goToToday}
          className="px-3 py-1 md:px-4 md:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-base text-sm font-light tracking-tight"
        >
          Today
        </button>
        <button
          onClick={goToNext}
          className="px-3 py-1 md:px-4 md:py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-base text-sm font-light tracking-tight"
        >
          Next
        </button>
      </div>

      {/* Current Date */}
      <span className="text-base text-sm font-light tracking-tight text-slate-900 dark:text-white text-center">
        {toolbar.label}
      </span>

      {/* View Switcher (Month, Week, Day, Agenda) */}
      <div className="flex space-x-2">
        <button
          onClick={() => handleViewChange('month')}
          className={`px-3 py-1 md:px-4 md:py-2 ${
            toolbar.view === 'month'
              ? 'bg-secondary text-primary'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
          } rounded-lg hover:bg-secondary-dark transition text-base text-sm font-light tracking-tight`}
        >
          Month
        </button>
        <button
          onClick={() => handleViewChange('week')}
          className={`px-3 py-1 md:px-4 md:py-2 ${
            toolbar.view === 'week'
              ? 'bg-secondary text-primary'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
          } rounded-lg hover:bg-secondary-dark transition text-base text-sm font-light tracking-tight`}
        >
          Week
        </button>
        <button
          onClick={() => handleViewChange('day')}
          className={`px-3 py-1 md:px-4 md:py-2 ${
            toolbar.view === 'day'
              ? 'bg-secondary text-primary'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
          } rounded-lg hover:bg-secondary-dark transition text-base text-sm font-light tracking-tight`}
        >
          Day
        </button>
        <button
          onClick={() => handleViewChange('agenda')}
          className={`px-3 py-1 md:px-4 md:py-2 ${
            toolbar.view === 'agenda'
              ? 'bg-secondary text-primary'
              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
          } rounded-lg hover:bg-secondary-dark transition text-base text-sm font-light tracking-tight`}
        >
          Agenda
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
