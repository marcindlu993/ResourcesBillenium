using Core.DTO.EmployeeProject;
using System.Collections.Generic;

namespace Core.DTO.Project
{
    public class ProjectDTO:EntityDTO
    {
        public string Name { get; set; }
        public string Comment { get; set; }
        public decimal EmployeeFTE { get; set; }

        public virtual List<EmployeeProjectDTO> EmployeeProject { get; set; }
    }
}
