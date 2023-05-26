using Microsoft.EntityFrameworkCore;

namespace atividade2.Models
{
    public class MoedaContext : DbContext
    {
        //Construtor da Classe
        public MoedaContext(DbContextOptions<MoedaContext> options) : base(options) { }


        //Recurso para manipular itens na base de dados
        public DbSet<Moeda> Moedas { get; set; } = null!;
    
    
       public void InicializarDados()
        {
            //Criando as moedas
            var bitcoin = new Moeda { Id = 1, Nome = "BitCoin" };
            var ethereum = new Moeda { Id = 2, Nome = "Ethereum" };
            var binanceCoin = new Moeda { Id = 3, Nome = "Binance Coin" };
            var cardano = new Moeda { Id = 4, Nome = "Cardano" };


            //Adicionando as moedas
            Moedas.Add(bitcoin);
            Moedas.Add(ethereum);
            Moedas.Add(binanceCoin);    
            Moedas.Add(cardano);

            //Salvando 
            SaveChanges();
        }
    
    }
}
