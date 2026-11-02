package io.github.ravendr17.musicrankings.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.ravendr17.musicrankings.dao.ReportDao;
import io.github.ravendr17.musicrankings.dao.SongDao;
import io.github.ravendr17.musicrankings.dto.CreateReportRequestDto;
import io.github.ravendr17.musicrankings.dto.CreateSongRequestDto;
import io.github.ravendr17.musicrankings.dto.MonthlyReportResponse;
import io.github.ravendr17.musicrankings.dto.SongResponse;
import io.github.ravendr17.musicrankings.exception.ReportNotFoundException;
import io.github.ravendr17.musicrankings.model.Report;
import io.github.ravendr17.musicrankings.model.Song;

@Service
public class ReportService {
	private final ReportDao reportDao;
	private final SongDao songDao;
	
	public ReportService(ReportDao reportDao, SongDao songDao) {
		this.reportDao = reportDao;
		this.songDao = songDao;
	}
	
	@Transactional
	public Report create(CreateReportRequestDto req) {
		Report report = new Report();
		report.setYear(req.getYear());
		report.setMonth(req.getMonth());
		report.setTotalHours(req.getTotalHours());
		
		Report createdReport = reportDao.save(report);
		
		for (CreateSongRequestDto songReq: req.getSongs()) {
			Song song = new Song();
			song.setReportId(createdReport.getId());
			song.setTitle(songReq.getTitle());
			song.setArtist(songReq.getArtist());
			song.setPlayCount(songReq.getPlayCount());
			
			songDao.save(song);
		}
		
		return createdReport;
	}
	
	public Report findById(long reportId) {
		Optional<Report> report = reportDao.findById(reportId);
		
		if (report.isEmpty()) {
			throw new ReportNotFoundException(reportId);
		}
		
		return report.get();
	}
	
	@Transactional(readOnly = true)
	public MonthlyReportResponse findByYearAndMonth(
			int year, 
			int month
	) {
		Optional<Report> optionalReport = 
				reportDao.findByYearAndMonth(year, month);
		
		if (optionalReport.isEmpty()) {
			throw new ReportNotFoundException(year, month);
		}
		
		Report report = optionalReport.get();
		
		MonthlyReportResponse mrr = new MonthlyReportResponse();
		mrr.setId(report.getId());
		mrr.setYear(report.getYear());
		mrr.setMonth(report.getMonth());
		mrr.setTotalHours(report.getTotalHours());
		mrr.setCreatedAt(report.getCreatedAt());
		
		// retrieve all the songs of the report
		List<Song> songs = songDao.findByReportId(report.getId());
		
		List<SongResponse> songResponses = new ArrayList<SongResponse>();
		
		for (Song song: songs) {
			SongResponse sr = new SongResponse();
			sr.setId(song.getId());
			sr.setTitle(song.getTitle());
			sr.setArtist(song.getArtist());
			sr.setPlayCount(song.getPlayCount());
			songResponses.add(sr);
		}
		mrr.setSongs(songResponses);
		
		return mrr;
	}
}
