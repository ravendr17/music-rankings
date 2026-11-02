package io.github.ravendr17.musicrankings.dto;

public class SongLookupResponse {
	private String title;
	private String artist;
	
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
}
