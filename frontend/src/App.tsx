import { useState } from "react";
import AddNewSongsPage from "./components/AddNewSongsPage";
import AllTimeRankingsPage from "./components/AllTimeRankingsPage";
import AnnualRankingsPage from "./components/AnnualRankingsPage";
import MonthlyRankingsPage from "./components/MonthlyRankingsPage";

export default function App() {
  const [page, setPage] = useState("add-new-songs-page");

  return (
    <div className="min-h-screen flex">

      <aside className="w-55 shrink-0 bg-gray-200 p-4 
        flex flex-col items-center"
      >
        <h1 className="font-bold text-xl mb-10">Music Rankings</h1>

        <nav className="flex flex-col w-full gap-6">

          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
              rounded-sm hover:bg-blue-700 active:bg-blue-600"
            onClick={() => setPage("add-new-songs-page")}
          >
            Add New Songs
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
            onClick={() => setPage("all-time-rankings-page")}
          >
            All-Time
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
            onClick={() => setPage("annual-rankings-page")}
          >
            Annual
          </button>
          <button 
            className="cursor-pointer bg-blue-800 text-white w-full py-2
            rounded-sm hover:bg-blue-700 active:bg-blue-600"
            onClick={() => setPage("monthly-rankings-page")}
          >
            Monthly
          </button>

        </nav>
        
      </aside>

      <main className="flex-1 flex flex-col">
        {page === "add-new-songs-page" && <AddNewSongsPage />}
        {page === "all-time-rankings-page" && <AllTimeRankingsPage />}
        {page === "annual-rankings-page" && <AnnualRankingsPage />}
        {page === "monthly-rankings-page" && <MonthlyRankingsPage />}
      </main>

    </div>
  );
}
