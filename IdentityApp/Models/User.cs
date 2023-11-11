using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Webshop.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;

    }
}
