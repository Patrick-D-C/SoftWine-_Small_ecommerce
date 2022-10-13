# SoftWine - Desafio

Uma antiga loja de vinhos gostaria de vender seus produtos também pela internet para aumentar o seu faturamento.


## Ferramentas utilizadas

Para realizar o desafio escolhido as linguagens PHP(Back-end), Js[React](Front-end) e MySQL, com o proposito de desenvolver uma aplicação Restful simples e consistente.

Optei em desenvolver a arquitetura com foco em somente  realizar requisições que fossem realmente necessarias, aproveitando a consistencia e confiabilidade do REACT para se encarar das regras do frete.

## Bibliotecas utilizas

### PHP

- PDO - Drive nativo para conexão com o banco de dados.

### React

- Material UI - Utilizado para agilizar o desenvolvimento devido a existência de componentes, icones e estilos prontos.;
- Axios - cliente HTTP para customizar função de requisição;
- Router Dom - criar estrutura de navegação entre as paginas;
- Formik - Acompanhar estados dos formularios e permitir a manipulação das informações;
- Yup - Utilizado juntamente com o Formik, permite validar em tempo real as informações inseridas no formulario


## Objetivo

Desenvolver um pequeno e-commerce web que contemple os seguintes requisitos funcionais:

1) Cadastro e manutenção de registro dos vinhos;
2) Registrar venda com a possibilidade de incluir varios vinhos e quantidades;
3) Calcular distancia de entrega;
4) Ao fechar o pedido, deve ser informado valor subtotal dos produtos, frete e total.


## Calculo Frete

1) Para cada 1 kilo do total do pedido, considerar R$5 no calculo do frente;
2) Distancias até 100km considerar somente valor calculado do peso do pedido, distancias maiores que 100km considerar valor calculado do peso do pedido vezes distancia da entrega divido por 100.



## Configurando Ambiente

### Back-end

- Você precisará de um servidor HTTP com apache (pode ser feito no docker) e o modulo rewrite_module ativo, configure como pasta raiz do projeto "/backend/public";

- Crie um novo banco de dados e exporte o bd.sql encontrado na raiz do projeto;

- Acesse a pasta backend/config/database.php e configure as variaveis conforme o seu ambiente;

### Front-end

- Acesse a pasta frontend/src/config/api.ts e altere a base_url para a utilizada no backend (não esquecendo de informar "/api";

- Apos alterar o arquivo das rotas, rode os comandos npm install ou yarn e npm run dev ou yarn dev como preferir.


## Calculo do frete

- Para alterar as regras utilizadas no calculo do frente, acesse /frontend/.env.

