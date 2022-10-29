const sequelize = require('sequelize');
const connection = require('./database');

// estruturação da tabela
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

//Model é uma representação da sua tabela feita em codigo js.
module.exports = Pergunta;