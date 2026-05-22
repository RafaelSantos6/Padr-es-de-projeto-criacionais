# Padrões de projeto criacionais

## Projeto feito em Node.js usando o Expresse e mysql2 para leitura e gravação em banco. 
O projeto consiste em uma aplicação web estruturada em camadas, expondo uma API RESTful desenvolvida em Node.js com o framework Express. A aplicação gerencia a criação e listagem de pedidos de um e-commerce, empregando Padrões Criacionais (Design Patterns) para resolver problemas complexos de instanciação e validação de regras de negócio antes de persistir os dados em um banco MySQL.


### Justificativas
1. Singleton (Conexão com o Banco de Dados)
Por que usar: Criar conexões com o banco de dados é uma operação lenta e que consome muita memória. O Singleton garante que apenas um Pool de Conexões seja criado e reaproveitado por todo o sistema durante as requisições. Isso centraliza o acesso ao banco em um ponto global seguro e evita que o servidor trave ou esgote seus recursos por excesso de conexões simultâneas.

2. Builder (Montagem de Pedidos)
Por que usar: Em vez de usar um construtor tradicional cheio de parâmetros ordenados (o que causa confusão e força a passagem de valores null para campos opcionais), o Builder permite montar o objeto passo a passo de forma fluente e legível. Além disso, ele isola e centraliza as regras de validação dentro do método build(), garantindo que nenhum pedido incompleto ou inválido seja criado no sistema.

3. Factory Method (Sistema de Pagamentos)
Por que usar: Esse padrão isola a lógica de criação das diferentes formas de pagamento, fazendo com que o servidor (código cliente) não precise conhecer as classes concretas diretamente. Para adicionar uma nova opção como criptomoeda, basta criar a nova classe e registrá-la na Factory. O restante do sistema continua intacto, respeitando o Princípio Aberto/Fechado (baixo acoplamento).










#### Alunos
* Rafael Ricetti
* Vinicius Sebold 

# para rodar 
> node index.js    