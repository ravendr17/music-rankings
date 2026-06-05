namespace MusicRankingsAPI.Entities;

public class MonthlyReportSong
{
    public int Id { get; set; }
    public int PlayCount { get; set; }
    
    // Foreign keys
    public int MonthlyReportId { get; set; }
    public int SongId { get; set; }

    public MonthlyReport MonthlyReport { get; set; } = null!;
    public Song Song { get; set; } = null!;

    public MonthlyReportSong(MonthlyReport monthlyReport, Song song, int playCount)
    {
        MonthlyReport = monthlyReport;
        Song = song;
        PlayCount = playCount;
    }
    
    protected MonthlyReportSong() {}
}