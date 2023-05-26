using atividade2.Models;
using Microsoft.EntityFrameworkCore;

namespace atividade2.Models
{
    public class TransacaoContext : DbContext
    {
        //Construtor da Classe
        public TransacaoContext(DbContextOptions<MoedaContext> options) : base(options) { }


        //Recurso para manipular itens na base de dados
        public DbSet<Transacao> Transacoes { get; set; } = null!;
    }
}
