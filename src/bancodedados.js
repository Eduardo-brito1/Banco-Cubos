module.exports = {
    numeroUsuario: 2,

    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha_banco: 'Cubos123Bank'
    },
    contas: [
        {
            numero: 1,
            saldo: 1600,
            usuario: {
                nome: "Eduardo Brito",
                cpf: "01155566677",
                data_nascimento: "21-01-2002",
                telefone: "31999998888",
                email: "eduardo@bar.com",
                senha: 123456789
            }
        },
    ],

    saques: [{
        numero_conta: 1,
        valor: 250,
        senha: 12345689
    }],

    depositos: [{
        numero_conta: 0,
        valor: 0
    }],

    transferencias: [
        {
            "numero_conta_origem": 1,
            "numero_conta_destino": 2,
            "valor": 200,
            "senha": 123456
        }
    ]
}

