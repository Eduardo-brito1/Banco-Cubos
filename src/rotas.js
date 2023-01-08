const express = require('express');
const usuarios = require('./controladores/usuarios');


const rotas = express();
rotas.get('/usuarios/', usuarios.listarUsuarios)
rotas.get('/usuarios/:senha_banco', usuarios.listarContasAtravesDeSenha)
rotas.get('/extrato/:numero_conta/:senha_banco', usuarios.extratoConta)
rotas.post('/contas', usuarios.cadastrarUsuario)
rotas.put('/contas/:numero', usuarios.atualizarUsuario)
rotas.delete('/contas/:numero', usuarios.excluirUsuario)
rotas.post('/transferencias/depositar', usuarios.DepositoDeDinheiro)
rotas.post('/transacoes/sacar', usuarios.sacarDinheiro)
rotas.post('/transacoes/transferir', usuarios.transferenciaDinheiro)
rotas.get('/contas/:numero_conta/:senha_banco', usuarios.saldoConta)
module.exports = rotas;