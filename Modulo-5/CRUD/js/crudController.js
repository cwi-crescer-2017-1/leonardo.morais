var myApp = angular.module('crudApp', []);

myApp.filter('statusAula', function() {
    return function(input) {
        return input ? "Sim" : "Não";
    }
});

myApp.controller('crudController', function($scope) {
    let idAulaGenerator = 0;
    let idInstrutorGenerator = 0;
    let defaultImage = "http://images.complex.com/complex/image/upload/c_limit,w_680/fl_lossy,pg_1,q_auto/t5vj46jc2ecyp2ptmcfo.jpg";

    $scope.aulas = [];
    $scope.instrutores = [];

    $scope.saveAula = (aula) => {
        if (!existeAulaComNome(aula.nome)) {
            aula.id = idAulaGenerator++;
            $scope.aulas.push(aula);
            delete $scope.aula;
            window.alert("Aula incluída com sucesso");
        } else {
            window.alert("Aula já cadastrada.");
        }
    }

    $scope.removeAula = (aula) => {
        let indice = $scope.aulas.indexOf(aula);
        $scope.aulas.splice(indice, 1);
    }

    $scope.updateAula = (aula) => {
        if (!existeAulaComNome(aula.nome)) {
            aula.id = parseInt(aula.id);
            let aulaUpdate = getAulaById(aula.id);
            aulaUpdate.nome = aula.nome;
            delete $scope.edit;
            windo.alert("Aula atualizada com sucesso");
        } else {
            window.alert("Aula já cadastrada.");
        }
    }

    $scope.saveInstrutor = (instrutor) => {
        if (!existeInstrutorComNome(instrutor.nome, instrutor.sobrenome) &&
                !existeInstrutorComEmail(instrutor.email)) {
            instrutor.id = idInstrutorGenerator++;
            if (typeof instrutor.image === "undefined") {
                instrutor.image = defaultImage;
            }
            $scope.instrutores.push(instrutor);
            delete $scope.instrutor;
            windo.alert("Instrutor incluído com sucesso");
        } else if (existeInstrutorComNome(instrutor.nome, instrutor.sobrenome)) {
            window.alert("Instrutor já cadastrado.");
        } else {
            window.alert("Email já está sendo utilizado.");
        }
    }

    $scope.removeInstrutor = (instrutor) => {
        if (!instrutor.dandoAula) {
            let indice = $scope.instrutores.indexOf(instrutor);
            $scope.instrutores.splice(indice, 1);
            window.alert("Instrutor removido com sucesso");
        } else {
            window.alert("Não é possível excluir este instrutor. Está dando aula.");
        }
    }

    $scope.updateInstrutor = (instrutor) => {
        if (!existeInstrutorComNome(instrutor.nome, instrutor.sobrenome) &&
                !existeInstrutorComEmail(instrutor.email)) {
            instrutor.id = parseInt(instrutor.id);
            let index = getIndexInstrutorById(instrutor.id);
            $scope.instrutores[index] = instrutor;
            delete $scope.editInstrutor;
            window.alert("Instrutor atualizado com sucesso");
        } else if (existeInstrutorComNome(instrutor.nome, instrutor.sobrenome)) {
            window.alert("Instrutor já cadastrado.");
        } else {
            window.alert("Email já está sendo utilizado.");
        }
    }

    var getAulaById = (id) => {
        let index = $scope.aulas.findIndex(a => a.id === id);
        return $scope.aulas[index];
    }

    var getIndexInstrutorById = (id) => {
        return $scope.instrutores.findIndex(ins => ins.id === id);
    }

    var existeAulaComNome = (nome) => {
        return $scope.aulas.some(a => a.nome === nome);
    }

    var existeInstrutorComNome = (nome, sobrenome) => {
        return $scope.instrutores.some(ins => 
                ins.nome === nome && ins.sobrenome === sobrenome);
    }

    var existeInstrutorComEmail = (email) => {
        return $scope.instrutores.some(ins => ins.email === email);
    }
});