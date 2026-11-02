package io.github.ravendr17.musicrankings.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.ravendr17.musicrankings.dao.ReportDao;
import io.github.ravendr17.musicrankings.dao.SongDao;
import io.github.ravendr17.musicrankings.dto.CreateReportRequestDto;
import io.github.ravendr17.musicrankings.dto.CreateSongRequestDto;
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
}
