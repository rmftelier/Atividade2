using Microsoft.EntityFrameworkCore;

namespace atividade2.Models
{
    public class CarteiraContext : DbContext
    {
        //Construtor da Classe
        public CarteiraContext(DbContextOptions<CarteiraContext> options) : base(options) { }


        //Recurso para manipular itens na base de dados
        public DbSet<Carteira> Carteiras { get; set; } = null!;
    
        public DbSet<Moeda> Moedas { get; set; } = null!;

        //Métodos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Carteira>()
                .HasOne(c => c.Moeda)
                .WithMany()
                .HasForeignKey(c => c.MoedaId)
                .IsRequired();

            base.OnModelCreating(modelBuilder);
        }

        
    }
}
