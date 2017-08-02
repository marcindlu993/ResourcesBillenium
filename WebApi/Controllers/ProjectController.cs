using BLL.Services.ProjectService;
using Core.DTO.Project;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApi.Controllers
{
    [RoutePrefix("Project")]
    public class ProjectController : ApiController
    {
        private IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // ------------------------- CREATE -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(ProjectDTO))]
        public bool Create([FromBody]ProjectDTO projectDTO)
        {
            if (projectDTO == null) return false;

            _projectService.Add(projectDTO);
            return true;
        }

        // ------------------------- READ -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("all")]
        public IHttpActionResult Get()
        {
            return Ok(_projectService.GetAll());
        }

//        [Authorize(Roles = "Admin")]
        [Route("find/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(_projectService.FindBy(e => e.Id == id));
        }

        // ------------------------- UPDATE -------------------------
        // zaktualizowanie istniejącego rekordu
//        [Authorize(Roles = "Admin")]
        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(ProjectDTO))]
        public bool Put([FromBody]ProjectDTO projectDTO)
        {
            if (projectDTO == null) return false;

            _projectService.Update(projectDTO);
            return true;
        }

        // ------------------------- DELETE -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("delete/{id}")]
        [AcceptVerbs("DELETE")]
        public void Delete([FromUri]int id)
        {
            ProjectDTO projectDTO = new ProjectDTO
            {
                Id = id
            };
            _projectService.Delete(projectDTO);
        }
    }
}
