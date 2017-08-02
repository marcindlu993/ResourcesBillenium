using AutoMapper;
using Core.DTO;
using DAL.Models;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public abstract class ServiceBase<M, T> : IServiceBase<M, T>
        where M : EntityDTO
        where T : BaseEntity
    {
        private readonly IRepository<T> _repository;
        private IMapper _mapper;
        // private IRepository<ActionFolders> repository;

        public ServiceBase(IRepository<T> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public M GetSingle(Expression<Func<T, bool>> whereCondition)
        {
            var model = _repository.FindBy(whereCondition).FirstOrDefault();
            //Mapper.Map<T, M>(model);  //wywołanie tylko w jednym miejscu, w global.asax i tu korzystamy
            return Mapper.Map<T, M>(model);
        }

        public void Add(M entityDto)
        {
            var model = _mapper.Map<M, T>(entityDto);
            _repository.Insert(model);
            _repository.Save();
        }

        public void Delete(M entityDto)
        {
            T model = _mapper.Map<M, T>(entityDto);
            _repository.Delete(model.Id);
            _repository.Save();
        }

        public void Update(M entityDto)
        {
            try
            {
                T model = _mapper.Map<M, T>(entityDto);
                _repository.Update(model);
            }
            catch (Exception)
            {

                throw;
            }
            _repository.Save();
        }

        public List<M> GetAll()
        {
            return _repository.GetAll().Select(_mapper.Map<T, M>).ToList();
        }

        public List<M> FindBy(Expression<Func<T, bool>> whereCondition)
        {
            return _repository.FindBy(whereCondition).Select(_mapper.Map<T, M>).ToList();
        }

        public long Count(Expression<Func<T, bool>> whereCondition)
        {
            return _repository.FindBy(whereCondition).Count();
        }
    }
}
