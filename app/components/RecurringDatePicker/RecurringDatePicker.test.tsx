import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecurringDatePicker from './RecurringDatePicker';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveValue(value: string | number): R;
      toHaveClass(className: string): R;
    }
  }
}

describe('RecurringDatePicker', () => {
  it('renders without crashing', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Recurring Type:')).toBeInTheDocument();
  });

  it('changes recurring type', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'weekly' } });
    expect(screen.getByText('Day of Week:')).toBeInTheDocument();
  });

  it('selects a date', () => {
    render(<RecurringDatePicker />);
    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);
    expect(screen.getByText(/Selected:/)).toHaveTextContent(/15/);
  });

  it('updates frequency', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'daily' } });
    const frequencyInput = screen.getByLabelText('Frequency:');
    fireEvent.change(frequencyInput, { target: { value: '2' } });
    expect(frequencyInput).toHaveValue(2);
  });

  it('shows preview dates', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'daily' } });
    expect(screen.getByText('Preview:')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(10);
  });

  it('shows error when start date is after end date', () => {
    render(<RecurringDatePicker />);
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');

    fireEvent.change(startDateInput, { target: { value: '2023-05-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-04-01' } });

    expect(screen.getByText('Start date cannot be after end date')).toBeInTheDocument();
  });

  it('clears error when dates are valid', () => {
    render(<RecurringDatePicker />);
    const startDateInput = screen.getByLabelText('Start Date:');
    const endDateInput = screen.getByLabelText('End Date:');

    fireEvent.change(startDateInput, { target: { value: '2023-05-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-04-01' } });
    expect(screen.getByText('Start date cannot be after end date')).toBeInTheDocument();

    fireEvent.change(endDateInput, { target: { value: '2023-06-01' } });
    expect(screen.queryByText('Start date cannot be after end date')).not.toBeInTheDocument();
  });

  it('clears recurring options when clear button is clicked', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'daily' } });
    expect(screen.getByText('Frequency:')).toBeInTheDocument();

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    expect(select).toHaveValue('none');
    expect(screen.queryByText('Frequency:')).not.toBeInTheDocument();
  });

  it('allows selection of multiple days for weekly recurrence', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'weekly' } });

    const mondayButton = screen.getByText('Mon');
    const wednesdayButton = screen.getByText('Wed');
    
    fireEvent.click(mondayButton);
    fireEvent.click(wednesdayButton);

    expect(mondayButton).toHaveClass('bg-blue-600');
    expect(wednesdayButton).toHaveClass('bg-blue-600');
  });

  it('allows selection of nth occurrence for monthly recurrence', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'monthly' } });

    const monthlyTypeSelect = screen.getByLabelText('Monthly Recurrence:');
    fireEvent.change(monthlyTypeSelect, { target: { value: 'nth' } });

    const occurrenceSelect = screen.getByLabelText('Occurrence:');
    const daySelect = screen.getByLabelText('Day of Week:');

    fireEvent.change(occurrenceSelect, { target: { value: '2' } });
    fireEvent.change(daySelect, { target: { value: '1' } });

    expect(occurrenceSelect).toHaveValue('2');
    expect(daySelect).toHaveValue('1');
  });

  it('updates preview dates for nth occurrence monthly recurrence', () => {
    render(<RecurringDatePicker />);
    const select = screen.getByLabelText('Recurring Type:');
    fireEvent.change(select, { target: { value: 'monthly' } });

    const monthlyTypeSelect = screen.getByLabelText('Monthly Recurrence:');
    fireEvent.change(monthlyTypeSelect, { target: { value: 'nth' } });

    const occurrenceSelect = screen.getByLabelText('Occurrence:');
    const daySelect = screen.getByLabelText('Day of Week:');

    fireEvent.change(occurrenceSelect, { target: { value: '2' } });
    fireEvent.change(daySelect, { target: { value: '1' } });

    const previewDates = screen.getAllByRole('listitem');
    expect(previewDates.length).toBeGreaterThan(0);
  });

  it('allows setting end condition', () => {
    render(<RecurringDatePicker />);
    const recurringTypeSelect = screen.getByLabelText('Recurring Type:');
    fireEvent.change(recurringTypeSelect, { target: { value: 'daily' } });

    const endConditionSelect = screen.getByLabelText('End:');
    fireEvent.change(endConditionSelect, { target: { value: 'after' } });

    const occurrencesInput = screen.getByLabelText('occurrences');
    fireEvent.change(occurrencesInput, { target: { value: '5' } });

    expect(occurrencesInput).toHaveValue(5);
  });

  it('updates preview dates based on end condition', () => {
    render(<RecurringDatePicker />);
    const recurringTypeSelect = screen.getByLabelText('Recurring Type:');
    fireEvent.change(recurringTypeSelect, { target: { value: 'daily' } });

    const endConditionSelect = screen.getByLabelText('End:');
    fireEvent.change(endConditionSelect, { target: { value: 'after' } });

    const occurrencesInput = screen.getByLabelText('occurrences');
    fireEvent.change(occurrencesInput, { target: { value: '5' } });

    const previewDates = screen.getAllByRole('listitem');
    expect(previewDates).toHaveLength(5);
  });
});