using Architecture_API.Models;
using Architecture_API.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Architecture_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        [Route("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            try
            {
                var results = await _courseRepository.GetAllCourseAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetCourseById/{courseId}")]
        public async Task<IActionResult> GetCourseById(int courseId)
        {
            try
            {
                var result = await _courseRepository.GetCourseByIdAsync(courseId);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
        [Route("AddCourse")]
        //Add a course using view model
        public async Task<IActionResult> AddCourse(CourseViewModel course)
        {
           try
            {
                var result = await _courseRepository.AddCourseAsync(course);
                var res = await _courseRepository.GetCourseByIdAsync(result);
               
                
               return Ok(res);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
        //Upadate a course by id
        [Route("UpdateCourse/{courseId}")]
        public async Task<IActionResult> UpdateCourse(int courseId, CourseViewModel course)
        {
            try
            {
                var result = await _courseRepository.UpdateCourseAsync(courseId, course);
                switch (result)
                {
                    case 1:
                        return Ok("Course updated successfully");
                    case 2:
                        return BadRequest("Course not found");
                    default:
                        return BadRequest("Course not updated");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete]
        //Delete a course by id
        [Route("DeleteCourse/{courseId}")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            try
            {
                var result = await _courseRepository.DeleteCourseAsync(courseId);
                switch (result)
                {
                    case 1:
                        return Ok("Course deleted successfully");
                    case 2:
                        return BadRequest("Course not found");
                    default:
                        return BadRequest("Course not deleted");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }



    }
}
