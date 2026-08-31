interface SongInputRowProps {
  song: {id: number, title: string, artist: string, playCount: string};
  updateSong: (id: number, field: 'title' | 'artist' | 'playCount', value: string) => void;
}

export default function SongInputRow({song, updateSong} : SongInputRowProps) {
  return (
    <>
      <span
        className="font-bold text-center text-lg"
      >{song.id}
      </span>
      <input 
        type="text"
        placeholder="Song Title"
        className="border rounded-md p-1.5 text-center bg-white"
        value={song.title}
        onChange={(e) => updateSong(song.id, 'title', e.target.value)}
      />
      <input 
        type="text"
        placeholder="Song Artist"
        className="border rounded-md p-1.5 text-center bg-white"
        value={song.artist}
        onChange={(e) => updateSong(song.id, 'artist', e.target.value)}
      />
      <input
      type="number"
        placeholder="Play Count"
        className="border rounded-md p-1.5 text-center bg-white"
        value={song.playCount}
        onChange={(e) => updateSong(song.id, 'playCount', e.target.value)}
      />
    </> 
  );
}