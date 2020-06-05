// importando o express da pasta node_modules
// Retornará uma função
const express = require("express")
// Aqui executamos a função retornada a cima
// Esta função retorna um objeto
const server = express()


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
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})




// ligando o servidor
// a função listen() faz parte do objeto do express
server.listen(3000)
