using AutoMapper;
using Core.DTO.Employee;
using Core.DTO.EmployeeProject;
using Core.DTO.Project;
using DAL.Models;

namespace WebApi.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {
        // install AutoMapper 4.2.1
        protected override void Configure()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeProject, EmployeeProjectDTO>().ReverseMap();
            CreateMap<Project, ProjectDTO>().ReverseMap();            
        }
    }
}