using PharmaPulse.Application.Dtos.Sales;
using PharmaPulse.Application.Interfaces;
using PharmaPulse.Core.Interfaces;

namespace PharmaPulse.Application.Services;

public class SaleService : ISalesService
{
    private readonly ISaleRepository _saleRepository;
    public SaleService( ISaleRepository saleRepository ){
        _saleRepository = saleRepository;
    }
    public async Task<List<SaleRecordDto>> GetAllSalesAsync(CancellationToken ct = default)
    {
         var sales =  await _saleRepository.GetAllAsync(ct);

        return sales.Select(sale => new SaleRecordDto(
            sale.Id,
            sale.MedicineId,
            sale.QuantitySold,
            sale.UnitPrice,
            sale.TotalAmount,
            sale.SaleDate,
            sale.Timestamp
        )).ToList();
    }
}