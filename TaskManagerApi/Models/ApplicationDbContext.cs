using Microsoft.EntityFrameworkCore;

namespace TaskManagerApi.Models
{
    // ApplicationDbContext is the main class that manages the database connection and sets up the DbSet properties for the entities.
    // It inherits from DbContext, which is part of Entity Framework Core
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
}
}