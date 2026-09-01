import { useState } from "react";
import SongInputRow from "./SongInputRow";
import {z} from "zod";
import { reportSchema } from "../schemas";

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

  const [songs, setSongs] = useState([
    {id: 1, title: '', artist: '', playCount: ''},
    {id: 2, title: '', artist: '', playCount: ''},
    {id: 3, title: '', artist: '', playCount: ''},
    {id: 4, title: '', artist: '', playCount: ''},
    {id: 5, title: '', artist: '', playCount: ''},
    {id: 6, title: '', artist: '', playCount: ''},
    {id: 7, title: '', artist: '', playCount: ''},
    {id: 8, title: '', artist: '', playCount: ''},
    {id: 9, title: '', artist: '', playCount: ''},
    {id: 10, title: '', artist: '', playCount: ''}
  ]);

  function updateSong(id: number, field: 'title' | 'artist' | 'playCount', value: string) {
    setSongs(songs.map((s) => (
      s.id === id ? {...s, [field]: value}: s
    )));
  }

  function handleSubmit() {
    const filledSongs = songs.filter(s => (
      s.title.trim() || s.artist.trim() || s.playCount.trim()
    ));

    const result = reportSchema.safeParse({
      year,
      month,
      totalHours: totalHours || undefined, 
      songs: filledSongs
    });

    if (!result.success) {
      console.log(z.flattenError(result.error));
      return;
    }
    console.log(result);
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center px-4 py-2 gap-10">
        <input 
          type="number" 
          placeholder="Year"
          className="border-2 rounded-md p-2 bg-white"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          className="border-2 rounded-md px-10 py-2.5 bg-white"
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
          className="border-2 rounded-md p-2 bg-white"
          value={totalHours}
          onChange={(e) => setTotalHours(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[1fr_6fr_6fr_1fr] gap-2 items-center px-4 py-2">
        <span className="font-bold text-center text-lg">Rank</span>
        <span className="font-bold text-lg">Song Title</span>
        <span className="font-bold text-lg">Song Artist</span>
        <span className="font-bold text-lg">Play Count</span>
        {songs.map((song) => (
          <SongInputRow key={song.id} song={song} updateSong={updateSong} />
        ))}
      </div>
      <div className="flex justify-end px-4 py-2">
        <button 
          className="border rounded-md px-12 py-2.5 bg-green-600 text-white font-bold text-lg
            hover:bg-green-500 cursor-pointer"
          onClick={() => handleSubmit()}
        >Submit
        </button>
      </div>
    </div>
  );
}