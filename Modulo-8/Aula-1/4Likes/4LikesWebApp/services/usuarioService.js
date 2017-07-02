app.service('usuarioService', function($http) {
 
    this.getAmigos = function() {
        return $http.get('http://localhost:9090/usuario/amigos');
    }

    this.carregarDadosUsuario = function(id) {
        return $http.get('http://localhost:9090/usuario/' + id);
    }

    this.carregarAmigos = function() {
        return $http.get('http://localhost:9090/usuario/amigos');
    }

    this.carregarAmigosByIdUsuario = function(id) {
        return $http.get('http://localhost:9090/usuario/amigos/' + id);
    }
});