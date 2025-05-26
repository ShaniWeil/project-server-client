// "בסיעתא דשמיא" //

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Project.API;
using Project.API.Middlewares;
using Project.Core;
using Project.Core.Data;
using Project.Core.Service;
using Project.Data;
using Project.Data.Data;
using Project.Service;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Expanding the use of swagger
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy",
                  builder => builder.WithOrigins("http://localhost:4200", "development web site")
                             .AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.AddAutoMapper(typeof(Mapping));


builder.Services.AddScoped<ICategoryData, CategoryData>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddScoped<IProductData, ProductData>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IUserData, UserData>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IOrderData, OrderData>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddAutoMapper(typeof(Mapping));

builder.Services.AddDbContext<DataContext>();

builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    option.JsonSerializerOptions.WriteIndented = true;
});

// Injection in program
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "http://localhost:7141",
        ValidAudience = "http://localhost:7141",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JesonWebToken"]))
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");


// middleware that verifies user identity
app.UseAuthentication();

app.UseAuthorization();

// middleware - Extension method that checks for the add product function, whether the request is of type POST and whether it received a correct category code
app.UseAddProductMiddleware();

// app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
