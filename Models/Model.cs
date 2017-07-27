using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("Models")]
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        // --------- Foreign Key -----------------------------------------
        // Reference alla classe Make
        public Make Make { get; set; }
        // Serve all'entity framework per creare la foreign key
        // il tipo deve essere lo stesso dell'id della classe referenziata
        public int MakeId { get; set; }
        // --------- Foreign Key -----------------------------------------
    }
}