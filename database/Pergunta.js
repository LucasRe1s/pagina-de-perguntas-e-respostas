const sequelize = require('sequelize');
const connection = require('./database');

// estruturação da tabela
const Perguntas = connection.define('perguntas', {
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    }
});

//criação da tabela
Perguntas.sync({force: false}).then(() => {});

//Model é uma representação da sua tabela feita em codigo js.
module.exports = Perguntas;