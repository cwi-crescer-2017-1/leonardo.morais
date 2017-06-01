﻿using EditoraCrescer.Infraestrutura.Contexto;
using EditoraCrescer.Infraestrutura.Entidades;
using EditoraCrescer.Infraestrutura.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EditoraCrescer.WebAPI.Controllers
{
    [RoutePrefix("api/Livros")]
    public class LivrosController : ApiController
    {
        private LivroRepositorio repositorio = new LivroRepositorio();

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(repositorio.Listar());
        }

        [Route("{isbn:int}")]
        [HttpGet]
        public HttpResponseMessage ObterLivroPeloIsbn(int isbn)
        {
            var livro = repositorio.ObterPorIsbn(isbn);
            if (livro == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound,
                    new { error = "Não existe livro com o id informado" });
            }
            return Request.CreateResponse(HttpStatusCode.OK, new { data = livro });
        }

        public HttpResponseMessage ObterLivrosPorGenero(string genero)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new { data = 
                repositorio.ObterPorGenero(genero) });
        }

        public IHttpActionResult Post(Livro livro)
        {
            repositorio.Salvar(livro);
            return Ok();
        }

        public IHttpActionResult Delete(int id)
        {
            return Ok(repositorio.Excluir(id));
        }
    }
}