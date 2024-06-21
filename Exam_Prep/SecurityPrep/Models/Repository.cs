using Microsoft.EntityFrameworkCore;

namespace ApplicationSecurity.Models
{
    public class Repository:IRepository
    {
        private readonly AppDbContext _appDbContext;


        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
    }
}
