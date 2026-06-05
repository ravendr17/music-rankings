import { useState, useEffect, useRef } from "react";

const baseUrl = import.meta.env.VITE_API_URL;
const url = `${baseUrl}/api/songs`;

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

const initialSongs = Array.from({ length: 10 }, () => ({
  title: '',
  artist: '',
  playCount: ''
}));

export const AddSongsPage = () => {
  const [songsDb, setSongsDb] = useState([]);
  const [songs, setSongs] = useState(initialSongs);
  const [topControls, setTopControls] = useState({
    year: currentYear,
    month: currentMonth,
    totalHours: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchSongsFromDb = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network Error');
      return await response.json();
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    fetchSongsFromDb().then((data) => {
      setSongsDb(data);
    });
  }, []);

  const handleTopControls = (e) => {
    setTopControls({
      ...topControls,
      [e.target.name]: e.target.value
    });
  };

  const handleSongs = (index, e) => {
    const { name, value } = e.target;
    const newSongs = [...songs];

    newSongs[index][name] = value;

    if (name === 'title' || name === 'artist') {
      const matchedSong = songsDb.find(
          (dbSong) => `${dbSong.title} - ${dbSong.artist}`.toLowerCase() === value.toLowerCase()
      );
      if (matchedSong) {
        newSongs[index].title = matchedSong.title;
        newSongs[index].artist = matchedSong.artist;
      }
    }

    setSongs(newSongs);
  };

  const validateForm = (topControls, songs) => {
    if (!topControls.year ||
        !topControls.month ||
        topControls.month === "month" ||
        !topControls.totalHours) {
      return "Please fill out all the top controls (Year, Month, Total Hours).";
    }

    const activeRows = songs.filter(song => song.title || song.artist || song.playCount);

    if (activeRows.length === 0) {
      return "Please fill out at least one song row.";
    }

    const hasIncompleteRow = activeRows.some(song =>
        !song.title.trim() || !song.artist.trim() || !song.playCount
    );

    if (hasIncompleteRow) {
      return "Please complete all fields for your active song rows.";
    }

    return null;
  };

  const submitSongs = async () => {
    const errorMessage = validateForm(topControls, songs);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const reportDate = `${topControls.year}-${topControls.month}-01`;
    const totalHours = parseInt(topControls.totalHours, 10);
    const cleanedSongs = songs
        .filter(song => song.title.trim() !== '')
        .map(song => ({
          title: song.title.trim(),
          artist: song.artist.trim(),
          playCount: parseInt(song.playCount, 10)
        }));

    const data = {
      reportDate: reportDate,
      totalHours: totalHours,
      songs: cleanedSongs
    };

    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error, status: ${response.status}`);
      }

      await response.json();
      setSuccessMessage(`Successfully recorded for ${reportDate}.`);
      alert(`Monthly report for ${reportDate} created successfully.`);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-300 flex h-1/12 items-center">
        <input className="bg-white border-3 border-solid border-black text-center w-32 h-13 ml-6 rounded text-lg"
               placeholder="Year"
               type="number"
               value={topControls.year}
               name="year"
               onChange={handleTopControls}
        />
        <select className="bg-white border-3 border-solid border-black w-35 h-13 ml-6 rounded text-center text-lg"
                value={topControls.month}
                name="month"
                onChange={handleTopControls}
        >
          <option hidden>Month</option>
          {months.map((m, i) => {
            const monthNum = String(i + 1).padStart(2, '0');
            return <option key={m} value={monthNum}>{m}</option>
          })}
        </select>
        <input className="bg-white border-3 border-solid border-black text-center w-32 h-13 ml-6 rounded text-lg"
               placeholder="Total Hours"
               type="number"
               name="totalHours"
               value={topControls.totalHours}
               onChange={handleTopControls}
        />
        <button className="bg-green-700 text-white text-lg border-3 border-solid border-black font-bold
                          w-32 h-13 ml-auto mr-6 rounded hover:opacity-80 active:opacity-40 cursor-pointer"
                onClick={submitSongs}
                disabled={loading}
        >
          Submit
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg py-40 text-gray-500">
          Submitting...
        </div>
      ) : successMessage ? (
        <div className="text-center text-lg py-40 text-gray-500">
          {successMessage}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[1fr_5fr_5fr_2fr] gap-3 items-center mt-4">
            <span className="text-center font-bold text-lg">Rank</span>
            <span className="font-bold text-lg">Song Title</span>
            <span className="font-bold text-lg">Song Artist</span>
            <span className="font-bold text-lg">Play Count</span>

            {songs.map((song, i) => (
              <SongRow key={i}
                       index={i}
                       rank={i + 1}
                       songData={song}
                       theFunction={handleSongs}
              />
            ))}
          </div>

          <datalist id="db-song-suggestions">
            {songsDb.map((dbSong, i) => (
              <option key={i} value={`${dbSong.title} - ${dbSong.artist}`} />
            ))}
          </datalist>
        </>
      )}
    </>
  );
};

const SongRow = ({ rank, songData, theFunction, index }) => {
  const titleRef = useRef(null);
  const artistRef = useRef(null);

  const handleFocusCheck = (ref, currentValue) => {
    if (!currentValue.trim()) {
      ref.current.setAttribute("list", "");
    } else {
      ref.current.setAttribute("list", "db-song-suggestions");
    }
  };

  return (
    <>
      <span className="text-center text-lg font-bold">{rank}</span>
      <input ref={titleRef}
             className="border-3 border-solid border-black text-center text-lg h-11 rounded font-bold"
             placeholder="Song title"
             name="title"
             list={songData.title.trim() ? "db-song-suggestions" : ""}
             value={songData.title}
             onMouseDown={() => handleFocusCheck(titleRef, songData.title)}
             onFocus={() => handleFocusCheck(titleRef, songData.title)}
             onChange={(e) => {
               theFunction(index, e);
               if (e.target.value.trim()) {
                 titleRef.current.setAttribute("list", "db-song-suggestions");
               }
            }}
      />
      <input ref={artistRef}
             className="border-3 border-solid border-black text-center text-lg h-11 rounded font-bold"
             placeholder="Song artist"
             name="artist"
             list={songData.artist.trim() ? "db-song-suggestions" : ""}
             value={songData.artist}
             onMouseDown={() => handleFocusCheck(artistRef, songData.artist)}
             onFocus={() => handleFocusCheck(artistRef, songData.artist)}
             onChange={(e) => {
               theFunction(index, e);
               if (e.target.value.trim()) {
                 artistRef.current.setAttribute("list", "db-song-suggestions");
               }
            }}
      />
      <input className="min-w-0 border-3 border-solid border-black text-center text-lg h-11 rounded mr-3 font-bold"
             placeholder="Play count"
             type="number"
             name="playCount"
             value={songData.playCount}
             onChange={(e) => theFunction(index, e)}
      />
    </>
  );
};