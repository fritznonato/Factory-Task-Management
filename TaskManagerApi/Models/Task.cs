using System.Text.Json.Serialization;

namespace TaskManagerApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        [JsonPropertyName("title")]
        public required string Title { get; set; }
        [JsonPropertyName("description")]
        public required string Description { get; set; }
        [JsonPropertyName("status")]
        public required string Status { get; set; }
        [JsonPropertyName("assignedUserId")]
        public int AssignedUserId { get; set; }

        // This is needed for the database relationship
        public User? AssignedUser { get; set; } 
    }
}