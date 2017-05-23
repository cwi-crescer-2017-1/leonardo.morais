var myApp = angular.module('crudApp', ['toastr', 'ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/aulas', {
      controller: 'aulaController',
      templateUrl: 'aula.html'
    })
    .when('/instrutores', {
      controller: 'instrutoresController',
      templateUrl: 'instrutor.html'
    })
    .otherwise({redirectTo: '/aulas'});
});

myApp.filter('statusAula', function() {
    return function(input) {
        return input ? "Sim" : "Não";
    }
});

myApp.controller('principalController', function($scope, $rootScope) {
    $rootScope.aulas = [];
    $rootScope.instrutores = [];
});

myApp.controller('aulaController', function($scope, $rootScope, toastr, aulaService) {

    carregarAulas();

    function carregarAulas() {
        aulaService.getAulas().then(response => {
            $rootScope.aulas = response.data;
        })
    } 

    $scope.saveAula = (aula) => {
        if (!existeAulaComNome(aula.nome)) {
            aulaService.saveAula(aula).then(() => carregarAulas());
            delete $scope.aula;
            toastr.success("Aula inserida com sucesso");
        } else {
            toastr.error("Aula já cadastrada.");
        }
    }

    $scope.removeAula = (aula) => {
        if (!aulaEstaSendoUtilizada(aula)) {
            aulaService.removeAula(aula).then(() => carregarAulas());
            toastr.success("Aula removida com sucesso");
        } else {
            toastr.error("Não é possível excluir esta aula. Está sendo utilizada.");
        }
    }

    $scope.updateAula = (aula) => {
        if (!existeAulaComNome(aula.nome)) {
            aula.id = parseInt(aula.id);
            aulaService.updateAula(aula).then(() => carregarAulas());
            delete $scope.edit;
            toastr.success("Aula atualizada com sucesso");
        } else {
            toastr.error("Aula já cadastrada.");
        }
    }

    var getAulaById = (id) => {
        let index = $scope.aulas.findIndex(a => a.id === id);
        return $scope.aulas[index];
    }

    var aulaEstaSendoUtilizada = (aula) => {
        return $scope.instrutores.some(ins => ins.aula.some(a => a == aula.id));
    }

    var existeAulaComNome = (nome) => {
        return $scope.aulas.some(a => a.nome === nome);
    }
});

myApp.controller('instrutoresController', function($scope, $rootScope, toastr, instrutorService) {
    let defaultImage = "http://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/t5vj46jc2ecyp2ptmcfo.jpg";

    carregarInstrutores();

    function carregarInstrutores() {
        instrutorService.getInstrutores().then(response => {
            $rootScope.instrutores = response.data;
        })
    }

    $scope.saveInstrutor = (instrutor) => {
        if (!existeInstrutorComNome(instrutor.nome, instrutor.sobrenome) &&
                !existeInstrutorComEmail(instrutor.email)) {
            checarImagem(instrutor);
            instrutorService.saveInstrutor(instrutor).then(() => carregarInstrutores());
            delete $scope.instrutor;
            toastr.success("Instrutor incluído com sucesso");
        } else if (existeInstrutorComNome(instrutor.nome, instrutor.sobrenome)) {
            toastr.error("Instrutor já cadastrado.");
        } else {
            toastr.error("Email já está sendo utilizado.");
        }
    }

    $scope.removeInstrutor = (instrutor) => {
        if (!instrutor.dandoAula) {
            instrutorService.removeInstrutor(instrutor).then(() => carregarInstrutores());
            toastr.success("Instrutor removido com sucesso");
        } else {
            toastr.error("Não é possível excluir este instrutor. Está dando aula.");
        }
    }

    $scope.updateInstrutor = (instrutor) => {
        instrutor.id = parseInt(instrutor.id);
        if (!existeInstrutorComNome(instrutor.nome, instrutor.sobrenome, instrutor.id) &&
                !existeInstrutorComEmail(instrutor.email, instrutor.id)) {
            checarImagem(instrutor);
            instrutorService.updateInstrutor(instrutor).then(() => carregarInstrutores());
            delete $scope.editInstrutor;
            toastr.success("Instrutor atualizado com sucesso");
        } else if (existeInstrutorComNome(instrutor.nome, instrutor.sobrenome, instrutor.id)) {
            toastr.error("Instrutor já cadastrado.");
        } else {
            toastr.error("Email já está sendo utilizado.");
        }
    }

    var existeInstrutorComNome = (nome, sobrenome, id = -1) => {
        return $scope.instrutores.some(ins => 
                ins.nome === nome && 
                ins.sobrenome === sobrenome &&
                ins.id !== id);
    }

    var existeInstrutorComEmail = (email, id = -1) => {
        return $scope.instrutores.some(ins => ins.email === email && ins.id !== id);
    }

    var checarImagem = (instrutor) => {
        if (typeof instrutor.image === "undefined") {
            instrutor.image = defaultImage;
        }
    }

    var getIndexInstrutorById = (id) => {
        return $scope.instrutores.findIndex(ins => ins.id === id);
    }

    $scope.getAulasByIds = (ids) => $scope.aulas.filter(a => ids.some(id => id == a.id));
})