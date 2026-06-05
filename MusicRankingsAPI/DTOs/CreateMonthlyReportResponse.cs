namespace MusicRankingsAPI.DTOs;

public record CreateMonthlyReportResponse(
    int Id,
    DateOnly ReportDate,
    int TotalHours
);