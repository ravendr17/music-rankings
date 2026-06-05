namespace MusicRankingsAPI.Entities;

public class MonthlyReport
{
    public int Id { get; set; }
    public DateOnly ReportDate { get; set; }
    public int TotalHours { get; set; }

    public List<MonthlyReportSong> MonthlyReportSongs { get; set; } = [];
    
    public MonthlyReport(DateOnly reportDate, int totalHours)
    {
        ReportDate = reportDate;
        TotalHours = totalHours;
    }
    
    protected MonthlyReport() {}
}