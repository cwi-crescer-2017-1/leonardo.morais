﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Repositorio
{
    public class RepositorioFuncionarios
    {
        public List<Funcionario> Funcionarios { get; private set; }

        public RepositorioFuncionarios()
        {
            CriarBase();
        }

        private void CriarBase()
        {
            Funcionarios = new List<Funcionario>();

            Cargo desenvolvedor1 = new Cargo("Desenvolvedor Júnior", 190);
            Cargo desenvolvedor2 = new Cargo("Desenvolvedor Pleno", 250);
            Cargo desenvolvedor3 = new Cargo("Desenvolvedor Sênior", 550.5);

            Funcionario lucasLeal = new Funcionario(1, "Marcelinho Carioca", new DateTime(1995, 01, 24));
            lucasLeal.Cargo = desenvolvedor1;
            lucasLeal.TurnoTrabalho = TurnoTrabalho.Manha;
            Funcionarios.Add(lucasLeal);

            Funcionario jeanPinzon = new Funcionario(2, "Mark Zuckerberg", new DateTime(1991, 04, 25));
            jeanPinzon.Cargo = desenvolvedor1;
            jeanPinzon.TurnoTrabalho = TurnoTrabalho.Tarde;
            Funcionarios.Add(jeanPinzon);

            Funcionario rafaelBenetti = new Funcionario(3, "Aioros de Sagitário", new DateTime(1991, 08, 15));
            rafaelBenetti.Cargo = desenvolvedor1;
            rafaelBenetti.TurnoTrabalho = TurnoTrabalho.Noite;
            Funcionarios.Add(rafaelBenetti);

            Funcionario mauricioBorges = new Funcionario(4, "Uchiha Madara", new DateTime(1996, 11, 30));
            mauricioBorges.Cargo = desenvolvedor1;
            mauricioBorges.TurnoTrabalho = TurnoTrabalho.Manha;
            Funcionarios.Add(mauricioBorges);

            Funcionario leandroAndreolli = new Funcionario(5, "Barack Obama", new DateTime(1990, 03, 07));
            leandroAndreolli.Cargo = desenvolvedor1;
            leandroAndreolli.TurnoTrabalho = TurnoTrabalho.Manha;
            Funcionarios.Add(leandroAndreolli);

            Funcionario felipeNervo = new Funcionario(6, "Whindersson  Nunes", new DateTime(1994, 01, 12));
            felipeNervo.Cargo = desenvolvedor1;
            felipeNervo.TurnoTrabalho = TurnoTrabalho.Tarde;
            Funcionarios.Add(felipeNervo);

            Funcionario lucasKauer = new Funcionario(7, "Optimus Prime", new DateTime(1997, 05, 10));
            lucasKauer.Cargo = desenvolvedor1;
            lucasKauer.TurnoTrabalho = TurnoTrabalho.Noite;
            Funcionarios.Add(lucasKauer);

            Funcionario eduardoArnold = new Funcionario(8, "Arnold Schwarzenegger", new DateTime(1989, 09, 16));
            eduardoArnold.Cargo = desenvolvedor1;
            eduardoArnold.TurnoTrabalho = TurnoTrabalho.Tarde;
            Funcionarios.Add(eduardoArnold);

            Funcionario gabrielAlboy = new Funcionario(9, "Bill Gates", new DateTime(1990, 02, 25));
            gabrielAlboy.Cargo = desenvolvedor2;
            gabrielAlboy.TurnoTrabalho = TurnoTrabalho.Manha;
            Funcionarios.Add(gabrielAlboy);

            Funcionario carlosHenrique = new Funcionario(10, "Linus Torvalds", new DateTime(1965, 12, 02));
            carlosHenrique.Cargo = desenvolvedor2;
            carlosHenrique.TurnoTrabalho = TurnoTrabalho.Tarde;
            Funcionarios.Add(carlosHenrique);

            Funcionario margareteRicardo = new Funcionario(11, "Dollynho Developer", new DateTime(1980, 10, 10));
            margareteRicardo.Cargo = desenvolvedor3;
            margareteRicardo.TurnoTrabalho = TurnoTrabalho.Manha;
            Funcionarios.Add(margareteRicardo);
        }

        public IList<Funcionario> BuscarPorCargo(Cargo cargo)
        {
            return Funcionarios
                .Where(f => f.Cargo.Equals(cargo))
                .ToList();
        }

        public IList<Funcionario> OrdenadosPorCargo()
        {
            return Funcionarios
                .OrderBy(f => f.Cargo.Titulo)
                .ThenBy(f => f.Nome)
                .ToList();
        }

        public IList<Funcionario> BuscarPorNome(string nome)
        {
            return Funcionarios
                .Where(f => f.Nome.IndexOf(nome, StringComparison.OrdinalIgnoreCase) > 0)
                .ToList();
        }

        public IList<Funcionario> BuscarPorTurno(params TurnoTrabalho[] turnos)
        {
            return Funcionarios
                .Where(f => turnos.Contains(f.TurnoTrabalho) || turnos.Length == 0)
                .ToList();
        }

        public IList<Funcionario> FiltrarPorIdadeAproximada(int idade)
        {
            return Funcionarios
                .Where(f => CalcularIdade(f.DataNascimento) >= idade - 5
                    && CalcularIdade(f.DataNascimento) <= idade + 5)
                .ToList();
        }

        private int CalcularIdade(DateTime dataNascimento)
        {
            int idade = DateTime.Now.Year - dataNascimento.Year;
            if (DateTime.Now.Month < dataNascimento.Month ||
                (DateTime.Now.Month == dataNascimento.Month && DateTime.Now.Day < dataNascimento.Day))
            {
                idade--;
            }
            return idade;
        }

        public double SalarioMedio(TurnoTrabalho? turno = null)
        {
            var funcionariosConsiderados = turno == null ? Funcionarios : 
                BuscarPorTurno(new TurnoTrabalho[] { (TurnoTrabalho)turno });

            return funcionariosConsiderados.Sum(f => f.Cargo.Salario) / funcionariosConsiderados.Count;
        }

        public IList<Funcionario> AniversariantesDoMes()
        {
            return Funcionarios
                .Where(f => f.DataNascimento.Month == DateTime.Now.Month)
                .ToList();
        }

        public IList<dynamic> BuscaRapida()
        {
            return Funcionarios
                .Select(f => new { NomeFuncionario = f.Nome, TituloCargo = f.Cargo.Titulo })
                .ToArray();
        }

        public IList<dynamic> QuantidadeFuncionariosPorTurno()
        {
            return Funcionarios
                .GroupBy(f => f.TurnoTrabalho)
                .Select(funcionarios => new
                {
                    Turno = funcionarios.FirstOrDefault().TurnoTrabalho,
                    Quantidade = funcionarios.Count()
                })
                .ToArray();
        }

        public dynamic FuncionarioMaisComplexo()
        {
            Regex regex = new Regex("[AEIOUaeiou]");
            var funcionarioMaisComplexo = Funcionarios
                .Where(f => f.TurnoTrabalho != TurnoTrabalho.Tarde && f.Cargo.Titulo != "Desenvolvedor Júnior")
                .OrderBy(f => regex.Replace(f.Nome, "").Length)
                .Last();

            return new
            {
                Nome = funcionarioMaisComplexo.Nome,
                DataNascimento = $"{funcionarioMaisComplexo.DataNascimento.Day}/{funcionarioMaisComplexo.DataNascimento.Month}/{funcionarioMaisComplexo.DataNascimento.Year}",
                SalarioRS = $"R$ {funcionarioMaisComplexo.Cargo.Salario}",
                SalarioUS = $"${funcionarioMaisComplexo.Cargo.Salario}",
                QuantidadeMesmoCargo = BuscarPorCargo(funcionarioMaisComplexo.Cargo).Count
            };
        }
    }
}
