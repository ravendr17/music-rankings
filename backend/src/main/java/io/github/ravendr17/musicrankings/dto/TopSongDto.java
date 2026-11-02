package io.github.ravendr17.musicrankings.dto;

public class TopSongDto {
	private String title;
	private String artist;
	private int totalPlayCount;
	
	public String getTitle() {
		return this.title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getArtist() {
		return this.artist;
	}
	
	public void setArtist(String artist) {
		this.artist = artist;
	}
	
	public int getTotalPlayCount() {
		return this.totalPlayCount;
	}
	
	public void setTotalPlayCount(int totalPlayCount) {
		this.totalPlayCount = totalPlayCount;
	}
}
