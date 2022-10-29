const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require('./database/database');
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
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
});

app.post("/salvarPerguntas", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    // mesma coisa que insert into
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080,()=> (console.log("app rodando")));