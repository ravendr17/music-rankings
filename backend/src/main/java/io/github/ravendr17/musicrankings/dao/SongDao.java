package io.github.ravendr17.musicrankings.dao;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

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
	
	public List<Song> findByReportId(long reportId) {
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
	
}
