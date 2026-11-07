package io.github.ravendr17.musicrankings.dao;

import java.util.Optional;

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
	
	private final RowMapper<Report> reportMapper = (rs, rowNum) -> {
		Report report = new Report();
		report.setId(rs.getLong("id"));
		report.setCreatedAt(rs.getString("created_at"));
		report.setYear(rs.getInt("year"));
		report.setMonth(rs.getInt("month"));
		report.setTotalHours(rs.getInt("total_hours"));
		return report;
	};
	
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
		
		return jdbcTemplate.queryForObject(sql, reportMapper, values);
	}
	
	public Optional<Report> findById(long reportId) {
		String sql = 
			"SELECT * FROM reports " +
			"WHERE id = ?";
		
		return jdbcTemplate.query(sql, reportMapper, reportId)
				.stream()
				.findFirst();
	}
	
	public Optional<Report> findByYearAndMonth(
			int year,
			int month
	) {
		String sql = 
			"SELECT * FROM reports " +
			"WHERE reports.year = ? AND reports.month = ?";
		
		Object[] values = {year, month};
		
		return jdbcTemplate.query(sql, reportMapper, values)
				.stream()
				.findFirst();
	}

}
