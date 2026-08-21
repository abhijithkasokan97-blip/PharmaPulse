using PharmaPulse.Application.Dtos.Medicines;
using PharmaPulse.Application.Interfaces;
using PharmaPulse.Domain.Entities;
using PharmaPulse.Domain.Interfaces;

namespace PharmaPulse.Application.Services;

public class MedicineService : IMedicineService
{
    private readonly IMedicineRepository _medicineRepository;
    public MedicineService(
        IMedicineRepository medicineRepository
    ){
        _medicineRepository = medicineRepository;
    }

    public async Task<List<MedicineResponseDto>> GetAllMedicinesAsync(string? searchTerm = null, CancellationToken ct = default)
    {
       var medicines =  await _medicineRepository.GetAllAsync(searchTerm, ct);

        return medicines.Select(m => new MedicineResponseDto(
            m.Id,
            m.FullName,
            m.Notes,
            m.ExpiryDate,
            m.Quantity,
            m.Price,
            m.Brand
        )).ToList();
    }

    public async Task<MedicineResponseDto> AddMedicineAsync(CreateMedicineDto dto, CancellationToken ct = default)
    {
        var medicine = new Medicine
        {
            FullName  = dto.FullName,
            Notes = dto.Notes,
            ExpiryDate = dto.ExpiryDate,
            Quantity = dto.Quantity,
            Price = dto.Price,
            Brand = dto.Brand
        };

        var created = await _medicineRepository.AddAsync(medicine, ct);
        
        return new MedicineResponseDto(
            created.Id,
            created.FullName,
            created.Notes,
            created.ExpiryDate,
            created.Quantity,
            created.Price,
            created.Brand
        );
    }
}