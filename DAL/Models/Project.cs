using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Project : BaseEntity
    {
        public string Name { get; set; }        
        public string Comment { get; set; }
        public decimal EmployeeFTE { get; set; }
        //public DateTime StartProjecTime { get; set; }
        //public DateTime DeadLineTime { get; set; }


        public virtual List<EmployeeProject> EmployeeProject { get; set; }
    }
}
