using AutoMapper;
using Core.DTO.EmployeeProject;
using DAL.Models;
using DAL.Repositories;

namespace BLL.Services.EmployeeProjectService
{
    public class EmployeeProjectService : ServiceBase<EmployeeProjectDTO, EmployeeProject>, IEmployeeProjectService
    {
        public EmployeeProjectService(IRepository<EmployeeProject> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
