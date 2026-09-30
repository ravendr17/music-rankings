import { useState } from "react";

const months = [
  {id: 1, label: "January"},
  {id: 2, label: "February"},
  {id: 3, label: "March"},
  {id: 4, label: "April"},
  {id: 5, label: "May"},
  {id: 6, label: "June"},
  {id: 7, label: "July"},
  {id: 8, label: "August"},
  {id: 9, label: "September"},
  {id: 10, label: "October"},
  {id: 11, label: "November"},
  {id: 12, label: "December"}
];

export default function AddNewSongsPage() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState("");
  const [totalHours, setTotalHours] = useState("");

  return (
    <form className="bg-gray-200 flex items-center p-4 gap-6">

      <div className="flex gap-2 items-center">
        <label htmlFor="year">Year:</label>
        <input
          id="year"
          type="number"
          placeholder="Year"
          className="bg-white p-1 w-35 rounded-sm"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          min={1900}
          max={9999}
        />
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="month">Month:</label>
        <select 
          id="month"
          className="bg-white p-1.5 rounded-sm w-35"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="" disabled>Select month</option>
          {months.map((m) => (
            <option 
              value={m.id}
              key={m.id}
            >{m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="total-hours">Total Hours:</label>
        <input 
          id="total-hours"
          type="number"
          placeholder="Total Hours"
          className="bg-white p-1 w-35 rounded-sm"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
          required
          min={1}
          max={999999}
        />
      </div>

      <button 
        className="cursor-pointer bg-green-600 text-white px-10 py-2
        rounded-sm hover:bg-green-500 active:bg-green-400 ml-auto"
        onClick={() => ("")}
        type="submit"
      >
        Submit
      </button>

    </form>
  );
}