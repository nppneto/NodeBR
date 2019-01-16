/*
0 - Obter um usuário
1 - Obter número de telefone a partir de seu ID
2- Obter endereço do usuário pelo ID
*/
// Importamos um módulo interno do node.js

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    // Quando der problema, chamamos o reject e passamos o erro para dentro dele
    // Quando for sucesso, chamamos o resolve
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('DEU ERRO DE VERDADE'));
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve ({
                telefone: '119902',
                ddd: '11'
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();
// Para manipular o sucesso, manipulamos a função .then()
// Para manipular erros, usamos o .catch()
// usuario -> telefone -> endereço
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(resultado) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: resultado
                }
            })
    })
    .then(function(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        });
    })
    .then(function(resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome},
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function(error) {
        console.error('Deu ruim!', error);
    });


// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || " " || 0 === false
//     if(error) {
//         console.error('Deu ruim em USUÁRIO', error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('Deu ruim em TELEFONE', error1);
//             return;
//         }
        
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('Deu ruim em ENDEREÇO', error2);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         });
//     });
// });
// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);