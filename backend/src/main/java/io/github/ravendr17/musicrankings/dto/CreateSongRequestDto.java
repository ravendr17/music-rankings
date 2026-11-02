package io.github.ravendr17.musicrankings.dto;

public class CreateSongRequestDto {
	private String title;
	private String artist;
	private int playCount;
	
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
	
	public int getPlayCount() {
		return this.playCount;
	}
	
	public void setPlayCount(int playCount) {
		this.playCount = playCount;
	}
}
