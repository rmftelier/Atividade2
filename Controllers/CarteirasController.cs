using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using atividade2.Models;

namespace atividade2.Controllers
{
    [Route("api/Carteiras")]
    [ApiController]
    public class CarteirasController : ControllerBase
    {
        private readonly CarteiraContext _context;

        public CarteirasController(CarteiraContext context)
        {
            _context = context;
        }

        // GET: api/Carteiras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Carteira>>> GetCarteiras()
        {
          if (_context.Carteiras == null)
          {
              return NotFound();
          }

            //var carteiras = await _context.Carteiras.Include(c => c.Moeda).ToListAsync();
            var carteiras = await _context.Carteiras.ToListAsync();

            return carteiras;
        }

        // GET: api/Carteiras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Carteira>> GetCarteira(int id)
        {
            if (_context.Carteiras == null)
              {
                  return NotFound();
            }

            //var carteira = await _context.Carteiras.Include(c => c.Moeda).FirstOrDefaultAsync(c => c.Id == id);
            var carteira = await _context.Carteiras.FindAsync(id);

            if (carteira == null)
            {
                return NotFound();
            }

            return carteira;
        }

        // PUT: api/Carteiras/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCarteira(int id, Carteira carteira)
        {
            if (id != carteira.Id)
            {
                return BadRequest();
            }

            _context.Entry(carteira).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarteiraExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carteiras
        [HttpPost]
        public async Task<ActionResult<Carteira>> PostCarteira(Carteira carteira)
        {
          if (_context.Carteiras == null)
          {
              return Problem("Entity set 'CarteiraContext.Carteiras'  is null.");
          }

            //Verificar se a moeda com o MoedaId existe
            var moeda = await _context.Moedas.FindAsync(carteira.MoedaId);
            if (moeda == null)
            {
                return BadRequest("A moeda fornecida não existe.");
            }

            //Vincular a moeda existente à carteira
            //carteira.Moeda = moeda; 

            _context.Carteiras.Add(carteira);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCarteira", new { id = carteira.Id }, carteira);
        }


        // DELETE: api/Carteiras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarteira(int id)
        {
            if (_context.Carteiras == null)
            {
                return NotFound();
            }
            var carteira = await _context.Carteiras.FindAsync(id);
            if (carteira == null)
            {
                return NotFound();
            }

            _context.Carteiras.Remove(carteira);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CarteiraExists(int id)
        {
            return (_context.Carteiras?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        //Informações das Moedas
        // GET: api/Carteiras/Moedas
        [HttpGet("Moedas")]
        public async Task<ActionResult<IEnumerable<Moeda>>> GetMoedas()
        {
            var moedas = await _context.Moedas.ToListAsync();
            return moedas;
        }




    }
}
