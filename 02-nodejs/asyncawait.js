/*
0 - Obter um usu�rio
1 - Obter n�mero de telefone a partir de seu ID
2- Obter endere�o do usu�rio pelo ID
*/
// Importamos um m�dulo interno do node.js

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

main();
// Adicionar a palavra async na função -> automaticamente retornará uma promise
async function main() {
    try {
        console.time('medida-promise');
        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1];
        const telefone = resultado [0];

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise');
    }
    catch(error) {
        console.error('DEU RUIM', error);
    }
}

// const usuarioPromise = obterUsuario();
// // Para manipular o sucesso, manipulamos a fun��o .then()
// // Para manipular erros, usamos o .catch()
// // usuario -> telefone -> endere�o
// usuarioPromise
//     .then(function(usuario) {
//         return obterTelefone(usuario.id)
//             .then(function resolverTelefone(resultado) {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: resultado
//                 }
//             })
//     })
//     .then(function(resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id);
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         });
//     })
//     .then(function(resultado) {
//         console.log(`
//             Nome: ${resultado.usuario.nome},
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//             Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//         `);
//     })
//     .catch(function(error) {
//         console.error('Deu ruim!', error);
//     });


// obterUsuario(function resolverUsuario(error, usuario) {
//     // null || " " || 0 === false
//     if(error) {
//         console.error('Deu ruim em USU�RIO', error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('Deu ruim em TELEFONE', error1);
//             return;
//         }
        
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('Deu ruim em ENDERE�O', error2);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endere�o: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         });
//     });
// });
// const telefone = obterTelefone(usuario.id);

// console.log('usuario', usuario);
// console.log('telefone', telefone);