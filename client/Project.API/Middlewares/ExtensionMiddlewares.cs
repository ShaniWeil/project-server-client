namespace Project.API.Middlewares
{
    public static class ExtensionMiddlewares
    {
        public static IApplicationBuilder UseAddProductMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<AddProductMiddleware>();
        }
    }
}
