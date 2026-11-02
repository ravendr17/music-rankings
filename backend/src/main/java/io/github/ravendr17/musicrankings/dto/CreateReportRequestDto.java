package io.github.ravendr17.musicrankings.dto;

import java.util.List;

public class CreateReportRequestDto {
	private int year;
	private int month;
	private int totalHours;
	private List<CreateSongRequestDto> songs;
	
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
	
	public List<CreateSongRequestDto> getSongs() {
		return this.songs;
	}
	
	public void setSongs(List<CreateSongRequestDto> songs) {
		this.songs = songs;
	}
}
