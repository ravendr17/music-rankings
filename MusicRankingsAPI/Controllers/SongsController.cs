using Microsoft.AspNetCore.Mvc;
using MusicRankingsAPI.DTOs;
using MusicRankingsAPI.Exceptions;
using MusicRankingsAPI.Services;

namespace MusicRankingsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SongsController : ControllerBase
{
    private readonly ISongService _songService;

    public SongsController(ISongService songService)
    {
        _songService = songService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateMonthlyReportRequest request)
    {
        try
        {
            var result = _songService.CreateMonthlyReport(request);
            return Created(string.Empty, result);
        }
        catch (DuplicateReportException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex}");
            return StatusCode(500, new { message = "Unexpected server error occurred." });
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<SongDto>>> GetAllSongs()
    {
        try
        {
            var songs = await _songService.GetAllSongs();
            return Ok(songs);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex}");
            return StatusCode(500, new { message = "Unexpected server error occurred." });
        }
    }

    [HttpGet("overall")]
    public async Task<ActionResult<List<SongWithPlayCountDto>>> GetOverallTop40Songs()
    {
        try
        {
            var songs = await _songService.GetOverallTop40Songs();
            return Ok(songs);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e}");
            return StatusCode(500, new { message = "Unexpected server error occurred." });
        }
    }

    [HttpGet("{year:int}")]
    public async Task<ActionResult<List<SongWithPlayCountDto>>> GetAnnualTop25Songs(int year)
    {
        try
        {
            var songs = await _songService.GetAnnualTop25Songs(year);
            return Ok(songs);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e}");
            return StatusCode(500, new { message = "Unexpected server error occurred." });
        }
    }

    [HttpGet("{year:int}/{month:int}")]
    public async Task<ActionResult<List<SongWithPlayCountDto>>> GetMonthlySongs(int year, int month)
    {
        try
        {
            DateOnly reportDate = new DateOnly(year, month, 1);
            var songs = await _songService.GetMonthlySongs(reportDate);
            return Ok(songs);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error: {e}");
            return StatusCode(500, new { message = "Unexpected server error occurred." });
        }
    }
}