using MusicRankingsAPI.DTOs;

namespace MusicRankingsAPI.Services;

public interface IMonthlyReportService
{
    Task<List<Object>> GetMonthlyReports(int year);
}