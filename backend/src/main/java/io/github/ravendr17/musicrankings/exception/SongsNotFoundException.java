package io.github.ravendr17.musicrankings.exception;

public class SongsNotFoundException extends RuntimeException {
	public SongsNotFoundException(int year) {
		super("No songs found on year: " + year);
	}
	
	public SongsNotFoundException() {
		super("No songs found all-time.");
	}
}
