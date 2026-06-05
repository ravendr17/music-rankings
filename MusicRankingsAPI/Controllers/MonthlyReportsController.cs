using Microsoft.AspNetCore.Mvc;
using MusicRankingsAPI.Services;

namespace MusicRankingsAPI.Controllers;

[ApiController]
[Route("api/monthly-reports")]
public class MonthlyReportsController : ControllerBase
{
    private readonly IMonthlyReportService _monthlyReportService;

    public MonthlyReportsController(IMonthlyReportService monthlyReportService)
    {
        _monthlyReportService = monthlyReportService;
    }

    [HttpGet("{year:int}")]
    public async Task<ActionResult<List<Object>>> GetMonthlyReports(int year)
    {
        try
        {
            var monthlyReports = await _monthlyReportService.GetMonthlyReports(year);
            return Ok(monthlyReports);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e}");
            return StatusCode(500, new { message = "Unexpected server error occurred."});
        }
    }
}