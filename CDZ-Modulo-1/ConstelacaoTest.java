

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class ConstelacaoTest {
    
    @Test
    public void testarCorretaInstanciacaoObjetoConstelacao() {
        Constelacao constelacao = new Constelacao("Algum nome");
        assertEquals("Algum nome", constelacao.getNome());
        Golpe[] golpes = constelacao.getGolpes();
        for (int i = 0; i < golpes.length; i++) {
            assertEquals(null, golpes[i]);
        }
    }
    
    @Test 
    public void testarCorretoFuncionamentoAdicaoGolpes() {
        Constelacao constelacao = new Constelacao("Algum nome");
        Golpe[] golpes = new Golpe[3];
        golpes[0] = new Golpe("Kamehameha", 8001);
        golpes[1] = new Golpe("Rasengan", 5);
        golpes[2] = new Golpe("Raduken", 100);
        for (int i = 0; i < golpes.length; i++) {
            constelacao.adicionarGolpe(golpes[i]);
        }
        for (int i = 0; i < golpes.length; i++) {
            assertEquals(golpes[i], constelacao.getGolpes()[i]);
        }
        
        constelacao.adicionarGolpe(new Golpe("Espadada", 1));
        
        for (int i = 0; i < golpes.length; i++) {
            assertEquals(golpes[i], constelacao.getGolpes()[i]);
        }
    }
}