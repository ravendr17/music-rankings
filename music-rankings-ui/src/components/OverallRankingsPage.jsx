import {useState, useEffect} from "react";
import { RankingsTable } from "./RankingsTable";

const baseUrl = import.meta.env.VITE_API_URL;
const url = `${baseUrl}/api/songs/overall`;

export const OverallRankingsPage = () => {
  const [songsFromDb, setSongsFromDb ] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getOverallSongs = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        setSongsFromDb(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getOverallSongs();
  }, []);

  
  return (
    <>
      <div className="bg-gray-300 flex h-1/12 items-center justify-center">
        <span className="text-2xl font-bold">Overall Rankings (Top 40)</span>
      </div>
      {loading ? (
        <div className="text-center text-lg py-40 text-gray-500">
          Loading leaderboard...
        </div>
      ) : songsFromDb.length > 0 ? (
        <RankingsTable songs={songsFromDb} />
      ) : (
        <div className="text-center text-lg py-40 text-gray-500">
          No rankings found.
        </div>
      )}
    </>  
  );
}