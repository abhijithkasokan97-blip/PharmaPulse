using PharmaPulse.Domain.Entities;

namespace PharmaPulse.Domain.Interfaces;

public interface IMedicineRepository
{
    Task<List<Medicine>> GetAllAsync(string? searchTerm = null, CancellationToken cancellationToken = default);
    Task<Medicine> AddAsync(Medicine medicine, CancellationToken cancellationToken = default);
}