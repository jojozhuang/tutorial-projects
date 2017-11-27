using SQLite;

namespace GameStoreXamarin.Core.Models
{
    public class Product
    {
        [PrimaryKey, AutoIncrement]
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public byte[] Image { get; set; }
    }
}
