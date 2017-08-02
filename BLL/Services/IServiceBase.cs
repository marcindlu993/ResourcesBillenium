using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IServiceBase<M, T>
    {
        M GetSingle(Expression<Func<T, bool>> whereCondition);

        void Add(M entityDto);

        void Delete(M entityDto);

        void Update(M entityDto);

        List<M> GetAll();

        List<M> FindBy(Expression<Func<T, bool>> whereCondition);

        long Count(Expression<Func<T, bool>> whereCondition);

    }
}
