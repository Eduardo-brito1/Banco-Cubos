let { banco, contas, transferencias, saques, depositos } = require('../bancodedados');
let { numeroUsuario } = require('../bancodedados')

listarUsuarios = (req, res) => {
    return res.status(200).json(banco);
}

const listarContasAtravesDeSenha = (req, res) => {
    const { senha_banco } = req.params;

    if (senha_banco === banco.senha_banco) {
        return res.status(200).json({ contas, transferencias });
    } else {
        return res.status(403).json({ mensagem: 'A senha do banco informada é inválida!' })
    }

}
const saldoConta = (req, res) => {
    const { numero_conta, senha_banco } = req.params;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: ' O numero da conta e obrigatorio' })
    }

    if (!senha_banco) {
        return res.status(400).json({ mensagem: ' A senha do banco e obrigatorio' })
    }

    const dados = contas.map((Number) => {
        return {
            numero: Number.numero,
            saldo: Number.saldo,
            senha: Number.usuario.senha
        }
    })

    const busca = dados.find(numero => numero.numero == numero_conta)
    const verificaSenha = dados.find(sua => sua.senha == senha_banco)

    if (busca == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }

    if (verificaSenha.senha != senha_banco) {
        return res.status(403).json({ mensagem: 'sua senha esta incorreta' })
    }

    if (verificaSenha.senha == undefined) {
        return res.status(403).json({ mensagem: 'você deve informar uma senha' })
    }
    const saldo = {
        saldo: busca.saldo
    }

    return res.status(200).json(saldo);
}

const extratoConta = (req, res) => {
    const { numero_conta, senha_banco } = req.params;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: ' O numero da conta e obrigatorio' })
    }

    if (!senha_banco) {
        return res.status(400).json({ mensagem: ' A senha do banco e obrigatorio' })
    }

    const dados = contas.map((Number) => {
        return {
            numero: Number.numero,
            saldo: Number.saldo,
            senha: Number.usuario.senha
        }
    })

    const busca = dados.find(numero => numero.numero == numero_conta)
    const verificaSenha = dados.find(sua => sua.senha == senha_banco)

    const saque = saques.map((Number) => {
        return {
            numero: Number.numero_conta,
            senha: senha_banco,
            valor: Number.valor
        }
    })

    let buscaSaque = saque.find(sua => sua.numero = numero_conta)

    if (buscaSaque.numero !== numero_conta && buscaSaque.senha != senha_banco) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })

    }


    if (busca == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }

    if (verificaSenha.senha != senha_banco) {
        return res.status(403).json({ mensagem: 'sua senha esta incorreta' })
    }

    if (verificaSenha.senha == undefined) {
        return res.status(403).json({ mensagem: 'você deve informar uma senha' })
    }

    const extrato = {
        saque,
        depositos,
        transferencias

    }

    return res.status(200).json(extrato);
}


const cadastrarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome) {
        return res.status(400).json({ mensagem: ' O nome e obrigatorio' })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: ' O cpf e obrigatorio' })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: ' A data de nascimento e obrigatorio' })
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: ' O telefone e obrigatorio' })
    }

    if (!email) {
        return res.status(400).json({ mensagem: ' O email e obrigatorio' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: ' A senha e obrigatorio' })
    }


    const usuario = {
        numero: numeroUsuario++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(usuario)
    return res.status(201).json(usuario);



}

const atualizarUsuario = (req, res) => {
    const { numero } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;


    if (!nome) {
        return res.status(400).json({ mensagem: ' O nome e obrigatorio' })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: ' O cpf e obrigatorio' })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: ' A data de nascimento e obrigatorio' })
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: ' O telefone e obrigatorio' })
    }

    if (!email) {
        return res.status(400).json({ mensagem: ' O email e obrigatorio' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: ' A senha e obrigatorio' })
    }
    const pessoa = contas.find((pessoa) => {
        return pessoa.numero === Number(numero)
    })

    if (!pessoa) {
        return res.status(404).json({ mensagem: ' usuario não encontrado' })
    }

    pessoa.usuario.nome = nome;
    pessoa.usuario.cpf = cpf;
    pessoa.usuario.data_nascimento = data_nascimento;
    pessoa.usuario.telefone = telefone;
    pessoa.usuario.email = email;

    return res.status(203).send();
}

const excluirUsuario = (req, res) => {
    const { numero } = req.params;
    let dinheiro = 0;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero)
    })

    if (!conta) {
        return res.status(404).json({ mensagem: "a conta não existe" })
    }

    for (const item of contas) {
        dinheiro = item.saldo
    }
    if (dinheiro != 0) {
        return res.status(403).json({ mensagem: "o saldo da conta tem que ser 0" })
    }


    contas = contas.filter((conta) => {
        return conta.numero !== Number(numero);
    })

    return res.status(204).send();

}

const DepositoDeDinheiro = (req, res) => {

    let { numero_conta } = req.body;
    let { valor } = req.body;
    let saldos = 0;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: ' O numero e obrigatorio' })
    }
    if (!valor) {
        return res.status(400).json({ mensagem: ' O valor e obrigatorio' })
    }


    for (const item of contas) {
        saldos = item.saldo;
    }
    const ArrayDeNumeroDoUsuario = contas.map((Number) => {
        return {
            numero: Number.numero
        }
    })

    const busca = ArrayDeNumeroDoUsuario.find(numero => numero.numero == numero_conta)

    if (busca == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }


    if (valor > 0) {
        valor = valor + saldos
    } else {
        return res.status(403).json({ mensagem: 'não e possivel fazer um deposito negativo' })
    }
    if (valor) {
        saldos = valor;
    }

    const deposito = {

        numero_conta,
        valor,

    }
    depositos.push(deposito)
    return res.status(201).json(deposito);



}

const sacarDinheiro = (req, res) => {
    const { numero_conta, senha } = req.body;
    let { valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: ' O numero e obrigatorio' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha e obrigatorio' })
    }
    if (!valor) {
        return res.status(400).json({ mensagem: ' O valor e obrigatorio' })
    }

    //codigo para verificar se tem dinheiro, e se o dinheiro tem saldo = 0
    const verificadorDeSaldo = contas.map((verifica) => {
        return {
            dinheiro: verifica.saldo
        }
    })

    let verificarSaldo = verificadorDeSaldo.find(saldo => saldo)

    if (verificarSaldo.dinheiro < 0) {
        return res.status(403).json({ mensagem: 'você não possui dinheiro na sua conta' })
    }
    if (valor > verificarSaldo.dinheiro) {

        return res.status(403).json({ mensagem: 'O valor que vc tentou sacar e maior que o que vc possui' })
    }



    //codigo para verificar se a senha esta correta
    const verificadorDeSenha = contas.map((verifica) => {
        return {
            numero: verifica.numero,
            senha: verifica.usuario.senha
        }
    })
    const verificaSenha = verificadorDeSenha.find(sua => sua.senha == senha)

    if
        (verificaSenha == undefined) {
        return res.status(403).json({ mensagem: 'você deve informar uma senha' })
    }
    //codigo para verificar se o numero do usuario existe
    const ArrayDeNumeroDoUsuario = contas.map((Number) => {
        return {
            numero: Number.numero
        }
    })
    const busca = ArrayDeNumeroDoUsuario.find(numero => numero.numero == numero_conta)

    if (busca == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }

    if (verificaSenha.senha != senha) {
        return res.status(403).json({ mensagem: 'sua senha esta incorreta' })
    }


    const saque = {
        numero_conta,
        valor,
        senha

    }
    saques.push(saque)
    return res.status(201).json(saques);

}

const transferenciaDinheiro = (req, res) => {

    const { numero_conta_origem, numero_conta_destino } = req.body;
    let { valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: ' O numero da conta de origem e obrigatorio' })
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: ' O numero da conta do destino e obrigatorio' })
    }
    if (!valor) {
        return res.status(400).json({ mensagem: ' O valor e obrigatorio' })
    }
    if (!senha) {
        return res.status(400).json({ mensagem: ' sua senha e obrigatorio' })
    }
    //codigo para verificar se a conta origem existe
    const ArrayDeNumeroDoUsuario = contas.map((Number) => {
        return {
            numero: Number.numero
        }
    })
    const busca = ArrayDeNumeroDoUsuario.find(numero => numero.numero == numero_conta_origem)

    if (busca == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }

    const ArrayDoUsuariodestino = contas.map((Number) => {
        return {
            numero: Number.numero
        }
    })
    const busca2 = ArrayDoUsuariodestino.find(numero => numero.numero == numero_conta_destino)

    if (busca2 == undefined) {
        return res.status(403).json({ mensagem: 'essa conta não existe' })
    }

    //codigo para verificase se a senha do usuario de origem e igual a senha que esta no banco

    const verificadorDeSenha = contas.map((verifica) => {
        return {
            numero: verifica.numero,
            senha: verifica.usuario.senha,
        }
    })
    const verificaUsuario = verificadorDeSenha.find(sua => sua.numero == numero_conta_origem)
    const verificaSenha = verificadorDeSenha.find(sua => sua.senha == senha)

    if (verificaUsuario == undefined) {
        return res.status(403).json({ mensagem: 'seu usuario não existe' })
    }

    if (verificaSenha == undefined) {
        return res.status(403).json({ mensagem: 'sua senha esta incorreta' })
    }
    if (verificaUsuario && verificaSenha == verificadorDeSenha) {
        console.log('pode logar');
    }


    //codigo para verificar se tem saldo na conta , 
    //codigo que também subtrai o valor pelo dinheiro na conta origem
    //
    const verificadorDeSaldo = contas.map((verifica) => {
        return {
            dinheiro: verifica.saldo,
            numero: verifica.numero,
        }
    })


    let verificarSaldo = verificadorDeSaldo.find(saldo => saldo)

    let verificarcontaDestino = verificadorDeSaldo.find(dinheiro => dinheiro.numero === numero_conta_destino)

    if (verificarcontaDestino.numero == numero_conta_destino) {
        contas.forEach(item => {
            if (item.saldo == verificarcontaDestino.dinheiro && item.numero == verificarcontaDestino.numero) {
                item.saldo = verificarcontaDestino.dinheiro + valor;
            }

        })
    }






    if (verificarSaldo.dinheiro < 0) {

        return res.status(403).json({ mensagem: 'você não possui dinheiro na sua conta' })
    }

    if (verificarSaldo.numero == numero_conta_origem) {

        contas.forEach(item => {
            if (item.saldo == verificarSaldo.dinheiro && item.numero == numero_conta_origem) {
                item.saldo = verificarSaldo.dinheiro - valor;
            }
            if (verificarSaldo.dinheiro < 0) {
                return res.status(403).json({ mensagem: 'você não possui dinheiro na sua conta' })
            }

        })
    }




    const transferencia = {
        numero_conta_origem,
        numero_conta_destino,
        valor,
        senha
    }
    transferencias.push(transferencia)
    return res.status(201).json(transferencia);


}



module.exports = {
    listarUsuarios,
    listarContasAtravesDeSenha,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario,
    transferenciaDinheiro,
    sacarDinheiro,
    DepositoDeDinheiro,
    saldoConta,
    extratoConta
}