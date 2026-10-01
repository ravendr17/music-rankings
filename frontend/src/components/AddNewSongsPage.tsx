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

  const [songs, setSongs] = useState([
    {id: 1, title: "", artist: "", playCount: ""},
    {id: 2, title: "", artist: "", playCount: ""},
    {id: 3, title: "", artist: "", playCount: ""},
    {id: 4, title: "", artist: "", playCount: ""},
    {id: 5, title: "", artist: "", playCount: ""},
    {id: 6, title: "", artist: "", playCount: ""},
    {id: 7, title: "", artist: "", playCount: ""},
    {id: 8, title: "", artist: "", playCount: ""},
    {id: 9, title: "", artist: "", playCount: ""},
    {id: 10, title: "", artist: "", playCount: ""},
  ]);

  function handleSongs(id: number, field: string, value: string) {
    setSongs(songs.map((s) => (
      s.id === id ? 
      {...s, [field]: value}
      : s
    )));
  }

  return (
    <form 
      className="flex flex-col w-full"
    >
      <div className="bg-gray-200 flex items-center p-4 gap-6">

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

      </div>

      <div className="flex flex-col p-4">
        <table className="w-full table-fixed border border-collapse">
          <colgroup>
            <col className="w-1/13" />
            <col className="w-5/13" />
            <col className="w-5/13" />
            <col className="w-2/13" />
          </colgroup>
          <thead>
            <tr>
              <th className="border p-1 bg-blue-100">Rank</th>
              <th className="border p-1 bg-blue-100">Song Title</th>
              <th className="border p-1 bg-blue-100">Song Artist</th>
              <th className="border p-1 bg-blue-100">Play Count</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((s) => (
              <tr key={s.id}>

                <td className="border text-center">
                  {s.id}
                </td>

                <td className="border">
                  <input 
                    type="text"
                    placeholder="Song Title"
                    className="w-full px-2 py-1"
                    value={s.title}
                    onChange={(e) => handleSongs(s.id, "title", e.target.value)}
                  />
                </td>

                <td className="border">
                  <input 
                    type="text"
                    placeholder="Song Artist"
                    className="w-full px-2 py-1"
                    value={s.artist}
                    onChange={(e) => handleSongs(s.id, "artist", e.target.value)}
                  />
                </td>

                <td className="border">
                  <input 
                    type="number"
                    placeholder="Play Count"
                    className="w-full px-2 py-1"
                    value={s.playCount}
                    onChange={(e) => handleSongs(s.id, "playCount", e.target.value)}
                  />
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </form>
  );
}