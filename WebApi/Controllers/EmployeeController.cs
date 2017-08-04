using BLL.Services.EmployeeService;
using Core.DTO.Employee;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebApi.Controllers
{
    [RoutePrefix("Employee")]
    public class EmployeeController : ApiController
    {
        private IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // ------------------------- CREATE -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(EmployeeDTO))]
        public bool Create([FromBody]EmployeeDTO employeeDTO)
        {
            if (employeeDTO == null) return false;

            _employeeService.Add(employeeDTO);
            return true;
        }

        // ------------------------- READ -------------------------
//        [Authorize(Roles = "Admin")]
        [Route("all")]
        public IHttpActionResult Get()
        {
            return Ok(_employeeService.GetAll());
        }

//        [Authorize(Roles = "Admin")]
        [Route("find/{id}")]
        public IHttpActionResult Get(int id)
        {
            return Ok(_employeeService.FindBy(e => e.Id == id));
        }

        // ------------------------- UPDATE -------------------------
        // zaktualizowanie istniejącego rekordu
//        [Authorize(Roles = "Admin")]
        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(EmployeeDTO))]
        public bool Put([FromBody]EmployeeDTO employeeDTO)
        {
            if (employeeDTO == null) return false;

            _employeeService.Update(employeeDTO);
            return true;
        }

        // ------------------------- DELETE -------------------------
        //        [Authorize(Roles = "Admin")]
        [Route("delete/{id}")]
        [AcceptVerbs("DELETE","GET")]
        public void Delete([FromUri]int id)
        {
            EmployeeDTO employeeDTO = new EmployeeDTO
            {
                Id = id
            };
            _employeeService.Delete(employeeDTO);
        }
    }
}
