using PharmaPulse.Api.Middleware;
using PharmaPulse.Application.Interfaces;
using PharmaPulse.Application.Services;
using PharmaPulse.Domain.Interfaces;
using PharmaPulse.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string dataDirectory = Path.Combine(builder.Environment.ContentRootPath, "Data");
string medicinesPath = Path.Combine(dataDirectory, "medicines.json");
string salesPath = Path.Combine(dataDirectory, "sales.json");

builder.Services.AddSingleton<IMedicineRepository>(_ => new JsonMedicineRepository(medicinesPath));

builder.Services.AddScoped<IMedicineService, MedicineService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();


app.Run();
