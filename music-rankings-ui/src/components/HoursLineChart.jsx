import { useState, useEffect } from "react";
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Label, ResponsiveContainer
} from "recharts";

export const HoursLineChart = ({ data, xKey, yKey, lineName }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' }); 
  };

  const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' }); 
  };

  return (
    <div className="w-full max-w-[1250px] p-2 rounded-md border-2 shadow-md">
      <span className="text-xl font-bold flex justify-center text-center mt-3">
        {lineName}
      </span>

      <ResponsiveContainer key={windowWidth} width="100%" height={450}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 40, left: 30, bottom: 30 }}
        >
          <defs>
            <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey={xKey} tickFormatter={formatDateShort} stroke="#000" fontWeight="bold" dy={10} />
          <YAxis stroke="#000" fontWeight="bold" dx={-10}>
            <Label value="Hours Listened" angle={-90} position="insideLeft" offset={-10}
              style={{ textAnchor: 'middle', fontWeight: 'bold', fill: '#000' }} />
          </YAxis>
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #000', borderRadius: '4px', color: '#000' }}
            labelStyle={{ color: '#000' }}
            labelFormatter={(label) => `Month: ${formatDateLong(label)}`}
            formatter={(value) => [`${value}`, 'Total Hours']}
          />

          <Area 
            type="monotone" 
            dataKey={yKey} 
            stroke="none" 
            fill="url(#shadow)" 
            connectNulls
            tooltipType="none"
          />
          
          <Line name="Hours" type="monotone" dataKey={yKey} stroke="#1e40af"
            strokeWidth={2} activeDot={{ r: 8 }} dot={{ strokeWidth: 3, r: 4, fill: '#1e40af' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
