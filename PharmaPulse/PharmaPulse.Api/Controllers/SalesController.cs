using Microsoft.AspNetCore.Mvc;
using PharmaPulse.Application.Dtos.Sales;
using PharmaPulse.Application.Interfaces;

namespace PharmaPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalesController : ControllerBase
{
    private readonly ISalesService _saleService;

    public SalesController(ISalesService saleService)
    {
        _saleService = saleService;
    }

    [HttpGet]
    public async Task<ActionResult<SaleRecordDto>> GetAll([FromQuery] string? search, CancellationToken ct)
    {
        var sales = await _saleService.GetAllSalesAsync(ct);
        return Ok(sales);
    }
}