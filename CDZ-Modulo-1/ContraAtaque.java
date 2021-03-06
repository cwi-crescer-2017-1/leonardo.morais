
public class ContraAtaque implements Movimento {
    private Saint golpeador, golpeado;
    private Sorteador sorteador;
    
    public ContraAtaque(Saint golpeador, Saint golpeado, Sorteador sorteador) {
        this.golpeador = golpeador;
        this.golpeado = golpeado;
        this.sorteador = sorteador;
    }
    
    @Override
    public void executar() {
        if (golpeado.getVida() < 50 && !golpeado.isArmaduraVestida()) {
            if (sorteador.sortear() < 5) {
                golpeado.bloquearProximoAtaque();
            }
        }
    }
    
    @Override
    public boolean isMovimentoDeAtaque() {
        return false;
    }
}
