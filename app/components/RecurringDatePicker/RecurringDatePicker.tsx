'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import RecurrenceOptions from './RecurrenceOptions';

const RecurringDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recurringType, setRecurringType] = useState('none');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [monthlyDate, setMonthlyDate] = useState(1);
  const [weeklyDay, setWeeklyDay] = useState(0);
  const [yearlyMonth, setYearlyMonth] = useState(0);
  const [yearlyDate, setYearlyDate] = useState(1);
  const [previewDates, setPreviewDates] = useState<Date[]>([]);
  const [frequency, setFrequency] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [weeklyDays, setWeeklyDays] = useState<number[]>([]);
  const [monthlyType, setMonthlyType] = useState<'date' | 'nth'>('date');
  const [monthlyNthDay, setMonthlyNthDay] = useState(0);
  const [monthlyNthOccurrence, setMonthlyNthOccurrence] = useState(1);
  const [endCondition, setEndCondition] = useState<'never' | 'after' | 'on'>('never');
  const [occurrences, setOccurrences] = useState(1);

  const clearRecurringOptions = () => {
    setRecurringType('none');
    setStartDate(new Date());
    setEndDate(new Date());
    setMonthlyDate(1);
    setWeeklyDay(0);
    setYearlyMonth(0);
    setYearlyDate(1);
    setFrequency(1);
    setPreviewDates([]);
    setError(null);
  };

  useEffect(() => {
    updatePreviewDates();
  }, [recurringType, startDate, endDate, monthlyDate, weeklyDay, yearlyMonth, yearlyDate, frequency]);

  useEffect(() => {
    validateDates();
  }, [startDate, endDate]);

  const validateDates = () => {
    if (startDate > endDate) {
      setError('Start date cannot be after end date');
    } else {
      setError(null);
    }
  };

  const updatePreviewDates = () => {
    const dates: Date[] = [];
    let currentDate = new Date(startDate);
    let occurrenceCount = 0;

    while (
      (endCondition === 'never' || currentDate <= endDate) &&
      (endCondition !== 'after' || occurrenceCount < occurrences) &&
      dates.length < 10
    ) {
      switch (recurringType) {
        case 'daily':
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + frequency);
          break;
        case 'weekly':
          if (weeklyDays.includes(currentDate.getDay())) {
            dates.push(new Date(currentDate));
          }
          if (currentDate.getDay() === 6) {
            currentDate.setDate(currentDate.getDate() + (7 * (frequency - 1)) + 1);
          } else {
            currentDate.setDate(currentDate.getDate() + 1);
          }
          break;
        case 'monthly':
          if (monthlyType === 'date') {
            if (currentDate.getDate() === monthlyDate) {
              dates.push(new Date(currentDate));
              currentDate.setMonth(currentDate.getMonth() + frequency);
            } else {
              currentDate.setDate(currentDate.getDate() + 1);
            }
          } else {
            const nthOccurrence = monthlyNthOccurrence === -1 ? -1 : monthlyNthOccurrence - 1;
            if (
              isNthOccurrence(currentDate, monthlyNthDay, nthOccurrence)
            ) {
              dates.push(new Date(currentDate));
              currentDate.setMonth(currentDate.getMonth() + frequency);
            } else {
              currentDate.setDate(currentDate.getDate() + 1);
            }
          }
          break;
        case 'yearly':
          if (currentDate.getMonth() === yearlyMonth && currentDate.getDate() === yearlyDate) {
            dates.push(new Date(currentDate));
            currentDate.setFullYear(currentDate.getFullYear() + frequency);
          } else {
            currentDate.setDate(currentDate.getDate() + 1);
          }
          break;
        default:
          dates.push(new Date(startDate));
          currentDate = new Date(endDate);
      }

      if (dates.length > dates.length - 1) {
        occurrenceCount++;
      }
    }

    setPreviewDates(dates);
  };

  const isNthOccurrence = (date: Date, dayOfWeek: number, n: number) => {
    const d = new Date(date.getTime());
    d.setDate(1);
    let count = 0;
    while (d.getMonth() === date.getMonth()) {
      if (d.getDay() === dayOfWeek) {
        count++;
        if (n >= 0 && count > n) break;
        if (n < 0 && d.getMonth() !== date.getMonth()) break;
        if (d.getDate() === date.getDate()) return true;
      }
      d.setDate(d.getDate() + 1);
    }
    return false;
  };

  const prevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      day
    );
    setSelectedDate(newDate);
    setStartDate(newDate);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-800 text-gray-400 p-4">
        <button
          onClick={prevMonth}
          className="p-1 bg-gray-700 hover:!border-gray-600 hover:!bg-gray-600 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">
          {selectedDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 bg-gray-700 hover:!border-gray-600 hover:!bg-gray-600 focus:outline-none"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <CalendarGrid
        selectedDate={selectedDate}
        onDateClick={handleDateClick}
        previewDates={previewDates}
      />
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center mb-4 text-gray-300">
          <Calendar className="mr-2" size={24} />
          <span className="font-semibold">
            Selected: {selectedDate.toDateString()}
          </span>
        </div>
        <RecurrenceOptions
          recurringType={recurringType}
          setRecurringType={setRecurringType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          monthlyDate={monthlyDate}
          setMonthlyDate={setMonthlyDate}
          weeklyDay={weeklyDay}
          setWeeklyDay={setWeeklyDay}
          yearlyMonth={yearlyMonth}
          setYearlyMonth={setYearlyMonth}
          yearlyDate={yearlyDate}
          setYearlyDate={setYearlyDate}
          frequency={frequency}
          setFrequency={setFrequency}
          weeklyDays={weeklyDays}
          setWeeklyDays={setWeeklyDays}
          monthlyType={monthlyType}
          setMonthlyType={setMonthlyType}
          monthlyNthDay={monthlyNthDay}
          setMonthlyNthDay={setMonthlyNthDay}
          monthlyNthOccurrence={monthlyNthOccurrence}
          setMonthlyNthOccurrence={setMonthlyNthOccurrence}
          onClear={clearRecurringOptions}
          endCondition={endCondition}
          setEndCondition={setEndCondition}
          occurrences={occurrences}
          setOccurrences={setOccurrences}
        />
        {error && (
          <div className="mt-4 text-red-500 font-semibold">{error}</div>
        )}
        {previewDates.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Preview:</h3>
            <ul className="list-disc list-inside text-gray-400">
              {previewDates.map((date, index) => (
                <li key={index}>{date.toDateString()}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurringDatePicker;