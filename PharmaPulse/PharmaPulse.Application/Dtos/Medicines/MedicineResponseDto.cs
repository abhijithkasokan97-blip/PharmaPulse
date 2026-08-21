namespace PharmaPulse.Application.Dtos.Medicines;

public record MedicineResponseDto(
    Guid Id,
    string FullName,
    string Notes,
    DateTime ExpiryDate,
    int Quantity,
    decimal Price,
    string Brand
);