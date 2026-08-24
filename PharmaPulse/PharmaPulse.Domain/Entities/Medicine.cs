using PharmaPulse.Domain.Common;

namespace PharmaPulse.Domain.Entities;

public class Medicine : AuditEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FullName { get; set; } = string.Empty;  
    public string Notes { get; set; } = string.Empty;
    public DateTime ExpiryDate { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string Brand { get; set; } = string.Empty;
}
