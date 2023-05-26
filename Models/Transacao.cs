namespace atividade2.Models
{
    public class Transacao
    {
        public int Id { get; set; } 

        public int CarteiraId { get; set; } 

        // public string Moeda
        public string Tipo { get; set; } //Compra, Venda, Transferência 

        /// Quantidade de moeda envolvida na transação
        public decimal Quantidade { get; set;  }


    }
}
