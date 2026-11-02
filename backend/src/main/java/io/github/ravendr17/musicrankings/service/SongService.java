package io.github.ravendr17.musicrankings.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.ravendr17.musicrankings.dao.SongDao;
import io.github.ravendr17.musicrankings.dto.SongLookupResponse;
import io.github.ravendr17.musicrankings.dto.TopSongResponse;
import io.github.ravendr17.musicrankings.exception.SongsNotFoundException;

@Service
public class SongService {
	private final SongDao songDao;
	
	public SongService(SongDao songDao) {
		this.songDao = songDao;
	}
	
	public List<TopSongResponse> findTopSongsByYear(int year, int limit) {
		List<TopSongResponse> songs = songDao.findTopSongsByYear(year, limit);
		
		if (songs.isEmpty()) {
			throw new SongsNotFoundException(year);
		}
		
		return songs;
	}
	
	public List<TopSongResponse> findAllTimeTopSongs(int limit) {
		List<TopSongResponse> songs = songDao.findAllTimeTopSongs(limit);
		
		if (songs.isEmpty()) {
			throw new SongsNotFoundException();
		}
		
		return songs;
	}
	
	public List<SongLookupResponse> findAllForLookup() {
		return songDao.findAllForLookup();
	}
}
