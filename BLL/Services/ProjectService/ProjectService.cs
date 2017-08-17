using AutoMapper;
using BLL.Services.EmployeeProjectService;
using Core.DTO.Project;
using DAL.Models;
using DAL.Repositories;

namespace BLL.Services.ProjectService
{
    public class ProjectService : ServiceBase<ProjectDTO, Project>, IProjectService
    {
        private readonly IEmployeeProjectService _employeeProjectService;
        public ProjectService(IRepository<Project> repository, IEmployeeProjectService employeeProjectService, IMapper mapper) : base(repository, mapper)
        {
            _employeeProjectService = employeeProjectService;
        }

        public override void Delete(ProjectDTO entityDto)
        {
            var employeeProject = _employeeProjectService.FindBy(w => w.ProjectId == entityDto.Id);
            foreach (var item in employeeProject)
            {
                _employeeProjectService.Delete(item);
            }
            base.Delete(entityDto);
        }
    }
}
