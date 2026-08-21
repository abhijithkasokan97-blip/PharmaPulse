using PharmaPulse.Core.Entities;

namespace PharmaPulse.Core.Interfaces;

public interface IMedicineRepository
{
    Task<Medicine> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Medicine> AddAsync(Medicine medicine, CancellationToken cancellationToken = default);
}