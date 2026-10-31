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
  const [song1, setSong1] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song2, setSong2] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song3, setSong3] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song4, setSong4] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song5, setSong5] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song6, setSong6] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song7, setSong7] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song8, setSong8] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song9, setSong9] = useState({
    title: "", artist: "", playCount: ""
  });
  const [song10, setSong10] = useState({
    title: "", artist: "", playCount: ""
  });

  const rowInputCell = "w-full focus:outline-none p-2";

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
          <tr>
            <td className="border text-center">1</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song1.title}
                onChange={(e) => setSong1({...song1, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song1.artist}
                onChange={(e) => setSong1({...song1, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song1.playCount}
                onChange={(e) => setSong1({...song1, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">2</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song2.title}
                onChange={(e) => setSong2({...song2, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song2.artist}
                onChange={(e) => setSong2({...song2, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song2.playCount}
                onChange={(e) => setSong2({...song2, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">3</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song3.title}
                onChange={(e) => setSong3({...song3, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song3.artist}
                onChange={(e) => setSong3({...song3, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song3.playCount}
                onChange={(e) => setSong3({...song3, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">4</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song4.title}
                onChange={(e) => setSong4({...song4, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song4.artist}
                onChange={(e) => setSong4({...song4, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song4.playCount}
                onChange={(e) => setSong4({...song4, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">5</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song5.title}
                onChange={(e) => setSong5({...song5, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song5.artist}
                onChange={(e) => setSong5({...song5, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song5.playCount}
                onChange={(e) => setSong5({...song5, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">6</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song6.title}
                onChange={(e) => setSong6({...song6, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song6.artist}
                onChange={(e) => setSong6({...song6, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song6.playCount}
                onChange={(e) => setSong6({...song6, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">7</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song7.title}
                onChange={(e) => setSong7({...song7, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song7.artist}
                onChange={(e) => setSong7({...song7, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song7.playCount}
                onChange={(e) => setSong7({...song7, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">8</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song8.title}
                onChange={(e) => setSong8({...song8, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song8.artist}
                onChange={(e) => setSong8({...song8, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song8.playCount}
                onChange={(e) => setSong8({...song8, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">9</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song9.title}
                onChange={(e) => setSong9({...song9, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song9.artist}
                onChange={(e) => setSong9({...song9, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song9.playCount}
                onChange={(e) => setSong9({...song9, playCount: e.target.value})}
              />
            </td>
          </tr>

          <tr>
            <td className="border text-center">10</td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song title"
                className={rowInputCell}
                maxLength={100}
                value={song10.title}
                onChange={(e) => setSong10({...song10, title: e.target.value})}
              />
            </td>
            <td className="border">
              <input 
                type="text"
                placeholder="Enter song artist"
                className={rowInputCell}
                maxLength={100}
                value={song10.artist}
                onChange={(e) => setSong10({...song10, artist: e.target.value})}
              />
            </td>
            <td className="border">  
              <input 
                type="number"
                placeholder="Enter play count"
                className={rowInputCell}
                min={1}
                max={99999}
                value={song10.playCount}
                onChange={(e) => setSong10({...song10, playCount: e.target.value})}
              />
            </td>
          </tr>

        </tbody>
      </table>

    </form>
  );
}