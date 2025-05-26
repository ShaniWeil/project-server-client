// "בסיעתא דשמיא" //

using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Project.API.Controllers;
using Project.Core;
using Project.Core.Entities;
using Project.Data.Data;

namespace UnitTest
{
    public class UnitTest
    {

        // Checking if a category does not exist
        [Fact]
        public void GetCategoryByID_OK()
        {
            // Arrange
            int id = 111;

            // Act
            var categoeryCotroller = new CategoryController(null, null);
            var result = categoeryCotroller.GetById(id);

            // Assert
            Assert.IsType<NotFound>(result);
        }

        // Checking whether a user exists (by id)
        [Fact]
        public void GetUserById_OK()
        {
            // Arrange
            string id = "019019019";

            // Act
            var userCotroller = new UserController(null, null);
            var result = userCotroller.GetById(id);

            // Assert
            Assert.IsType<User>(result);
        }

        // Checking whether an empty array is returned from the function that returns the products whose quantity = 0
        [Fact]
        public void GetZeroStockQuantity_OK()
        {
            // Arrange

            // Act
            var productCotroller = new ProductCotroller(null, null);
            var result = productCotroller.GetZeroStockQuantity();

            // Assert
            Assert.Empty(result);
        }

        // Checking whether all orders were placed in a specific year
        [Fact]
        public void GetByDate_OK()
        {
            // Arrange
            int year = 2024;

            // Act
            var orderController = new OrderController(null, null);
            var result = orderController.GetAll();

            // Assert
            Assert.All((IEnumerable<Order>)result, x => Assert.Equal(year, x.Date.Year));
        }

    }
}