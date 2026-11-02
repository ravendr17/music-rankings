package io.github.ravendr17.musicrankings.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import io.github.ravendr17.musicrankings.model.Report;

@Repository
public class ReportDao {
	private final JdbcTemplate jdbcTemplate;
	
	public ReportDao(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	public void save(Report report) {
		String sql = 
			"INSERT INTO reports " +
			"(year, month, total_hours) " +
			"VALUES (?, ?, ?)";
		
		Object[] values = {
			report.getYear(),
			report.getMonth(),
			report.getTotalHours()
		};
		
		jdbcTemplate.update(sql, values);
	}
	
	public long findByYearAndMonth(int year, int month) {
		String sql =
			"SELECT id FROM reports " +
			"WHERE year = ? AND month = ?";
		
		Object[] values = {
			year,
			month
		};
		
		return jdbcTemplate.queryForObject(sql, Long.class, values);
	}
}
