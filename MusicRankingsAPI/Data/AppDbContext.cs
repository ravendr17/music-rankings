using Microsoft.EntityFrameworkCore;
using MusicRankingsAPI.Entities;

namespace MusicRankingsAPI.Data;
    
public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    
    public DbSet<Song> Songs { get; set; }
    public DbSet<MonthlyReport> MonthlyReports { get; set; }
    public DbSet<MonthlyReportSong> MonthlyReportSongs { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<MonthlyReportSong>()
            .HasOne(mrs => mrs.MonthlyReport)          
            .WithMany(mr => mr.MonthlyReportSongs)     
            .HasForeignKey(mrs => mrs.MonthlyReportId) 
            .HasConstraintName("fk_monthly_reports");  
        
        modelBuilder.Entity<MonthlyReportSong>()
            .HasOne(mrs => mrs.Song)                   
            .WithMany(s => s.MonthlyReportSongs)       
            .HasForeignKey(mrs => mrs.SongId)          
            .HasConstraintName("fk_songs");           
    }
}