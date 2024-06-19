import * as db from './db.js';
import * as jsonn from './json.js';
// import * as api from './api_resquest.js';
import * as tratamento from './dataTreatment.js';
import dfd from 'danfojs';

export async function runData(num) {
    let x;
    let dias;

    if (num == 1){
        if (num == 1) {
            //Chamaria a API caso ela estivesse disponível para o saldo e continuaria o código, mas irá retornar um valor aleatório entre 0 e 5000
            let saldo = (Math.random() * 5000).toFixed(2); // Gera e arredonda para 2 casas decimais
            saldo = saldo.replace('.', ','); // Substitui o ponto pela vírgula
            return "Seu saldo no momento é: R$ ".concat(saldo);
    }}
    else if (num == 2) {
        dias = 7;
    } else if (num == 3) {
        dias = 15;
    } else if (num == 4) {
        dias = 30;
    } else if (num == 5) {
        dias = 90;
    }

    // Chama a API caso ela estivesse disponível
    var json_result = jsonn.generateTransactions(20, dias);
    json_result = JSON.stringify(json_result, null, 2);

    // Insere os dados no banco de dados
    await db.InserirDadoDb(json_result);

    async function obterLinhas() {
        try {
            // Espera o resultado da função assíncrona
            let resultado = await tratamento.TratarDadosDb();
            var df = resultado;
            const y = df.columns.length;
            x = df.shape[0];
            
            // Processa o resultado e converte para string
            var str_resultado = tratamento.dataframeToString(resultado);
            
            // Retorna a string resultante
            return str_resultado;
        } catch (error) {
            // Em caso de erro, lança uma exceção
            throw new Error("Erro ao obter linhas: " + error.message);
        }
    }
    
    try {
        const str_resultado = await obterLinhas();
        return str_resultado;
    } catch (error) {
        console.error("Erro:", error);
        throw error;
    }
}

// Função auto-executável para chamar runData com await
