// importando o express da pasta node_modules
// Retornará uma função
const express = require("express")
// Aqui executamos a função retornada a cima
// Esta função retorna um objeto
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// hanilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Configurando pasta publica "PUBLIC" - fazendo com que vá direto para a subpasta "ignorando" a pasta mãe
// sempre que eu usar a função use() estou fazendo uma configuração no servidor
server.use(express.static("public"))


// utilizando template engine
// importando o nunjucks do node_modules
const nunjucks = require("nunjucks")

// Primeiro argumento é a pasta onde está o html
// Segundo argumento é um objeto
nunjucks.configure("src/views", {
    express: server, // ligando o nunjucls ao express
    noCache: true // retirando o salvamento no cash para evitar bugs front-end
})


// configurando caminhos da minha aplicação
// página inical
server.get("/", (req, res) => {
    // req: requisição
    // res: resposta
    return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" });
    // render() faz com que passe pelo nunjucks antes de retornar o html
    // primeiro agumento é a página, segundo argumento é um objeto com a variável criada no html
    // __dirname fala qual é o diretório que estou
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings da nossa url - mostra dos dados enviados pelo url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário - mostra os dados enviados por POST
    // console.log(req.body)


    // inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            // Erro aparece no console server
            console.log(`Erro ao inserir dados na tabela ${err}`)
            // Tratamento de erro para o usuário
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)
        // this é um argumento que mostra o retorno da função run()

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)   
})


server.get("/search", (req, res) => {


    const search = req.query.search
    
    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }
    
    // pegar os dados do banco de dados
        // Like % % - faz com que podemos pegar algo parecido
        const querySelect = `SELECT * FROM places WHERE city Like '%${search}%'`
        function afterSelectData(err, rows) {
            if(err) {
                return console.log(`Erro ao consultar dados na tabela ${err}`)
            }

            // console.log("Aqui estão seus registros: ")
            // console.log(rows);

            // total pontos encontrados da página search
            const total = rows.length


            // Levando o resultado da busca (array "rows") para a pagina search-results
            return res.render("search-results.html", { places: rows, total: total })
        }

        db.all(querySelect, afterSelectData)
})




// ligando o servidor
// a função listen() faz parte do objeto do express
server.listen(3000)
