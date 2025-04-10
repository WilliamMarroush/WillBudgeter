// BudgetCalendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
// import calendar library

function BudgetCalendar() {
  return (
    <div>
      <h2>Budget Calendar</h2>
      <Calendar/>
      <div>
        <h3>Budget Overview</h3>
        {/* Budget overview display */}
      </div>
    </div>
  );
}

export default BudgetCalendar;