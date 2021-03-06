describe('Teste de daisyGame', function() {
    it('daisyGame com numero par', function() {
        expect(daisyGame(6)).toEqual("Love Me Not");
    });
    it('daisyGame com numero impar', function() {
        expect(daisyGame(5)).toEqual("Love Me");
    });
});

describe('Teste do maior texto em um array', function() {
    it('MaiorTexto deve retornar a maior string do array', function() {
        expect(maiorTexto(["Leonardo", "Leozin", "AAA"])).toEqual("Leonardo");
    });
    it('MaiorTexto deve string vazia caso array esteja vazio', function() {
        expect(maiorTexto([])).toEqual("");
    });
});

describe('Função Adicionar deve retornar a soma de dois numeros', function() {
    it('Adicionar 2 com 8 deve retornar 10', function() {
        expect(adicionar(2)(8)).toEqual(10);
    });
    it('Adcionar 100 com 200 deve retornar 300', function() {
        expect(adicionar(100)(200)).toEqual(300);
    });
});

describe('Função fiboSum deve retornar a soma de todos os elementos de fibonacci até um numero n', function() {
    it('Soma da sequencia de fibonacci até o setimo elemento é 33', function() {
        expect(fiboSum(7)).toEqual(33);
    });
    it('Soma da sequencia de fibonacci até o terceiro elemento é 4', function() {
        expect(fiboSum(3)).toEqual(4);
    });
    it('Soma da sequencia de fibonacci até o oitavo elemento é 54', function() {
        expect(fiboSum(8)).toEqual(54);
    });
});

describe('Quero Caféeeeee', function() {
    it('Quero caféeee', function() {
        var cafes = queroCafe(4, [5, 4, 3, 2, 1]);
        expect(cafes).toEqual("1,2,3");
    });
});