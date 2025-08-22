using System.Collections.Generic;

namespace TaskManagerApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Role { get; set; }
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}