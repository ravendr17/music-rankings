package io.github.ravendr17.musicrankings.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.github.ravendr17.musicrankings.dto.TopSongResponse;
import io.github.ravendr17.musicrankings.service.SongService;

@RestController
@RequestMapping("/api/songs")
@CrossOrigin(origins = "http://localhost:5173")
public class SongController {
	private final SongService songService;
	
	public SongController(SongService songService) {
		this.songService = songService;
	}
	
	@GetMapping
	public List<TopSongResponse> findTopSongsByYear(
		@RequestParam int year,
		@RequestParam int limit
	) {
		return songService.findTopSongsByYear(year, limit);
	}
	
	@GetMapping("/all-time")
	public List<TopSongResponse> findAllTimeTopSongs(
		@RequestParam int limit
	) {
		return songService.findAllTimeTopSongs(limit);
	}
}
