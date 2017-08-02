using Core.DTO.EmployeeProject;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Core.DTO.Employee
{
    public class EmployeeDTO:EntityDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public string Platform { get; set; }
        public string Position { get; set; }
        public decimal FTE { get; set; }

        public virtual List<EmployeeProjectDTO> EmployeeProject { get; set; }
    }
}
