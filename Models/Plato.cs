using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace proyecto_inclusivo.models
{
    public class Plato
    {
        public string picPlato { get; set; }

        public List<int> idIngredientes { get; set; }

        public List<string> picsIngredientes { get; set; }
    }
}
