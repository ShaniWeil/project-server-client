using Microsoft.EntityFrameworkCore.Migrations;

namespace Project.Data.Migrations
{
    public partial class product : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "products",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_products_OrderId",
                table: "products",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_products_orders_OrderId",
                table: "products",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_products_orders_OrderId",
                table: "products");

            migrationBuilder.DropIndex(
                name: "IX_products_OrderId",
                table: "products");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "products");
        }
    }
}
