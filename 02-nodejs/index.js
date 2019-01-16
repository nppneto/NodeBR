/*
0 - Obter um usuário
1 - Obter número de telefone a partir de seu ID
2- Obter endereço do usuário pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function() {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback (null, {
            telefone: '119902',
            ddd: '11'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

function resolverUsuario(error, usuario) {
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
    // null || " " || 0 === false
    if(error) {
        console.error('Deu ruim em USUÁRIO', error);
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error('Deu ruim em TELEFONE', error1);
            return;
        }
        
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error('Deu ruim em ENDEREÇO', error2);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereço: ${endereco.rua},${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        });
    });
});
// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);