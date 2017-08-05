using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Core.Models
{
    [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        // Vedere VegaDbContext per chiave composta da VehicleId e FeatureId
        public int VehicleId { get; set; }
        public int FeatureId { get; set; }
        public Vehicle Vehicle { get; set; }
        public Feature Feature { get; set; }
    }
}