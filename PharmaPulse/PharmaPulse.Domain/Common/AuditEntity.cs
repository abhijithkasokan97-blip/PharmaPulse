namespace PharmaPulse.Domain.Common;

public abstract class AuditEntity
{
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? LastUpdatedOn { get; set; }
    public string? LastUpdatedBy { get; set; }
}