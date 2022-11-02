const sequelize = require('sequelize');
const connection = require('./database');

// estruturação da tabela
const Respostas = connection.define('respostas', {
    corpo: {
        type: sequelize.STRING,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

//criação da tabela
Respostas.sync({force: false});

//Model é uma representação da sua tabela feita em codigo js.
module.exports = Respostas;