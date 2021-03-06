using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using vega.Core;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using vega.Persistence;
using vega.Core.Models;
using vega.Controllers;

namespace WebApplicationBasic
{
    // Classe di startup lanciata dal main di dotnet che è Program.cs
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // Configura la dependency injection
        public void ConfigureServices(IServiceCollection services)
        {

            services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));
            // Dependency injection per VehicleRepository
            // 3 tipi di DI:
            // Transient ( istanza nuova ad ogni uso )
            // Singleton ( istanza unica per l'applicazione )
            // Scoped ( instanza nuova per ogni request )
            // di seguito lego l'interfaccia all'implementazione
            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddAutoMapper();
            // per accedere alle configurazioni potevo anche usare Configuration.GetConnectionString("Default")
            services.AddDbContext<VegaDbContext>( options => options.UseSqlServer(Configuration["ConnectionStrings:Default"]));

            services.AddAuthorization(options => {
                options.AddPolicy(AppPolicies.RequireAdminRole, policy => {
                    policy.RequireClaim("https://vega.com/roles", "Admin");
                });
            });

            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // configurazione del logger, in questo caso viene rediretto verso la console
            // questa cosa va bene in caso di ambiente di sviluppo, in produzione bisognerà
            // modificare questa configurazione per salvare i log su database, file, remoto o altro
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Configurazione della Request Pipeline, una sequenza di middleware
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // Serve per servire file statici
            app.UseStaticFiles();

            // Setupe Auth0
            var options = new JwtBearerOptions
            {
                Audience = "https://api.vega.com",
                Authority = "https://pul87.eu.auth0.com/"
            };
            app.UseJwtBearerAuthentication(options);

            // Anche MVC è un middleware, quando arriva una richiesta
            // in base alla rotta vengono richiamati i controller.
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
