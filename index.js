const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require('./database/database');
const perguntas = require('./database/Pergunta');
const respostas = require("./database/Resposta");

// database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// estou dizendo para o express usa o EJS como vizualizador.
app.set('view engine', 'ejs');
// usando arquivos estaticos no express
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    perguntas.findAll({ raw: true, order: [
        ['id', 'DESC'] // ASC = crescente && DESC = decrescente
    ] }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
    // e a msm coisa que select * from pergunta
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarPerguntas", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // mesma coisa que insert into
    perguntas.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    perguntas.findOne({
        where: {id: id}
    }).then(perguntas => {
        if(perguntas != undefined){ // pergunta achada
            respostas.findAll({
                where: {perguntaId: perguntas.id},
                order: [
                     ['id', 'DESC'] 
                ]
            }).then( respostas => {
                res.render("pergunta", {
                    perguntas: perguntas,
                    respostas: respostas
                });
            });    
        } else { // nao encontrada
            res.redirect("/");
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;
    respostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

app.listen(8080,()=> (console.log("app rodando")));