using MusicRankingsAPI.DTOs;

namespace MusicRankingsAPI.Services;

public interface ISongService
{
  Task<CreateMonthlyReportResponse> CreateMonthlyReport(CreateMonthlyReportRequest request);
  Task<List<SongDto>> GetAllSongs();
  Task<List<SongWithPlayCountDto>> GetOverallTop40Songs();
  Task<List<SongWithPlayCountDto>> GetAnnualTop25Songs(int year);
  Task<List<SongWithPlayCountDto>> GetMonthlySongs(DateOnly reporDate);
}