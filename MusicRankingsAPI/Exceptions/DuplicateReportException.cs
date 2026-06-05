namespace MusicRankingsAPI.Exceptions;

public class DuplicateReportException: Exception
{
    public DuplicateReportException(string message) : base(message)
    {
        
    }
}