using System.ComponentModel.DataAnnotations;

namespace MusicRankingsAPI.DTOs;

public record CreateMonthlyReportRequest(
    [Required] DateOnly? ReportDate,
    [Range(1, int.MaxValue)] int TotalHours,
    [Required, MinLength(1)] List<SongWithPlayCountDto>? Songs
);