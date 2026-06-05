import { useState } from "react";
import { HoursLineChart } from "./HoursLineChart";

const baseUrl = import.meta.env.VITE_API_URL;

const currentYear = new Date().getFullYear();

export const LineChartPage = () => {
  const [year, setYear] = useState(currentYear);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleYear = (e) => {
    setYear(e.target.value);
  }

  const getMonthlyReports = async () => {
    if (!year) {
      alert('Year field required.');
      return;
    }

    setLoading(true);
    const url = `${baseUrl}/api/monthly-reports/${year}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      setMonthlyReports(data);
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
                onClick={getMonthlyReports}
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg py-40 text-gray-500">
          Loading line chart...
        </div>
      ) : monthlyReports.length > 0 ? (
          <div className="flex justify-center mt-10">
            <HoursLineChart
              data={monthlyReports}
              xKey="reportDate"
              yKey="totalHours"
              lineName="Monthly Listening Hours"
            />
          </div>
      ) : hasSearched ? (
        <div className="text-center text-lg py-40 text-gray-500">
          No data found for {year}.
        </div>
      ) : (
        <div className="text-center text-lg py-40 text-gray-500">
          Enter the year then click search to view the line chart.
        </div>
      )}
    </>
  );

}