interface NavbarProps {
  setView: (view: string) => void;
}

export default function Navbar({setView}: NavbarProps) {
  return (
    <div className='flex px-4 py-2 justify-between items-center bg-gray-200'>
      <span className="font-bold text-lg">MusicRankings</span>
        <div className="flex gap-6">
          <button 
            className="border rounded-md bg-white px-8 py-2 cursor-pointer"
            onClick={() => setView('all-time')}
          >
            All-time
          </button>
          <button 
            className="border rounded-md bg-white px-8 py-2 cursor-pointer"
            onClick={() => setView('annual')}
          >
            Annual
          </button>
          <button 
            className="border rounded-md bg-white px-8 py-2 cursor-pointer"
            onClick={() => setView('monthly')}
          >
            Monthly
          </button>
          <button 
            className="border rounded-md bg-white px-8 py-2 cursor-pointer"
            onClick={() => setView('add-new')}
          >
            Add New
          </button>
      </div>
    </div>
  );
}