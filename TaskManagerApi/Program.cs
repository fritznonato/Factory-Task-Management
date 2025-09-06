using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Models;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions 
{ 
    ContentRootPath = AppContext.BaseDirectory, 
    WebRootPath = "dist" 
});
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite("Data Source=TaskManager.db"));
builder.Services.AddControllers();

// Tell application to look for static files in the dist folder
builder.WebHost.UseWebRoot("dist");

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:5173")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod();
                      });
});

var app = builder.Build();



// Call the seeder method in your main application logic
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    DatabaseSeeder.SeedUsers(context);
}

// Configure the HTTP request pipeline.
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html"); // Serve index.html for any non-API routes
app.Run();

// Class definition for seeding the database
public static class DatabaseSeeder
{
    public static void SeedUsers(ApplicationDbContext context)
    {
        if (!context.Users.Any())
        {
            var users = new List<User>
            {
                new User { Name = "Elon Musk", Role = "CEO" },
                new User { Name = "Gary Stevenson", Role = "Factory Manager" },
                new User { Name = "Jane Doe", Role = "Production Associate" }
            };
            context.Users.AddRange(users);
            context.SaveChanges();
        }
    }
}