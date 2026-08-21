using System.Text.Json;

namespace PharmaPulse.Infrastructure.Repositories;

public class  JsonFileStore<T>
{
    private readonly string _filePath;
    private readonly SemaphoreSlim _semaphore = new (1,1);
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        WriteIndented = true,
        PropertyNameCaseInsensitive = true,
    };

    public JsonFileStore(string filePath)
    {
        _filePath = filePath;
        EnsureFileExists();
    }

    private void EnsureFileExists()
    {
        var directory = Path.GetDirectoryName(_filePath);
        if(!string.IsNullOrEmpty(directory) && !Directory.Exists(directory))
        {
            Directory.CreateDirectory(directory);
        }

        if(!File.Exists(_filePath))
        {
            File.WriteAllText(_filePath, "[]");
        }
    }

    public async Task<List<T>> ReadAsync(CancellationToken cancellationToken = default)
    {
        await _semaphore.WaitAsync(cancellationToken);
        try
        {
            using var stream = File.OpenRead(_filePath);
            var result = await JsonSerializer.DeserializeAsync<List<T>>(stream, _jsonOptions, cancellationToken);

            return result ?? new List<T>();
        } 
        finally
        {
            _semaphore.Release();   
        }        
    }

    public async Task  WriteAsync(List<T> data, CancellationToken cancellationToken = default)
    {
        await _semaphore.WaitAsync(cancellationToken);
        try
        {
            using var stream  = File.Create(_filePath);
            await JsonSerializer.SerializeAsync(stream, data, _jsonOptions,cancellationToken);
        }
        finally
        {
            _semaphore.Release();
        }

    }
}