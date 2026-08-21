using PharmaPulse.Domain.Entities;
using PharmaPulse.Domain.Interfaces;

namespace PharmaPulse.Infrastructure.Repositories;

public class JsonMedicineRepository : IMedicineRepository
{
    private readonly JsonFileStore<Medicine> _fileStore;
    public JsonMedicineRepository(string filePath)
    {
        _fileStore = new JsonFileStore<Medicine>(filePath);
    }
    public async Task<Medicine> AddAsync(Medicine medicine, CancellationToken cancellationToken = default)
    {
        var  medicines  =  await _fileStore.ReadAsync(cancellationToken);
        medicines.Add(medicine);
        await _fileStore.WriteAsync(medicines, cancellationToken);
        
        return medicine;
    }

    public async Task<List<Medicine>> GetAllAsync(string? searchTerm = null, CancellationToken cancellationToken = default)
    {
        var medicines = await _fileStore.ReadAsync(cancellationToken);
        if(string.IsNullOrEmpty(searchTerm))
        {
            return medicines;
        }

        return medicines
            .Where(m => m.FullName.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
            .ToList();
    }
}