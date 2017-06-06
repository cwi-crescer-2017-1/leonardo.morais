﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImobiliariaCrescer.Infraestrutura.Entidades
{
    public class Adicional
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal PrecoPorDia { get; set; }
        public int Quantidade { get; set; }
    }
}
