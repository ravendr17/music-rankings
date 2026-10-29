import { useState } from "react";

const months = [
  {label: "January", value: 1},
  {label: "February", value: 2},
  {label: "March", value: 3},
  {label: "April", value: 4},
  {label: "May", value: 5},
  {label: "June", value: 6},
  {label: "July", value: 7},
  {label: "August", value: 8},
  {label: "September", value: 9},
  {label: "October", value: 10},
  {label: "November", value: 11},
  {label: "December", value: 12}
];

export default function AddNewSongsPage() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [totalHours, setTotalHours] = useState("");

  return (
    <form 
      method="POST"
      className="flex flex-col"
    >
      <div className="bg-gray-300 flex p-4 gap-16 items-center">
        <input 
          type="number"
          placeholder="Year"
          className="bg-white p-2 w-40 rounded-sm"
          required
          max={9999}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <select
          required
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="bg-white w-40 px-2 py-2 rounded-sm"
        >
          <option value="" disabled>Select Month</option>
          {months.map((m) => (
            <option value={m.value} key={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <input 
          type="number" 
          required
          placeholder="Total Hours"
          className="bg-white p-2 w-40 rounded-sm"
          max={999}
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
        />

        <button
          type="submit"
          className="text-white cursor-pointer px-10 py-3 ml-auto rounded-md
          bg-green-600 hover:bg-green-500 active:bg-green-400"
        >
          Create
        </button>
      </div>
    </form>
  );
}