using Microsoft.AspNetCore.Mvc;
using PharmaPulse.Application.Dtos.Medicines;
using PharmaPulse.Application.Interfaces;

namespace PharmaPulse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
    private readonly IMedicineService _medicineService;

    public MedicinesController(IMedicineService medicineService)
    {
        _medicineService = medicineService;
    }

    [HttpGet]
    public async Task<ActionResult<MedicineResponseDto>> GetAll([FromQuery] string? search, CancellationToken ct)
    {
        var medicines = await _medicineService.GetAllMedicinesAsync(search,ct);
        return Ok(medicines);
    }

    [HttpPost]
    public async Task<ActionResult<MedicineResponseDto>> Create([FromBody] CreateMedicineDto dto, CancellationToken ct)
    {
        var response = await _medicineService.AddMedicineAsync(dto, ct);
        return StatusCode(StatusCodes.Status201Created, response);
    }
}