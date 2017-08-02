using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class EmployeeProject :BaseEntity
    {
        [Required]
        public DateTime SinceWhen { get; set; }
        [Required]
        public DateTime UntilWhen { get; set; }
        public int ProjectId { get; set; }
        public int EmployeeId { get; set; }

        public virtual Project Project { get; set; }
        public virtual Employee Employee { get; set; }
    }
}
