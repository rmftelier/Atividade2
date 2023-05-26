namespace atividade2.Models
{
    public class Carteira
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public float Saldo { get; set; }

        public int MoedaId { get; set; }

        //public Moeda Moeda { get; set; }


        //Construtores
        public Carteira() { }

        public Carteira(string nome, float saldo, int moedaId)
        {
            Nome = nome;
            Saldo = saldo;
            MoedaId = moedaId;
        }
    }
}
