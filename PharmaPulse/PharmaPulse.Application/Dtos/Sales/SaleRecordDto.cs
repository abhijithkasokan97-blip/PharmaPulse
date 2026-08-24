namespace PharmaPulse.Application.Dtos.Sales;

public record SaleRecordDto(
    Guid Id,
    Guid MedicineId,
    int QuantitySold,
    decimal UnitPrice,
    decimal TotalAmount,
    DateTime SaleDate,
    DateTime Timestamp
);