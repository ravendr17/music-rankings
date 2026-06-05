using Microsoft.EntityFrameworkCore;
using MusicRankingsAPI.Data;

namespace MusicRankingsAPI.Services;

public class MonthlyReportService : IMonthlyReportService
{
    private readonly AppDbContext _context;

    public MonthlyReportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Object>> GetMonthlyReports(int year)
    {
        return await _context.MonthlyReports
            .Where(mr => mr.ReportDate.Year == year)
            .OrderBy(mr => mr.ReportDate)
            .Select(mr => new
            {
                ReportDate = mr.ReportDate,
                TotalHours = mr.TotalHours
            })
            .Cast<Object>()
            .ToListAsync();
    }
}