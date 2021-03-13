//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');//body parser transforma de formato json para um arquivo interno do sistema operacional
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3030;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3030);


let id =2;

let livros = [{//vetor de json = [],  json = {}
        id: 1,
        titulo: "Lógica de programação",//atributos
        descricao: "Este livro ajudará os alunos com o conceito da lógica",//atributos
        edicao: "3º",
        autor: "Rafael F. M. Leite",
        isbn: "123456"
    },
    {
        id: 2,
        titulo: "Programação web",
        descricao: "Este livro ajudará os alunos com o conceito de web",
        edicao: "2º",
        autor: "J. K. Rowling",
        isbn: "456789"
    }
];

//tratamento de requisições POST
app.post("/livros", (req, res, next) => {
    const livro = {//constante chamada livro, constante nao pode ser alterada, depois q é aplicada um valor(uma atribuiçao) para a const, ela nao pode mais ser alterada
        id: id += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor,
        isbn: req.body.isbn
    }
    livros.push(livro)
    res.status(201).json(livros);
});
//tratamento de requisições GET
app.get("/livros", (req, res, next) => { //"/ivros" =  endereço 
    res.status(200).json(livros); //retorna json de livros
})
//tratamento de requisições PUT
app.put("/livros", (req, res, next) => {
    livros.forEach((livro) => {
        if (livro.id === req.body.id) {
            livro.titulo = req.body.titulo
            livro.descricao = req.body.descricao
            livro.edicao = req.body.edicao
            livro.autor = req.body.autor
            livro.isbn = req.body.isbn
        }
    })
    res.status(204).end();
});

//tratamento de requisições DELETE
app.delete("/livros/:id", (req, res, next) => {
    const idLivroDeletado = req.params.id; 
    livros.forEach((livro,index) => {
        if(livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    res.status(200).json(livros);
})

app.delete("/livros",(req,res, next) => {
    livros.forEach(livro =>{
        if(livro.id === req.body.id)
        {
            const index = livros.indexOf(livro, 0)
            livros.splice(index, 1)
        }
    })
    res.status(200).json(livros);
})