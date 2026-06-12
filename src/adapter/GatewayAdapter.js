import { GatewayLegado } from './GatewayLegado.js';

// Implementa a interface implícita "Pagamento" que tem o método "processar(valor)"
export class GatewayAdapter {
    constructor() {
        this.gatewayLegado = new GatewayLegado();
    }
    
    processar(valor) {
        // Converte o float para int 
        const centavos = Math.round(valor * 100);
        console.log(`[Adapter] Convertendo R$ ${valor.toFixed(2)} para ${centavos} centavos.`);
        return this.gatewayLegado.efetuarPagamento(centavos);
    }
}