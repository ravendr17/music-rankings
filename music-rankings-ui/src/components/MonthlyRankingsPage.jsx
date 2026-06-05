import { useState } from "react";
import { RankingsTable } from "./RankingsTable";

const baseUrl = import.meta.env.VITE_API_URL;

const now = new Date();
const currentYear = now.getFullYear();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                'September', 'October', 'November', 'December'];
const currentMonth = String(now.getMonth() + 1).padStart(2, '0');

export const MonthlyRankingsPage = () => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [songsFromDb, setSongsFromDb] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleYear = (e) => {
    setYear(e.target.value);
  }

  const handleMonth = (e) => {
    setMonth(e.target.value);
  }

  const getMonthlySongs = async () => {
    if (!year) {
      alert('Year field required.');
      return;
    }

    if (!month) {
      alert('Month field required.');
      return;
    }

    setLoading(true);
    const url = `${baseUrl}/api/songs/${year}/${month}`;
    
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
        <span className="text-xl font-bold ml-10">Month:</span>
        <select className="bg-white border-3 border-solid border-black w-35 h-13 ml-2 rounded text-center text-lg"
                value={month}
                name="month"
                onChange={handleMonth}
        >
          <option hidden>Month</option>
          {months.map((m, i) => {
            const monthNum = String(i + 1).padStart(2, '0');
            return <option key={m} value={monthNum}>{m}</option>
          })}
        </select>
        <button className="bg-green-700 text-white text-lg border-3 border-solid border-black font-bold
                           w-32 h-13 ml-auto mr-6 rounded hover:opacity-80 active:opacity-40 cursor-pointer"
                onClick={getMonthlySongs}
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
          No rankings found for {months[parseInt(month, 10) - 1]} {year}.
        </div>
      ) : (
        <div className="text-center text-lg py-40 text-gray-500">
          Enter the year and month then click search to view the rankings.
        </div>
      )}
    </>
  );
}