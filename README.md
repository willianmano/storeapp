# Store APP Repo

Este repositório possui duas aplicações, uma para o backend e outra para o frontend.

## Tecnologias

#### Frontend

- React
- React redux
- React router
- Redux form

#### Backend

- Silex framework

## Startup das aplicações

Para inicializar as aplicações, basta entrar no diretório delas e executar o seguintes comandos no termial:

#### Frontend

`npm start`

#### Backend

`php -S localhost:8080 -t public public/index.php`


O frontend por padrão roda na porta 3000 e o backend na porta 8080

## Informações para uso da aplicação

O checkout foi desenvolvido em ambiente sandbox do gateway de pagamentos da pagar.me, para isso, durante o processo de checkout é preciso informar um número de cpf correto, bem como os seguintes dados para o cartão de crédito:

- Número do cartão: 4242424242424242
- Código CVC: 123
- Validade: Dezembro de 2020