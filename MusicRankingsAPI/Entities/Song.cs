namespace MusicRankingsAPI.Entities;

public class Song
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Artist { get; set; } = null!;

    public List<MonthlyReportSong> MonthlyReportSongs { get; set; } = [];

    public Song(string title, string artist)
    {
        Title = title;
        Artist = artist;
    }

    protected Song() {}
}