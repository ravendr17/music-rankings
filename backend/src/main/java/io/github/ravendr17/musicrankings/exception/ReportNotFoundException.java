package io.github.ravendr17.musicrankings.exception;

public class ReportNotFoundException extends RuntimeException {
	public ReportNotFoundException(long reportId) {
		super("Report not found: " + reportId);
	}
}
