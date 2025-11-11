using Server.Data.Base;

namespace Server.Data.Entities.Categories
{
    public class Categories: BaseEntities
    {
        public required int CategoryId { get; set; }
        public string? CategoryName { get; set; }
    }
}
