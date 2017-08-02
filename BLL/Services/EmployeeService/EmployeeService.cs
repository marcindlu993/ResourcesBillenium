using AutoMapper;
using Core.DTO.Employee;
using DAL.Models;
using DAL.Repositories;

namespace BLL.Services.EmployeeService
{
    public class EmployeeService : ServiceBase<EmployeeDTO, Employee>, IEmployeeService
    {
        public EmployeeService(IRepository<Employee> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
