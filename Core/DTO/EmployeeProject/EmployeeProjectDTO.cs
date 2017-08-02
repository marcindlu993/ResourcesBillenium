using Core.DTO.Employee;
using Core.DTO.Project;
using System;
using System.ComponentModel.DataAnnotations;

namespace Core.DTO.EmployeeProject
{
    public class EmployeeProjectDTO : EntityDTO
    {
        [Required]
        public DateTime SinceWhen { get; set; }
        [Required]
        public DateTime UntilWhen { get; set; }
        public int ProjectId { get; set; }
        public int EmployeeId { get; set; }

        public virtual ProjectDTO Project { get; set; }
        public virtual EmployeeDTO Employee { get; set; }
    }
}
