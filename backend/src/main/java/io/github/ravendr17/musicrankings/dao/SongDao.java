package io.github.ravendr17.musicrankings.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import io.github.ravendr17.musicrankings.dto.TopSongDto;
import io.github.ravendr17.musicrankings.model.Song;

@Repository
public class SongDao {
	private final JdbcTemplate jdbcTemplate;
	
	public SongDao(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void save(Song song) {
		String sql = 
			"INSERT INTO songs " + 
			"(report_id, title, artist, play_count) " +
			"VALUES (?, ?, ?, ?)";
		
		Object[] values = {
			song.getReportId(),
			song.getTitle(),
			song.getArtist(),
			song.getPlayCount()
		};
		
		jdbcTemplate.update(sql, values);
	}
	
	public List<Song> getMonthly(int year, int month) {
		String sql =
			"SELECT title, artist, play_count " +
			"FROM songs " +
			"JOIN reports ON reports.id = songs.report_id " +
			"WHERE reports.year = ? AND reports.month = ? " +
			"ORDER BY play_count DESC";
		
		Object[] values = {
			year,
			month
		};
		
		RowMapper<Song> rowMapper = (rs, rowNum) -> {
			Song song = new Song();
			song.setTitle(rs.getString("title"));
			song.setArtist(rs.getString("artist"));
			song.setPlayCount(rs.getInt("play_count"));
			return song;
		};
		
		return jdbcTemplate.query(sql, rowMapper, values);
	}
	
	public List<TopSongDto> getAllTimeTop40() {
		String sql = 
			"SELECT title, artist, SUM(play_count) AS total_play_count " +
			"FROM songs " +
			"JOIN reports ON reports.id = songs.report_id " +
			"GROUP BY title, artist " +
			"ORDER BY total_play_count DESC " +
			"LIMIT 40";
		
		RowMapper<TopSongDto> rowMapper = (rs, rowNum) -> {
			TopSongDto song = new TopSongDto();
			song.setTitle(rs.getString("title"));
			song.setArtist(rs.getString("artist"));
			song.setTotalPlayCount(rs.getInt("total_play_count"));
			return song;
		};
		
		return jdbcTemplate.query(sql, rowMapper);
	}
}
