const Row = ({ rank, song, maxPlayCount }) => {
  const percentage = maxPlayCount > 0 ? ((song.playCount || 0) / maxPlayCount) * 100 : 0;

  const barStyle = {
    background: `linear-gradient(to right, #93c5fd ${percentage}%, transparent ${percentage}%)`
  };

  return (
    <tr className="text-lg font-semibold">
      <td className="py-1 text-center border-2 border-gray-400">{rank}</td>
      <td className="pl-5 border-2 border-gray-400">{song.title}</td>
      <td className="pl-5 border-2 border-gray-400">{song.artist}</td>
      <td className="text-center border-2 border-gray-400 bg-gray-50 transition-all duration-300" style={barStyle}>
        {song.playCount}
      </td>
    </tr>
  );
};


export const RankingsTable = ({ songs }) => {
  const maxPlayCount = songs.length > 0 
    ? Math.max(...songs.map(s => s.playCount || 0)) 
    : 1;

  return (
    <table className="w-full border-collapse mb-5">
      <thead>
        <tr className="text-xl">
          <th className="w-2/14 border-2 border-gray-400 py-2">Rank</th>
          <th className="w-5/14 border-2 border-gray-400">Song Title</th>
          <th className="w-5/14 border-2 border-gray-400">Song Artist</th>
          <th className="w-2/14 border-2 border-gray-400">Play Count</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, i) => (
          <Row
            key={`${song.title}-${song.artist}`}
            rank={i + 1}
            song={song}
            maxPlayCount={maxPlayCount}
          />
        ))}
      </tbody>
    </table>
  );
};