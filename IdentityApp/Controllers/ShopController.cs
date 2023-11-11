using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {

        [HttpGet("get-products")]
        public IActionResult Products()
        {
            return Ok(new JsonResult(new { message = "Only authorized persons can see the shop products" }));
        }
    }
}
