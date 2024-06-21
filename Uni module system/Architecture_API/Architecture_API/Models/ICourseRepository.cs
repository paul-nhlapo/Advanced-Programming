using Architecture_API.ViewModel;

namespace Architecture_API.Models
{
    public interface ICourseRepository
    {
        // Course
        Task<Course[]> GetAllCourseAsync();
        
        Task<Course> GetCourseByIdAsync(int courseId);

        Task<int> AddCourseAsync (CourseViewModel course);

        Task<int> UpdateCourseAsync(int courseId, CourseViewModel course);

        Task<int> DeleteCourseAsync(int courseId);
    }
}
