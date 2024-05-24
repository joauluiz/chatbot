import {Client} from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

export function executarQRCode(){
    const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
  });

//const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.initialize();}



// client.on('message_create', message => {
// 	console.log(message.from);
// });


