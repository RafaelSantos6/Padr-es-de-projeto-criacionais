export class GatewayLegado {
    efetuarPagamento(centavos) {
        console.log(`[Gateway Legado] Processando pagamento de ${centavos} centavos na API antiga.`);
        return true;
    }
}