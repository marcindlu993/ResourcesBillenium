using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Employee:BaseEntity
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }        
        public string Platform { get; set; }
        public string Position { get; set; }
        public decimal FTE { get; set; }

        public virtual List<EmployeeProject> EmployeeProject { get; set; }
    }
}
