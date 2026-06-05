import { useState } from "react";
import { RankingsTable } from "./RankingsTable";

const baseUrl = import.meta.env.VITE_API_URL;


const currentYear = new Date().getFullYear();

export const AnnualRankingsPage = () => {
  const [year, setYear] = useState(currentYear);
  const [songsFromDb, setSongsFromDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleYear = (e) => {
    setYear(e.target.value);
  }

  const getAnnualSongs = async () => {
    if (!year) {
      alert('Year field required.');
      return;
    }

    setLoading(true);
    const url = `${baseUrl}/api/songs/${year}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      setSongsFromDb(data);
      setHasSearched(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-gray-300 flex h-1/12 items-center">
        <span className="text-xl font-bold ml-10">Year:</span>
        <input className="bg-white border-3 border-solid border-black text-center w-32 h-13 ml-2 rounded text-lg"
               placeholder="Year"
               type="number"
               value={year}
               onChange={handleYear}
        />
        <button className="bg-green-700 text-white text-lg border-3 border-solid border-black font-bold
                           w-32 h-13 ml-auto mr-6 rounded hover:opacity-80 active:opacity-40 cursor-pointer"
                onClick={getAnnualSongs}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg py-40 text-gray-500">
          Loading leaderboard...
        </div>
      ) : songsFromDb.length > 0 ? (
        <>
          <RankingsTable songs={songsFromDb} />
        </>
      ) : hasSearched ? (
        <div className="text-center text-lg py-40 text-gray-500">
          No rankings found for {year}.
        </div>
      ) : (
        <div className="text-center text-lg py-40 text-gray-500">
          Enter the year then click search to view the rankings.
        </div>
      )}
    </>
  );
}