import { useState, type SubmitEvent } from "react";
import { env } from "../env";

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

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const submittedSongs = songs.filter(
      (s) => s.title || s.artist || s.playCount,
    );

    const payload = {
      year: Number(year),
      month: Number(month),
      totalHours: Number(totalHours),
      songs: submittedSongs.map((s) => ({
        title: s.title, 
        artist: s.artist, 
        playCount: Number(s.playCount)
      }))
    };

    try {
      const response = await fetch(`${env.API_BASE_URL}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Server returned with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Monthly ranking submitted successfully:", data);
    } catch (error) {
      console.error("Failed to submit monthly ranking:", error);
    }
  }

  return (
    <form 
      className="flex flex-col w-full"
      onSubmit={handleSubmit}
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
            max={2999}
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
            max={999}
          />
        </div>

        <button 
          className="cursor-pointer bg-green-600 text-white px-10 py-2
          rounded-sm hover:bg-green-500 active:bg-green-400 ml-auto"
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
            {songs.map((s) => {
              const hasValues = Boolean(s.title || s.artist || s.playCount)
              
              return (
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
                      required={hasValues}
                      maxLength={100}
                      pattern=".*\S.*"
                    />
                  </td>

                  <td className="border">
                    <input 
                      type="text"
                      placeholder="Song Artist"
                      className="w-full px-2 py-1"
                      value={s.artist}
                      onChange={(e) => handleSongs(s.id, "artist", e.target.value)}
                      required={hasValues}
                      maxLength={100}
                      pattern=".*\S.*"
                    />
                  </td>

                  <td className="border">
                    <input 
                      type="number"
                      placeholder="Play Count"
                      className="w-full px-2 py-1"
                      value={s.playCount}
                      onChange={(e) => handleSongs(s.id, "playCount", e.target.value)}
                      required={hasValues}
                      min={1}
                      max={99999}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </form>
  );
}