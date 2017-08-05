using Microsoft.EntityFrameworkCore;
using vega.Core.Models;

namespace vega.Persistence
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> options) : base(options)
        {}
        // Serve per generare una chiave composta da VechicleId e FeatureId durante la creazione
        // di un modello di tipo VehicleFeature. Le chiavi composite al momento non sono 
        // supportate da EF Core, quindi bisogna fare cossì.
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new { vf.VehicleId, vf.FeatureId});
        }
    }
}