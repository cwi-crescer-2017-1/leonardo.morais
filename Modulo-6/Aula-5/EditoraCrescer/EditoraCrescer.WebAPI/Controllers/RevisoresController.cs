﻿using EditoraCrescer.Infraestrutura.Entidades;
using EditoraCrescer.Infraestrutura.Repositorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EditoraCrescer.WebAPI.Controllers
{
    public class RevisoresController : ApiController
    {
        private RevisorRepositorio repositorio = new RevisorRepositorio();

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(new { data = repositorio.Listar() });
        }

        [HttpPost]
        public IHttpActionResult Post(Revisor revisor)
        {
            repositorio.Salvar(revisor);
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Delete(int id)
        {
            return Ok(new { data = repositorio.Excluir(id) });
        }
    }
}
