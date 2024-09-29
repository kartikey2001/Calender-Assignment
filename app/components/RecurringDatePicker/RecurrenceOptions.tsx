import React from 'react';

interface RecurrenceOptionsProps {
  recurringType: string;
  setRecurringType: (type: string) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  monthlyDate: number;
  setMonthlyDate: (date: number) => void;
  weeklyDay: number;
  setWeeklyDay: (day: number) => void;
  yearlyMonth: number;
  setYearlyMonth: (month: number) => void;
  yearlyDate: number;
  setYearlyDate: (date: number) => void;
  frequency: number;
  setFrequency: (frequency: number) => void;
  onClear: () => void;
  weeklyDays: number[];
  setWeeklyDays: (days: number[]) => void;
  monthlyType: 'date' | 'nth';
  setMonthlyType: (type: 'date' | 'nth') => void;
  monthlyNthDay: number;
  setMonthlyNthDay: (day: number) => void;
  monthlyNthOccurrence: number;
  setMonthlyNthOccurrence: (occurrence: number) => void;
  endCondition: 'never' | 'after' | 'on';
  setEndCondition: (condition: 'never' | 'after' | 'on') => void;
  occurrences: number;
  setOccurrences: (occurrences: number) => void;
}

const RecurrenceOptions: React.FC<RecurrenceOptionsProps> = ({
  recurringType,
  setRecurringType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  monthlyDate,
  setMonthlyDate,
  weeklyDay,
  setWeeklyDay,
  yearlyMonth,
  setYearlyMonth,
  yearlyDate,
  setYearlyDate,
  frequency,
  setFrequency,
  onClear,
  weeklyDays,
  setWeeklyDays,
  monthlyType,
  setMonthlyType,
  monthlyNthDay,
  setMonthlyNthDay,
  monthlyNthOccurrence,
  setMonthlyNthOccurrence,
  endCondition,
  setEndCondition,
  occurrences,
  setOccurrences,
}) => {
  const handleRecurringTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRecurringType(e.target.value);
  };

  const handleWeeklyDayToggle = (day: number) => {
    if (weeklyDays.includes(day)) {
      setWeeklyDays(weeklyDays.filter((d) => d !== day));
    } else {
      setWeeklyDays([...weeklyDays, day]);
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <label className="font-semibold text-gray-400">
          Recurring Type:
        </label>
        <button
          onClick={onClear}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Clear
        </button>
      </div>
      <select
        value={recurringType}
        onChange={handleRecurringTypeChange}
        className="w-full p-2 mb-4 border rounded bg-gray-700 border-gray-600 text-gray-200 focus:outline-none"
      >
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      {recurringType !== 'none' && (
        <>
          <div className="mb-4 text-gray-400">
            <label className="block mb-2 font-semibold">Start Date:</label>
            <input
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
          <div className="mb-4 text-gray-400">
            <label className="block mb-2 font-semibold">End Date:</label>
            <input
              type="date"
              value={endDate.toISOString().split('T')[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              Frequency:
            </label>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Every</span>
              <input
                type="number"
                min="1"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-16 p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 mr-2"
              />
              <span className="text-gray-400">
                {recurringType === 'daily' && 'day(s)'}
                {recurringType === 'weekly' && 'week(s)'}
                {recurringType === 'monthly' && 'month(s)'}
                {recurringType === 'yearly' && 'year(s)'}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              End:
            </label>
            <select
              value={endCondition}
              onChange={(e) => setEndCondition(e.target.value as 'never' | 'after' | 'on')}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 mb-2"
            >
              <option value="never">Never</option>
              <option value="after">After</option>
              <option value="on">On date</option>
            </select>
            {endCondition === 'after' && (
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={occurrences}
                  onChange={(e) => setOccurrences(parseInt(e.target.value))}
                  className="w-16 p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 mr-2"
                />
                <span className="text-gray-400">occurrences</span>
              </div>
            )}
            {endCondition === 'on' && (
              <input
                type="date"
                value={endDate.toISOString().split('T')[0]}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
              />
            )}
          </div>
        </>
      )}
      {recurringType === 'monthly' && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-400">
            Monthly Recurrence:
          </label>
          <select
            value={monthlyType}
            onChange={(e) => setMonthlyType(e.target.value as 'date' | 'nth')}
            className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 mb-2"
          >
            <option value="date">On a specific date</option>
            <option value="nth">On the nth occurrence of a day</option>
          </select>
          {monthlyType === 'date' ? (
            <input
              type="number"
              min="1"
              max="31"
              value={monthlyDate}
              onChange={(e) => setMonthlyDate(parseInt(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          ) : (
            <div className="flex items-center">
              <select
                value={monthlyNthOccurrence}
                onChange={(e) => setMonthlyNthOccurrence(parseInt(e.target.value))}
                className="w-1/2 p-2 border rounded bg-gray-700 border-gray-600 text-gray-200 mr-2"
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
                <option value={4}>Fourth</option>
                <option value={-1}>Last</option>
              </select>
              <select
                value={monthlyNthDay}
                onChange={(e) => setMonthlyNthDay(parseInt(e.target.value))}
                className="w-1/2 p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
              >
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                  <option key={day} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      {recurringType === 'weekly' && (
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-400">
            Days of Week:
          </label>
          <div className="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <button
                key={day}
                onClick={() => handleWeeklyDayToggle(index)}
                className={`px-3 py-1 rounded ${
                  weeklyDays.includes(index)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
      {recurringType === 'yearly' && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              Month:
            </label>
            <select
              value={yearlyMonth}
              onChange={(e) => setYearlyMonth(parseInt(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-400">
              Day of Month:
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={yearlyDate}
              onChange={(e) => setYearlyDate(parseInt(e.target.value))}
              className="w-full p-2 border rounded bg-gray-700 border-gray-600 text-gray-200"
            />
          </div>
        </>
      )}
    </>
  );
};

export default RecurrenceOptions;