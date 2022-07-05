const express = require('express');
const localizar = require('../controladores/controlador')


const rotas = express();

rotas.get('/enderecos/:cep/', localizar)


module.exports = rotas