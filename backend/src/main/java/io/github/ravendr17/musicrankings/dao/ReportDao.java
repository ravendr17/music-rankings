package io.github.ravendr17.musicrankings.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import io.github.ravendr17.musicrankings.model.Report;

@Repository
public class ReportDao {
	private final JdbcTemplate jdbcTemplate;
	
	public ReportDao(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public Report save(Report report) {
		String sql = 
			"INSERT INTO reports " +
			"(year, month, total_hours) " +
			"VALUES (?, ?, ?) " + 
			"RETURNING *";
		
		Object[] values = {
			report.getYear(),
			report.getMonth(),
			report.getTotalHours()
		};
		
		RowMapper<Report> rowMapper = (rs, rowNum) -> {
			Report r = new Report();
			r.setId(rs.getLong("id"));
			r.setYear(rs.getInt("year"));
			r.setMonth(rs.getInt("month"));
			r.setTotalHours(rs.getInt("total_hours"));
			r.setCreatedAt(rs.getString("created_at"));
			return r;
		};
		
		return jdbcTemplate.queryForObject(sql, rowMapper, values);
	}

}
