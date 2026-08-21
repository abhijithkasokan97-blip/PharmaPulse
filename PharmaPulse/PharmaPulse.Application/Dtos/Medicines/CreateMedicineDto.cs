namespace PharmaPulse.Application.Dtos.Medicines;
public record CreateMedicineDto(
    string FullName,
    string Notes,
    DateTime ExpiryDate,
    int Quantity,
    decimal Price,
    string Brand
);