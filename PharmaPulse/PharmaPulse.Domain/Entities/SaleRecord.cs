using PharmaPulse.Domain.Common;

namespace PharmaPulse.Domain.Entities;

public class SaleRecord : AuditEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid MedicineId { get; set; }
    public int QuantitySold { get; set; }
    public decimal UnitPrice { get; set; }
    public DateTime SaleDate { get; set; }
    public decimal TotalAmount => QuantitySold * UnitPrice;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}