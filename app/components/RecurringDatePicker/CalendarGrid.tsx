import React from 'react';

interface CalendarGridProps {
  selectedDate: Date;
  onDateClick: (day: number) => void;
  previewDates: Date[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ selectedDate, onDateClick, previewDates }) => {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const isPreviewDate = (day: number) => {
    return previewDates.some(
      (date) =>
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === day
    );
  };

  const renderCalendar = () => {
    const days: JSX.Element[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = i === selectedDate.getDate();
      const isPreview = isPreviewDate(i);
      days.push(
        <div
          key={i}
          onClick={() => onDateClick(i)}
          className={`p-2 text-center cursor-pointer text-gray-600 hover:bg-gray-800 hover:text-gray-300 ${
            isSelected
              ? 'bg-gray-950 !text-white hover:bg-gray-950 hover:!text-gray-400'
              : ''
          } ${
            isPreview
              ? 'bg-blue-900 text-blue-200 hover:bg-blue-800 hover:text-blue-100'
              : ''
          }`}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return <div className="grid grid-cols-7 gap-1 p-4">{renderCalendar()}</div>;
};

export default CalendarGrid;