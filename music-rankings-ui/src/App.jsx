import { useState } from 'react';
import {AddSongsPage} from "./components/AddSongsPage.jsx";
import {OverallRankingsPage} from "./components/OverallRankingsPage.jsx";
import { AnnualRankingsPage } from './components/AnnualRankingsPage.jsx';
import { MonthlyRankingsPage } from './components/MonthlyRankingsPage.jsx';
import { LineChartPage } from './components/LineChartPage.jsx';

const Button = ({text, onClick, isActive}) => {
  return (
    <button className={`text-xl rounded px-6 py-3 cursor-pointer hover:opacity-80 active:opacity-40 
                        mt-8 w-full max-w-[220px]
      ${isActive ? 'bg-blue-600 text-white' : 'bg-white text-black'}
    `}
            onClick={onClick}
    >
      {text}
    </button>
  );
}

export const App = () => {
  const [page, setPage] = useState('overall');
  
  const handlePage = (page) => {
   setPage(page); 
  }
  
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-60 bg-linear-to-b from-[#24243e] via-[#302b63] to-[#0f0c29] 
                      flex flex-col items-center shrink-0">
        <div className="text-white text-2xl text-center pt-5 mb-5 font-bold">
          Music Rankings
        </div>
        <Button text="Add New Top 10" 
                onClick={() => handlePage('addSongs')} 
                isActive={page === 'addSongs'} 
        />
        <Button text="Overall Rankings" 
                onClick={() => handlePage('overall')} 
                isActive={page === 'overall'} 
        />
        <Button text="Annual Rankings" 
                onClick={() => handlePage('annual')} 
                isActive={page === 'annual'} 
        />
        <Button text="Monthly Rankings" 
                onClick={() => handlePage('monthly')} 
                isActive={page === 'monthly'}
        />
        <Button text="Hours Line Chart" 
                onClick={() => handlePage('lineChart')} 
                isActive={page === 'lineChart'}
        />
      </div>
      <div className="flex-1 h-full overflow-y-auto">
        {page === 'addSongs' && <AddSongsPage />}
        {page === 'overall' && <OverallRankingsPage />}
        {page === 'annual' && <AnnualRankingsPage />}
        {page === 'monthly' && <MonthlyRankingsPage />}
        {page === 'lineChart' && <LineChartPage />}
      </div>
    </div>
  );
}
