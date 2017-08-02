using AutoMapper;
using Core.DTO.Project;
using DAL.Models;
using DAL.Repositories;

namespace BLL.Services.ProjectService
{
    public class ProjectService : ServiceBase<ProjectDTO, Project>, IProjectService
    {
        public ProjectService(IRepository<Project> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
