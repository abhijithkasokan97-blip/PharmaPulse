using PharmaPulse.Application.Dtos.Sales;

namespace PharmaPulse.Application.Interfaces;

public interface ISalesService
{
    Task<List<SaleRecordDto>> GetAllSalesAsync(CancellationToken ct = default);
}