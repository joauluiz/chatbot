import * as db from './db.js'

function getRandomDate(daysAgo) {
    const end = new Date(); // current date
    const start = new Date();
    start.setDate(end.getDate() - daysAgo); // set start date to 'daysAgo' days before current date

    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0]; // format as 'YYYY-MM-DD'
}


function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomValue() {
    return (Math.random() * 1000).toFixed(2); // generate a random value up to 1000 with two decimal places
}

function generateRandomTransaction(diasAtras) {
    const tiposTransacao = ['PIX', 'CAMBIO', 'ESTORNO', 'INVESTIMENTO', 'TRANSFERENCIA', 'PAGAMENTO','BOLETO_COBRANCA', 'OUTROS'];
    const tiposOperacao = ['crédito', 'débito'];
    const titulos = ['loja1', 'loja2', 'loja3', 'loja4'];
    const descricoes = ['alimentação', 'saúde', 'transporte', 'lazer'];

    return {
        cpmf: Math.random().toString(36).substring(2, 15), // random string
        dataEntrada: getRandomDate(diasAtras),
        tipoTransacao: getRandomItem(tiposTransacao),
        tipoOperacao: getRandomItem(tiposOperacao),
        valor: getRandomValue(),
        titulo: getRandomItem(titulos),
        descricao: getRandomItem(descricoes)
    };
}

export function generateTransactions(num, daysAgo) {
    let transactions = [];
    for (let i = 0; i < num; i++) {
        transactions.push(generateRandomTransaction(daysAgo));
    }
    return { transacoes: transactions };
}

// Generate 5 random transactions
//var json = generateTransactions(15,7);

//json = JSON.stringify(json, null, 2);

//db.InserirDadoDb(json);

//console.log(json);