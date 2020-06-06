// Importar a dependencia do sqlite3
// O require retorna uma objeto, e aqui estamos acessando um dado dele
const sqlite3 = require("sqlite3").verbose()
// a função verbose() faz com que possamos ver as mensagens no terminal

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// utilizar o objeto de banco de dados, para nossas operações
// função serialize() roda uma sequência de código
db.serialize( () => {

    // Com comando SQL eu vou:

    // 1 Criar uma tabela
        // A função run() roda o código
        // Tem que usar crase, aspas da um bug na quebra de linha
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // 2 Inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values =  [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(`Erro ao inserir dados na tabela ${err}`)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        // this é um argumento que mostra o retorno da função run()
    }

    // db.run(query, values, afterInsertData) 
        // Primeiro argumento é a query
        // O segundo é um array que iremos fazer a troca dos ?,?,...
        // O terceiro argumento é uma função de callback que vai ser executada assim que rodar o código

    // 3 Consultar os dados da tabela
    const querySelect = `SELECT * FROM places`
    function afterSelectData(err, rows) {
        if(err) {
            return console.log(`Erro ao consultar dados na tabela ${err}`)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows);
    }

    // db.all(querySelect, afterSelectData)
    // Primeiro argumento query SQL
    // Segundo argumento um function de callback


    // 4 Deletar um dado da tabela
    const queryDelete = `DELETE FROM places WHERE id = ?`
    const valuesDelete = [2]
    function afterDeleteData(err) {
        if(err) {
            return console.log(`Erro ao deletar dados na tabela ${err}`)
        }

        console.log("Registro deletado com sucesso")
    }

    // db.run(queryDelete, valuesDelete , afterDeleteData)
        // Quando usamos ?, precisamos passar uma coleção com todas as trocas, no caso apenas um
})

module.exports = db