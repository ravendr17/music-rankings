import { useState } from 'react';
import Navbar from './components/Navbar';
import AddNewView from './components/AddNewView';

export default function App() {
  const [view, setView] = useState('add-new');

  return (
    <div className='flex flex-col h-screen bg-green-50'>
      <Navbar view={view} setView={setView} />
      <div className='flex-1'>
        {view === 'all-time' && <h1>All-Time</h1>}
        {view === 'annual' && <h1>Annual</h1>}
        {view === 'monthly' && <h1>Monthly</h1>}
        {view === 'add-new' && <AddNewView />}
      </div>
    </div>
  );
}
