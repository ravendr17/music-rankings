package io.github.ravendr17.musicrankings.dto;

import java.util.List;

public class MonthlyReportResponse {
	private long id;
	private int year;
	private int month;
	private int totalHours;
	private String createdAt;
	private List<SongResponse> songs;
	
	public long getId() {
		return this.id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public int getYear() {
		return this.year;
	}
	
	public void setYear(int year) {
		this.year = year;
	}
	
	public int getMonth() {
		return this.month;
	}
	
	public void setMonth(int month) {
		this.month = month;
	}
	
	public int getTotalHours() {
		return this.totalHours;
	}
	
	public void setTotalHours(int totalHours) {
		this.totalHours = totalHours;
	}
	
	public String getCreatedAt() {
		return this.createdAt;
	}
	
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	
	public List<SongResponse> getSongs() {
		return this.songs;
	}
	
	public void setSongs(List<SongResponse> songs) {
		this.songs = songs;
	}
}
