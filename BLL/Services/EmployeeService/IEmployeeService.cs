using Core.DTO.Employee;
using DAL.Models;

namespace BLL.Services.EmployeeService
{
    public interface IEmployeeService : IServiceBase<EmployeeDTO, Employee>
    {
    }
}
