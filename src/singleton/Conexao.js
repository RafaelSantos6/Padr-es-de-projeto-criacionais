import mysql from 'mysql2/promise';

export class Conexao {
    static #instancia = null;
    #pool = null;

    constructor() {
        if (Conexao.#instancia) {
            throw new Error("Use Conexao.getInstance() para obter a conexão.");
        }
        
        // Cria o Pool de conexões com as credenciais padrão do XAMPP
        this.#pool = mysql.createPool({
            host: 'localhost',
            user: 'root',      
            password: '',    
            database: 'ecommerce_db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        Conexao.#instancia = this;
    }

    static getInstance() {
        if (!Conexao.#instancia) {
            Conexao.#instancia = new Conexao();
        }
        return Conexao.#instancia;
    }

    getPool() {
        return this.#pool;
    }
}