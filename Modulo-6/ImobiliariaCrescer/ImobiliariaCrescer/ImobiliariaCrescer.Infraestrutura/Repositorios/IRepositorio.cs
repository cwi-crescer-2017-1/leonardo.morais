﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImobiliariaCrescer.Infraestrutura.Repositorios
{
    public interface IRepositorio<T> 
    {
        List<T> Listar();
        T ObterPorId(int id);
        void Criar(T objeto);
        void Alterar(T objeto);
        void Deletar(int id);
    }
}
