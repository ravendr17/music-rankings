import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function App() {
  const [view, setView] = useState('all-time');

  return (
    <div className='flex flex-col h-screen'>
      <Navbar setView={setView} />
      <div className='flex-1'>
        {view === 'all-time' && <h1>All-Time</h1>}
        {view === 'annual' && <h1>Annual</h1>}
        {view === 'monthly' && <h1>Monthly</h1>}
        {view === 'add-new' && <h1>Add New</h1>}
      </div>
    </div>
  );
}
