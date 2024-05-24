const { Client } = require('whatsapp-web.js')

client.on('message_create', message => {
	console.log(message.body);
});