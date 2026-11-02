package io.github.ravendr17.musicrankings.exception;

public class ReportNotFoundException extends RuntimeException {
	public ReportNotFoundException(long reportId) {
		super("Report not found: Id " + reportId);
	}
	
	public ReportNotFoundException(int year, int month) {
		super("Report not found: Year " + year + " and Month " + month);
	}
}
