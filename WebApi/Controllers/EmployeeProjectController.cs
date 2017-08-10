using BLL.Services.EmployeeProjectService;
using Core.DTO.EmployeeProject;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApi.Controllers
{
    [RoutePrefix("EmployeeProject")]
    public class EmployeeProjectController : ApiController
    {
        private IEmployeeProjectService _employeeProjectService;
        public EmployeeProjectController(IEmployeeProjectService employeeProjectService)
        {
            _employeeProjectService = employeeProjectService;
        }

        // ------------------------- CREATE -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(EmployeeProjectDTO))]
        public bool Create([FromBody]EmployeeProjectDTO employeeProjectDTO)
        {
            if (employeeProjectDTO == null) return false;

            _employeeProjectService.Add(employeeProjectDTO);
            return true;
        }

        // ------------------------- READ -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("all")]
        public IHttpActionResult Get()
        {
            return Ok(_employeeProjectService.GetAll());
        }

//        [Authorize(Roles = "Admin")]
        [Route("find/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(_employeeProjectService.FindBy(e => e.Id == id));
        }

        //        [Authorize(Roles = "Admin")]
        [Route("findByEmployee/{id}")] // moja funkcja
        public IHttpActionResult GetByEmployee(int id)
        {
            return Ok(_employeeProjectService.FindBy(e => e.EmployeeId == id));
        }

        [Route("findByProject/{id}")] // moja funkcja
        public IHttpActionResult GetByProject(int id)
        {
            return Ok(_employeeProjectService.FindBy(e => e.ProjectId == id));
        }
        // ------------------------- UPDATE -------------------------
        // zaktualizowanie istniejącego rekordu
        //        [Authorize(Roles = "Admin")]
        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(EmployeeProjectDTO))]
        public bool Put([FromBody]EmployeeProjectDTO employeeProjectDTO)
        {
            if (employeeProjectDTO == null) return false;

            _employeeProjectService.Update(employeeProjectDTO);
            return true;
        }

        // ------------------------- DELETE -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("delete/{id}")]
        [AcceptVerbs("DELETE")]
        public void Delete([FromUri]int id)
        {
            EmployeeProjectDTO employeeProjectDTO = new EmployeeProjectDTO
            {
                Id = id
            };
            _employeeProjectService.Delete(employeeProjectDTO);
        }
    }
}
