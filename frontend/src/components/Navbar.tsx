interface NavbarProps {
  view: string;
  setView: (view: string) => void;
}

const views = [
  {id: 'all-time', label: 'All Time'},
  {id: 'annual', label: 'Annual'},
  {id: 'monthly', label: 'Monthly'},
  {id: 'add-new', label: 'Add New'}
];

export default function Navbar({view, setView}: NavbarProps) {
  return (
    <div className='flex px-4 py-2 justify-between items-center bg-gray-100'>
      <span className="font-bold text-xl">MusicRankings</span>
        <div className="flex gap-6">
          {views.map(v => (
            <button
              className={`border-2 rounded px-10 py-2 cursor-pointer 
                ${view === v.id ? 'text-white bg-black': 'bg-white hover:bg-gray-200'}`}
              key={v.id}
              onClick={() => setView(v.id)}
            >
              {v.label}
            </button>
          ))}
      </div>
    </div>
  );
}