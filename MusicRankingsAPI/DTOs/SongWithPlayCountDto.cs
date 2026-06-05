using System.ComponentModel.DataAnnotations;

namespace MusicRankingsAPI.DTOs;

public record SongWithPlayCountDto(
    [Required] string? Title,
    [Required] string? Artist,
    [Range(1, int.MaxValue)] int PlayCount
);