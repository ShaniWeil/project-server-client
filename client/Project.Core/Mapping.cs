using AutoMapper;
using Project.Core.DTO;
using Project.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Core
{
    public class Mapping: Profile
    {
        public Mapping()
        {
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<ProductDTO, Product>().ReverseMap();
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<OrderDTO, Order>().ReverseMap();
        }
    }
}
