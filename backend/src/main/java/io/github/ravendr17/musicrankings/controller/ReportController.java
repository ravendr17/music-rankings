package io.github.ravendr17.musicrankings.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.github.ravendr17.musicrankings.dto.CreateReportRequestDto;
import io.github.ravendr17.musicrankings.model.Report;
import io.github.ravendr17.musicrankings.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {
	private final ReportService reportService;
	
	public ReportController(ReportService reportService) {
		this.reportService = reportService;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Report create(@RequestBody CreateReportRequestDto request) {
		return reportService.create(request);
	}
	
	@GetMapping("/{reportId}")
	public Report findById(@PathVariable long reportId) {
		return reportService.findById(reportId);
	}
}
