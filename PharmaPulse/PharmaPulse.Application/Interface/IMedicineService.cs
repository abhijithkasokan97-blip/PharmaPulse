using PharmaPulse.Application.Dtos.Medicines;

namespace PharmaPulse.Application.Interfaces;

public interface IMedicineService
{
    Task<List<MedicineResponseDto>> GetAllMedicinesAsync(string? searchTerm = null, CancellationToken ct = default);
    Task<MedicineResponseDto> AddMedicineAsync(CreateMedicineDto dto, CancellationToken ct = default);
}