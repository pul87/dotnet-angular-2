using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Core.Models
{
    [Table("Vehicles")]
    public class Vehicle
    {
        public Vehicle()
        {
            Features = new Collection<VehicleFeature>();
            photos = new Collection<Photo>();
        }
        public int Id { get; set; }
        [Required]
        public Model Model { get; set; }
        public int ModelId { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }
        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }
        [StringLength(255)]
        public string ContactEmail { get; set; }
        public bool IsRegistered { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<VehicleFeature> Features { get; set; }
        public ICollection<Photo> photos { get; set; }
    }
}