using PharmaPulse.Core.Interfaces;
using PharmaPulse.Domain.Entities;

namespace PharmaPulse.Infrastructure.Repositories;

public class JsonSalesRepository : ISaleRepository
{
    private readonly JsonFileStore<SaleRecord> _fileStore;
    public JsonSalesRepository(string filePath)
    {
        _fileStore = new JsonFileStore<SaleRecord>(filePath);
    }


    public async Task<IReadOnlyList<SaleRecord>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _fileStore.ReadAsync(cancellationToken);
    }
}