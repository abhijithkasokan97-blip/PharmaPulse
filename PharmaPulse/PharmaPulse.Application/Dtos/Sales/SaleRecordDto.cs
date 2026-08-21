namespace PharmaPulse.Application.Dtos.Sales;

public record SaleRecordDto(
    Guid Id,
    Guid MedicineId,
    string MedicineName,
    int QuantitySold,
    decimal UnitPrice,
    decimal TotalAmount,
    DateTime Timestamp
);