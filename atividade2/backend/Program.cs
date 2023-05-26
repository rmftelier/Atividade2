
using atividade2.Models;
using Microsoft.EntityFrameworkCore;

namespace atividade2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            //Registrando o DbContext no nosso projeto 
            builder.Services.AddDbContext<CarteiraContext>(opt =>
               opt.UseInMemoryDatabase("CarteiraDB"));



            builder.Services.AddSwaggerGen();

            // Configurar CORS
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });


            var app = builder.Build();


            // Inicializar os dados do contexto aqui
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<CarteiraContext>();
                context.Database.EnsureCreated();

                // Inicializar as moedas
                if (!context.Moedas.Any())
                {
                    context.Moedas.AddRange(
                        new Moeda { Id = 1, Nome = "BitCoin" },
                        new Moeda { Id = 2, Nome = "Ethereum" },
                        new Moeda { Id = 3, Nome = "Binance Coin" },
                        new Moeda { Id = 4, Nome = "Cardano" }
                    );
                    context.SaveChanges();
                }

            }

            // Configurar o pipeline da requisição HTTP
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            //Configurar o pipeline de requisição HTTP
            app.UseRouting();

            app.UseAuthorization();

            //Habilitar o CORS
            app.UseCors();

            app.MapControllers();

            app.Run();
        }
    }
}