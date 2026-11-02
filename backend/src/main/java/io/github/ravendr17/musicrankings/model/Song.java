package io.github.ravendr17.musicrankings.model;

public class Song {
	private long id;
	private long reportId;
	private String title;
	private String artist;
	private int playCount;
	private String createdAt;
	
	public long getId() {
		return this.id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public long getReportId() {
		return this.reportId;
	}
	
	public void setReportId(long reportId) {
		this.reportId = reportId;
	}
	
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
	
	public String getCreatedAt() {
		return this.createdAt;
	}
	
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
}
