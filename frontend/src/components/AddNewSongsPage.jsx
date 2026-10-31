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

export default function AddNewSongsPage({config}) {
  const apiBaseUrl = config.apiBaseUrl;
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [totalHours, setTotalHours] = useState("");
  
  const emptySong = {title: "", artist: "", playCount: ""};

  const [songs, setSongs] = useState([
    emptySong, emptySong, emptySong, emptySong, emptySong,
    emptySong, emptySong, emptySong, emptySong, emptySong
  ]);

  function updateSong(index, field, value) {
    // create a new copy of the array
    const updatedSongs = [...songs];

    updatedSongs[index] = {
      // create a new copy of the target object
      ...updatedSongs[index],
      // change the field's value
      [field]: value
    };

    setSongs(updatedSongs);
  }

  async function handleSubmit(e) {
    // stop the page from reloading
    e.preventDefault();

    const filled = songs.filter((s) => 
      s.title.length > 0 || s.artist.length > 0 || s.playCount.length > 0
    );

    if (filled.length === 0) {
      alert("Please input at least 1 song.");
      return;
    }

    const hasIncompleteData = filled.some((s) => 
      s.title.length === 0 || s.artist.length === 0 || s.playCount.length === 0
    );

    if (hasIncompleteData) {
      alert("Some songs are missing a title, artist, or play count. " +
        "Please complete or clear them.");
      return;
    }

    const payload = {
      year: Number(year),
      month: Number(month),
      totalHours: Number(totalHours),
      songs: filled.map((s) => ({
        title: s.title,
        artist: s.artist,
        playCount: Number(s.playCount),
      })),
    };
    
    const url = `${apiBaseUrl}/reports`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Report created successfully:", result);
    } catch (error) {
      console.error("Error creating report:", error.message);
    }
  }

  const rowInputCell = "w-full focus:outline-none p-2";

  return (
    <form 
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="bg-gray-300 flex p-4 gap-16 items-center">
        <input 
          type="number"
          placeholder="Year"
          className="bg-white p-2 w-40 rounded-sm"
          required
          min={2000}
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
          min={1}
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

      <table className="border border-collapse m-4">
        <colgroup>
          <col className="w-20" />
          <col />
          <col />
          <col className="w-45" />
        </colgroup>
        <thead>
          <tr>
            <th className="border py-2">Rank</th>
            <th className="border">Song Title</th>
            <th className="border">Song Artist</th>
            <th className="border">Play Count</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, i) => (
            <tr key={i}>
              <td className="border text-center">{i + 1}</td>
              <td className="border">
                <input
                  type="text"
                  placeholder="Enter song title"
                  className={rowInputCell}
                  maxLength={100}
                  value={song.title}
                  onChange={(e) => updateSong(i, "title", e.target.value)}
                />
              </td>
              <td className="border">
                <input
                  type="text"
                  placeholder="Enter song artist"
                  className={rowInputCell}
                  maxLength={100}
                  value={song.artist}
                  onChange={(e) => updateSong(i, "artist", e.target.value)}
                />
              </td>
              <td className="border">
                <input
                  type="number"
                  placeholder="Enter play count"
                  className={rowInputCell}
                  min={1}
                  max={99999}
                  step={1}
                  value={song.playCount}
                  onChange={(e) => updateSong(i, "playCount", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </form>
  );
}