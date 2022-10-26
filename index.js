const express = require("express");
const app = express();

// estou dizendo para o express usa o EJS como vizualizador.
app.set('view engine', 'ejs');

// usando arquivos estaticos no express
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")
})

app.listen(8080,()=> (console.log("app rodando")));