
import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class SaintTest {
    
    @Test
    public void vestirArmaduraDeixaArmaduraVestida() throws Exception {
        // AAA
        // 1. Arrange - Montagem do cenario de teste 
        Armadura touro = new Armadura(new Constelacao("Touro"), Categoria.OURO);
        Saint jubileu = new Saint("Jubileu", touro);
        
        // 2. Action - Invocar a ação a ser testada       
        jubileu.vestirArmadura();
        
        // 3. Assert - verificação dos resultados do teste
        assertEquals(true, jubileu.isArmaduraVestida());
    }
    
    @Test
    public void vestirArmaduraDeixaArmaduraNaoVestida() throws Exception {
        Saint jubileu = new Saint("Jubileu", new Armadura(new Constelacao("Touro"), Categoria.BRONZE));
        assertEquals(false, jubileu.isArmaduraVestida());
    }
    
    @Test
    public void aoCriarSaintGeneroENaoInformado() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        assertEquals(Genero.NAO_INFORMADO, saint.getGenero());
    }
    
    @Test
    public void aoInstanciarSaintStatusVivo() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        assertEquals(Status.VIVO, saint.getStatus());
    }
    
    @Test 
    public void testarSetGeneroSaint() throws Exception {
        Saint jubileu = new Saint("Jubileu", new Armadura(new Constelacao("Touro"), Categoria.PRATA));
        jubileu.setGenero(Genero.FEMININO);
        assertEquals(Genero.FEMININO, jubileu.getGenero());
    }
    
    @Test
    public void testarMetodoPerdeVida() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        saint.perderVida(60);
        assertEquals(40.0, saint.getVida(), 0.0001);
    }
    
    @Test
    public void aoInstanciarSaintVidaECem() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        assertEquals(100.0, saint.getVida(), 0);
    }
    
    @Test
    public void saintLeva100DeDano() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        saint.perderVida(100);
        assertEquals(0, saint.getVida(), 0.0001);
    }
    
    @Test
    public void saintLevaMenos1000DeDano() throws Exception {
        Saint saint = new Saint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        saint.perderVida(-1000);
        assertEquals(1100, saint.getVida(), 0.0001);
    }
    
    @Test
    public void aoInstanciarUmSaintBronzeCincoSentidosDespertados() throws Exception {;
        Saint saint = new BronzeSaint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.BRONZE));
        assertEquals(5, saint.getSentidosDespertados());
    }
    
    @Test
    public void aoInstanciarUmSaintPrataSeisSentidosDespertados() throws Exception {
        Saint saint = new SilverSaint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.PRATA));
        assertEquals(6, saint.getSentidosDespertados());
    }
    
    @Test
    public void aoInstanciarUmSaintOuroSeteSentidosDespertados() throws Exception {
        Saint saint = new GoldSaint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        assertEquals(7, saint.getSentidosDespertados());
    }
    
    @Test(expected=Exception.class)
    public void constelacaoInvalidaDeOuroDeveLancarErro() throws Exception {
        new GoldSaint("Bernardo", new Armadura(new Constelacao("Teste"), Categoria.OURO));
    }
    
    @Test
    public void vidaSaintMenorUmStatusMorto() throws Exception {
        Saint saint = new GoldSaint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        saint.perderVida(99);
        assertEquals(Status.VIVO, saint.getStatus());
        saint.perderVida(1);
        assertEquals(0, saint.getVida(), 0);
        assertEquals(Status.MORTO, saint.getStatus());
    }
    
    @Test
    public void saintComStatusMortoNaoPerdeVida() throws Exception {
        Saint saint = new GoldSaint("Shaka", new Armadura(new Constelacao("Touro"), Categoria.OURO));
        saint.perderVida(200);
        assertEquals(-100, saint.getVida(), 0);
        saint.perderVida(100);
        assertEquals(Status.MORTO, saint.getStatus());
        assertEquals(-100, saint.getVida(), 0);
    }
}
