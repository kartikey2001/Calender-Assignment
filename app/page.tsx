import Image from 'next/image';
import RecurringDatePicker from './components/RecurringDatePicker/RecurringDatePicker';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-950">
      <RecurringDatePicker />
    </main>
  );
}
