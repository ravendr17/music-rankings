import { useEffect, useRef, useState } from "react";
import SongInputRow from "./SongInputRow";
import {z} from "zod";
import { reportSchema, type Report } from "../schemas";
import ErrorsModal from "./ErrorsModal";
import ConfirmModal from "./ConfirmModal";
import { API_BASE_URL } from "../env";

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
  const errorsModalRef = useRef<HTMLDialogElement>(null);
  const confirmModalRef = useRef<HTMLDialogElement>(null);
  const [year, setYear] = useState(() => String(new Date().getFullYear()));
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [totalHours, setTotalHours] = useState('');
  const [errors, setErrors] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [payload, setPayload] = useState<Report | null>(null);

  const [songs, setSongs] = useState(
    Array.from({length: 10}, (_, i) => ({
      id: i + 1,
      title: '',
      artist: '',
      playCount: ''
    }))
  );

  useEffect(() => {
    if (showErrors) {
      errorsModalRef.current?.showModal();
    } else {
      errorsModalRef.current?.close();
    }
  }, [showErrors]);

  useEffect(() => {
    if (showConfirm) {
      confirmModalRef.current?.showModal();
    } else {
      confirmModalRef.current?.close();
    }
  }, [showConfirm]);

  function updateSong(id: number, field: 'title' | 'artist' | 'playCount', value: string) {
    setSongs(songs.map((s) => (
      s.id === id ? {...s, [field]: value}: s
    )));
  }

  function handleSend() {
    const data = validateInput();

    if (!data) return;

    setPayload(data);
    setShowConfirm(true);
  }

  function validateInput() {
    setErrors('');
    setShowErrors(false);

    const filledSongs = songs.filter(s => (
      s.title.trim() || s.artist.trim() || s.playCount.trim()
    ));

    const parseResult = reportSchema.safeParse({
      year,
      month,
      totalHours: totalHours, 
      songs: filledSongs
    });

    if (!parseResult.success) {
      const errors = (z.flattenError(parseResult.error));
      setErrors(JSON.stringify(errors.fieldErrors, null, 2));
      setShowErrors(true);
      return;
    }

    return parseResult.data;
  }

  async function sendPayload(payload: Report) {
    const apiPayload = {
      year: payload.year,
      month: payload.month,
      total_hours: payload.totalHours,
      songs: payload.songs.map((song) => ({
        title: song.title,
        artist: song.artist,
        play_count: song.playCount,
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(apiPayload)
      });

      if (!response.ok) {
        const detail = await response.json();
        setErrors(JSON.stringify(detail, null, 2));
        setShowErrors(true);
        return;
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      setErrors(error instanceof Error ? error.message: 'Unknown error.');
      setShowErrors(true);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center px-4 py-2 gap-10">
          <input 
            type="number" 
            placeholder="Year"
            className="border-2 rounded p-2 bg-white"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <select
            className="border-2 rounded px-10 py-2.5 bg-white"
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
            className="border-2 rounded p-2 bg-white"
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
            className="border rounded px-12 py-2.5 bg-green-600 text-white font-bold text-lg
              hover:bg-green-500 cursor-pointer"
            onClick={() => handleSend()}
          >Send
          </button>
        </div>
      </div>
      
      <ErrorsModal 
        errorsModalRef={errorsModalRef} 
        errors={errors} 
        setShowErrors={setShowErrors} 
      />

      <ConfirmModal
        confirmModalRef={confirmModalRef}
        payload={payload}
        setShowConfirm={setShowConfirm}
        sendPayload={sendPayload}
      />
    </>
  );
}