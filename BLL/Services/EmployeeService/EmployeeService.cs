using AutoMapper;
using BLL.Services.EmployeeProjectService;
using Core.DTO.Employee;
using DAL.Models;
using DAL.Repositories;

namespace BLL.Services.EmployeeService
{
    public class EmployeeService : ServiceBase<EmployeeDTO, Employee>, IEmployeeService
    {
        private readonly IEmployeeProjectService _employeeProjectService;
        public EmployeeService(IRepository<Employee> repository, IEmployeeProjectService employeeProjectService , IMapper mapper) : base(repository, mapper)
        {
            _employeeProjectService = employeeProjectService;
        }
        public override void Delete(EmployeeDTO entityDto)
        {
            var employeeProject = _employeeProjectService.FindBy(w => w.EmployeeId == entityDto.Id);
            foreach (var item in employeeProject)
            {
                _employeeProjectService.Delete(item);
            }
            base.Delete(entityDto);
        }
    }
}
