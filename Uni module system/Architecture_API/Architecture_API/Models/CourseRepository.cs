using Architecture_API.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;

namespace Architecture_API.Models
{
    public class CourseRepository : ICourseRepository
    {
        private readonly AppDbContext _appDbContext;

        public CourseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Course[]> GetAllCourseAsync()
        {
            IQueryable<Course> query = _appDbContext.Courses;
            return await query.ToArrayAsync();
        }

        public async Task<Course> GetCourseByIdAsync(int courseId)
        {
            IQueryable<Course> query = _appDbContext.Courses.Where(c => c.CourseId == courseId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<int> AddCourseAsync(CourseViewModel course)
        {
            Course newCourse = new Course
            {
                Name = course.Name,
                Description = course.Description,
                Duration = course.Duration
            };

            _appDbContext.Courses.Add(newCourse);
            return await _appDbContext.SaveChangesAsync();
        }

        public async Task<int> UpdateCourseAsync(int courseId, CourseViewModel course)
        {
            Course updateCourse = await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
            if (updateCourse != null)
            {
                updateCourse.Name = course.Name;
                updateCourse.Description = course.Description;
                updateCourse.Duration = course.Duration;
                await _appDbContext.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> DeleteCourseAsync(int courseId)
        {
            Course deleteCourse = await _appDbContext.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
            if (deleteCourse != null)
            {
                _appDbContext.Courses.Remove(deleteCourse);
                return await _appDbContext.SaveChangesAsync();
            }
            return 0;
        }
    }
}
