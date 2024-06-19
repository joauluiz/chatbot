import * as perg from './perguntas.js';
import Whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth } = Whatsapp
import qrcode from 'qrcode-terminal';
import * as exec from './execution.js';


var number = 0

// Inicializando o bot e geração do QrCode, possui autenticação


const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        },
    authStrategy: new LocalAuth({
        dataPath: '.wwebjs_auth'
    })
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

await client.initialize();

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

var varr = 0;
var msg_encerramento;

export async function temporizador(chatIdd){

    clearTimeout(msg_encerramento)

    msg_encerramento = setTimeout(function(){

        client.sendMessage(chatIdd, 'Sessão encerrada, 20 segundos sem resposta.')
        console.log("Passou")
        varr=0;
    }, 20000);

}


client.on('message', async message => {

    //console.log(message.body);

    var mensagem = parseInt(message.body);

    console.log(mensagem)
    
    const number = "+" + await (await message.getContact()).number
    
    const chatId = number.substring(1) + "@c.us";
    
    //console.log(chatId)
    //Condição sempre atendida para mensagem de boas-vindas
    if (varr==0) {
        client.sendMessage(chatId, perg.fazerPrimeiraPergunta());
        await temporizador(chatId);
        varr = varr + 1;
        
    //Condição caso o usuário digite o número 1, que é o pedido de verificação do saldo e tem um procedimento diferente caso fosse extrato
    } else if (varr != 0 && [1].includes(mensagem)) {
        client.sendMessage(chatId, 'Aguarde enquanto processamos sua requisição.\n');
        var resultado_final = await exec.runData(mensagem)
        client.sendMessage(chatId, resultado_final);
        client.sendMessage(chatId, 'Gostaria de mais alguma coisa?');
        await temporizador(chatId)
    }

    //Condição caso o usuário digite um número no intervalo [2,5], para verificação do extrato
    else if (varr != 0 && [2, 3, 4, 5].includes(mensagem)) {
            client.sendMessage(chatId, 'Aguarde enquanto processamos sua requisição.\n');
            var resultado_final = await exec.runData(mensagem)
            client.sendMessage(chatId, 'O resultado da sua consulta é:\n'.concat(resultado_final));
            client.sendMessage(chatId, 'Gostaria de mais alguma coisa?');
            await temporizador(chatId)
        }

    //Condição caso seja digitado algo não válido
    else {
        client.sendMessage(chatId, perg.fazerPerguntaCasoUsuarioErrou());
        await temporizador(chatId);
    }})



// Estado da conversa é como não iniciada, ele entrará dentro do looping

 

//Pegar o número 




