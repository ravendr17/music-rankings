package io.github.ravendr17.musicrankings.dto;

import java.util.List;

public class CreateReportRequest {
	private int year;
	private int month;
	private int totalHours;
	private List<CreateSongRequest> songs;
	
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
	
	public List<CreateSongRequest> getSongs() {
		return this.songs;
	}
	
	public void setSongs(List<CreateSongRequest> songs) {
		this.songs = songs;
	}
}
