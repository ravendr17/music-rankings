import { useState } from "react";

const months = [
  {id: 1, label: 'January'},
  {id: 2, label: 'February'},
  {id: 3, label: 'March'},
  {id: 4, label: 'April'},
  {id: 5, label: 'May'},
  {id: 6, label: 'June'},
  {id: 7, label: 'July'},
  {id: 8, label: 'August'},
  {id: 9, label: 'September'},
  {id: 10, label: 'October'},
  {id: 11, label: 'November'},
  {id: 12, label: 'December'}
];

export default function AddNewView() {
  const [year, setYear] = useState(() => String(new Date().getFullYear()));
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [totalHours, setTotalHours] = useState('');

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 gap-10">
        <input 
          type="number" 
          placeholder="Year"
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="border px-10 py-2"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map(v => (
            <option 
              value={v.id}
              key={v.id}
            >{v.label}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Total Hours"
          className="border p-2"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
        />
      </div>
    </div>
  );
}