export class FreteStrategy {
    calcular(distancia) {
        throw new Error("O método calcular() deve ser implementado pelas subclasses.");
    }
}

export class FreteNormal extends FreteStrategy {
    calcular(distancia) {
        console.log("[Strategy] Calculando frete NORMAL...");
        return distancia * 1.5; 
    }
}

export class FreteExpresso extends FreteStrategy {
    calcular(distancia) {
        console.log("[Strategy] Calculando frete EXPRESSO...");
        return distancia * 3.0;
    }
}

export class CalculadoraFrete {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    calcular(distancia) {
        return this.strategy.calcular(distancia);
    }
}