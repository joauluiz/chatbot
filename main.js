import * as perg from './perguntas.js';
import Whatsapp from 'whatsapp-web.js'
const { Client, LocalAuth } = Whatsapp
import qrcode from 'qrcode-terminal';
import * as tempo from './tempo.js'


var number = 0
var temp = 1

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

//const client = new Client();

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

export async function temporizador(){

    clearTimeout(msg_encerramento)

    msg_encerramento = setTimeout(function(){
        const number = "+554299954138"
    
        const chatId = number.substring(1) + "@c.us";
        client.sendMessage(chatId, 'Sessão encerrada, 20 segundos sem resposta.')
        console.log("Passou")
        varr=0;
    }, 20000);

}



// client.on('message_create', message => {
// 	console.log(message.body);
//     });

client.on('message', async message => {

    console.log(message.body);

    var mensagem = parseInt(message.body);
    
    const number = "+554299954138"
    
    const chatId = number.substring(1) + "@c.us";

    temp = await temporizador()

    if (varr==0) {
        client.sendMessage(chatId, perg.fazerPrimeiraPergunta());
        varr = varr + 1;
        

    }
    else if (varr != 0 && mensagem in [0,1,2,3,4,5]) {
            client.sendMessage(chatId, 'O resultado da primeira consulta é x');
            client.sendMessage(chatId, 'Intervalo de 90 segundos, gostaria de mais alguma coisa?');
        }
    else {
        client.sendMessage(chatId, perg.fazerPerguntaCasoUsuarioErrou());
        //temp = tempo.temporizador()};




    
            //client.sendMessage(chatId, 'teste');
    }})



// Estado da conversa é como não iniciada, ele entrará dentro do looping

 

//Pegar o número 




