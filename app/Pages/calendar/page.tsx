import React from 'react';
import { RecurringDatePicker } from '../../components/RecurringDatePicker';

const CalendarPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-200">Recurring Date Picker</h1>
      <RecurringDatePicker />
    </div>
  );
};

export default CalendarPage;