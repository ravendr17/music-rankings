import { useState } from "react";
import AddNewSongsPage from "./components/AddNewSongsPage";
import AllTimeRankingsPage from "./components/AllTimeRankingsPage";
import AnnualRankingsPage from "./components/AnnualRankingsPage";
import MonthlyRankingsPage from "./components/MonthlyRankingsPage";

export default function App() {
  const [page, setPage] = useState("all-time");

  const sidebarBtn = "bg-gray-100 py-4 cursor-pointer " +
    "hover:bg-gray-200 active:bg-gray-300";

  return (
    <div className="min-h-screen flex">

      <div className="w-50 bg-gray-100 flex flex-col">
        <div className="font-bold text-center py-6 text-lg mb-4">
          Music Rankings
        </div>

        <button className={sidebarBtn} 
          onClick={() => setPage("add-new-songs-page")}
        >
          Add New Songs
        </button>

        <button className={sidebarBtn}
          onClick={() => setPage("all-time-rankings-page")}
        >
          All-Time
        </button>

        <button className={sidebarBtn}
          onClick={() => setPage("annual-rankings-page")}
        >
          Annual
        </button>

        <button className={sidebarBtn}
          onClick={() => setPage("monthly-rankings-page")}
        >
          Monthly
        </button>
      </div>

      <div className="flex flex-1">
        {page === "add-new-songs-page" && <AddNewSongsPage />}
        {page === "all-time-rankings-page" && <AllTimeRankingsPage />}
        {page === "annual-rankings-page" && <AnnualRankingsPage />}
        {page === "monthly-rankings-page" && <MonthlyRankingsPage />}
      </div>
    </div>
  );
}
