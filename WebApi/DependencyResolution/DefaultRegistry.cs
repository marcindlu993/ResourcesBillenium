namespace WebApi.DependencyResolution
{
    using AutoMapper;
    using BLL.Services.EmployeeService;
    using BLL.Services.EmployeeProjectService;
    using BLL.Services.ProjectService;
    using DAL.Models;
    using DAL.Repositories;
    using StructureMap;
    using System;
    using System.Linq;

    public class DefaultRegistry : Registry {
        #region Constructors and Destructors
        //poczytaæ o stucture mapper, ioc, DI, automapper
        public DefaultRegistry()
        {

            var profiles = from t in typeof(DefaultRegistry).Assembly.GetTypes()
                           where typeof(Profile).IsAssignableFrom(t)
                           select (Profile)Activator.CreateInstance(t);

            var config = new MapperConfiguration(cfg =>
            {
                foreach (var profile in profiles)
                {
                    cfg.AddProfile(profile);
                }
            });

            var mapper = config.CreateMapper();

            For<IRepository<Employee>>().Use<Repository<Employee>>();
            For<IRepository<Project>>().Use<Repository<Project>>();
            For<IRepository<EmployeeProject>>().Use<Repository<EmployeeProject>>();
            

            For<IMapperConfiguration>().Use(config);
            For<IMapper>().Use(mapper);

            RegisterRepositories(mapper);
        }

        private void RegisterRepositories(IMapper mapper)
        {
            For<IEmployeeService>().Use<EmployeeService>().Ctor<IMapper>().Is(mapper);
            For<IProjectService>().Use<ProjectService>().Ctor<IMapper>().Is(mapper);
            For<IEmployeeProjectService>().Use<EmployeeProjectService>().Ctor<IMapper>().Is(mapper);
        }
        #endregion


    }
}