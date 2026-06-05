using Microsoft.EntityFrameworkCore;
using MusicRankingsAPI.DTOs;
using MusicRankingsAPI.Entities;
using MusicRankingsAPI.Exceptions;
using MusicRankingsAPI.Data;

namespace MusicRankingsAPI.Services;

public class SongService : ISongService
{
    private readonly AppDbContext _context;

    public SongService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<CreateMonthlyReportResponse> CreateMonthlyReport(CreateMonthlyReportRequest request)
    {
        var existingMonthlyReports = _context.MonthlyReports;
        var alreadyExists = await existingMonthlyReports.AnyAsync(mr => mr.ReportDate == request.ReportDate);

        if (alreadyExists)
        {
            throw new DuplicateReportException($"A monthly report for {request.ReportDate} already exists.");
        }
            
        MonthlyReport monthlyReport = new MonthlyReport(request.ReportDate!.Value, request.TotalHours);

        foreach (SongWithPlayCountDto inputSong in request.Songs!)
        {
            var existingSongs = _context.Songs;

            var existingSong = await existingSongs.FirstOrDefaultAsync(s => s.Title == inputSong.Title &&
                                                                 s.Artist == inputSong.Artist);

            Song song;
            if (existingSong != null)
            {
                song = existingSong;
            }
            else
            {
                song = new Song(inputSong.Title!, inputSong.Artist!);
            }

            MonthlyReportSong monthlyReportSong = new MonthlyReportSong(monthlyReport, song, inputSong.PlayCount);
            monthlyReport.MonthlyReportSongs.Add(monthlyReportSong);
        }

        _context.MonthlyReports.Add(monthlyReport);

        await _context.SaveChangesAsync();

        return new CreateMonthlyReportResponse(
            Id: monthlyReport.Id,
            ReportDate: monthlyReport.ReportDate,
            TotalHours: monthlyReport.TotalHours
        );
    }

    public async Task<List<SongDto>> GetAllSongs()
    {
        var songs = await _context.Songs.Select(s => new SongDto(
            s.Title,
            s.Artist
        )).ToListAsync();

        return songs;
    }

    public async Task<List<SongWithPlayCountDto>> GetOverallTop40Songs()
    {
        var top40Songs = await _context.Songs
            .Select(s => new
            {
                s.Title,
                s.Artist,
                TotalPlayCount = s.MonthlyReportSongs.Sum(mrs => mrs.PlayCount)
            })
            .OrderByDescending(x => x.TotalPlayCount)
            .Take(40)
            .ToListAsync();

        return top40Songs
            .Select(s => new SongWithPlayCountDto(
                s.Title,
                s.Artist,
                s.TotalPlayCount
            ))
            .ToList();
    }

    public async Task<List<SongWithPlayCountDto>> GetAnnualTop25Songs(int year){
        var top25Songs = await _context.Songs
            .Select(s => new
            {
                Title = s.Title,
                Artist = s.Artist,
                PlayCount = s.MonthlyReportSongs
                                .Where(mrs => mrs.MonthlyReport.ReportDate.Year == year)
                                .Sum(mrs => mrs.PlayCount)
            })
            .Where(x => x.PlayCount > 0)
            .OrderByDescending(x => x.PlayCount)
            .Take(25)
            .ToListAsync();

        return top25Songs
            .Select(s => new SongWithPlayCountDto(
                s.Title,
                s.Artist,
                s.PlayCount
            ))
            .ToList();
    }

    public async Task<List<SongWithPlayCountDto>> GetMonthlySongs(DateOnly reportDate)
    {
        var songs = await _context.Songs
            .Select(s => new
            {
                Title = s.Title,
                Artist = s.Artist,
                PlayCount = s.MonthlyReportSongs
                                .Where(mrs => mrs.MonthlyReport.ReportDate.Year == reportDate.Year &&
                                       mrs.MonthlyReport.ReportDate.Month == reportDate.Month)
                                .Sum(mrs => mrs.PlayCount)
            })
            .Where(x => x.PlayCount > 0)
            .OrderByDescending(x => x.PlayCount)
            .ToListAsync();

        return songs
            .Select(s => new SongWithPlayCountDto(
                s.Title,
                s.Artist,
                s.PlayCount
            ))
            .ToList();
    }
}