using PharmaPulse.Domain.Entities;

namespace PharmaPulse.Core.Interfaces;

public interface ISaleRepository
{
    Task<IReadOnlyList<SaleRecord>> GetAllAsync(CancellationToken cancellationToken = default);
}