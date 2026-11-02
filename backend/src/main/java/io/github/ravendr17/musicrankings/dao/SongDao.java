package io.github.ravendr17.musicrankings.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import io.github.ravendr17.musicrankings.dto.SongLookupResponse;
import io.github.ravendr17.musicrankings.dto.TopSongResponse;
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
	
	public List<Song> findAllByReportId(long reportId) {
		String sql = 
			"SELECT id, title, artist, play_count " +
			"FROM songs " +
			"WHERE report_id = ?";
		
		RowMapper<Song> rowMapper = (rs, rowNum) -> {
			Song song = new Song();
			song.setId(rs.getLong("id"));
			song.setTitle(rs.getString("title"));
			song.setArtist(rs.getString("artist"));
			song.setPlayCount(rs.getInt("play_count"));
			return song;
		};
		
		return jdbcTemplate.query(sql, rowMapper, reportId);
	}
	
	public List<TopSongResponse> findTopSongsByYear(int year, int limit) {
		String sql =
			"SELECT title, artist, SUM(play_count) AS total_play_count " +
			"FROM songs " +
			"JOIN reports " +
			"ON reports.id = songs.report_id " +
			"WHERE reports.year = ? " + 
			"GROUP BY title, artist " +
			"ORDER BY total_play_count DESC " +
			"LIMIT ?";
		
		Object[] values = {year, limit};
		
		RowMapper<TopSongResponse> rowMapper = (rs, rowNum) -> {
			TopSongResponse tsp = new TopSongResponse();
			tsp.setTitle(rs.getString("title"));
			tsp.setArtist(rs.getString("artist"));
			tsp.setTotalPlayCount(rs.getInt("total_play_count"));
			return tsp;
		};
		
		return jdbcTemplate.query(sql, rowMapper, values);
	}
	
	public List<TopSongResponse> findAllTimeTopSongs(int limit) {
		String sql =
			"SELECT title, artist, SUM(play_count) AS total_play_count " +
			"FROM songs " +
			"GROUP BY title, artist " +
			"ORDER BY total_play_count DESC " +
			"LIMIT ?";
		
		RowMapper<TopSongResponse> rowMapper = (rs, rowNum) -> {
			TopSongResponse tsp = new TopSongResponse();
			tsp.setTitle(rs.getString("title"));
			tsp.setArtist(rs.getString("artist"));
			tsp.setTotalPlayCount(rs.getInt("total_play_count"));
			return tsp;
		};
		
		return jdbcTemplate.query(sql, rowMapper, limit);
	}
	
	public List<SongLookupResponse> findAllForLookup() {
		String sql =
			"SELECT DISTINCT title, artist " +
			"FROM songs ";
		
		RowMapper<SongLookupResponse> rowMapper = (rs, rowNum) -> {
			SongLookupResponse slr = new SongLookupResponse();
			slr.setTitle(rs.getString("title"));
			slr.setArtist(rs.getString("artist"));
			return slr;
		};
		
		return jdbcTemplate.query(sql, rowMapper);
	}
	
}
