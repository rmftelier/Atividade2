namespace atividade2.Models
{
    public class Carteira
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public decimal Saldo { get; set; }

        public int MoedaId { get; set; }

        public Moeda Moeda { get; set; }

        //Criação da Carteira 
        /* public Carteira()
         {
             Nome = ""
             Saldo = 0;
             MoedasDisponiveis = new List<Moeda>();
             MoedaSelecionada = null;
         }

        
        */

        public Carteira() { 
        
        
        }

        // Construtor com parâmetros
        // Construtor com parâmetros
        public Carteira(int id, string nome, decimal saldo, int moedaId, Moeda moeda)
        {
            Id = id;
            Nome = nome;
            Saldo = saldo;
            MoedaId = moedaId;
            Moeda = moeda;
        }
    }
}
