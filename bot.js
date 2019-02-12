var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('bip is now online!');
    bot.setPresence({
		game: {
		   name: "bib's game hoster assistant, start command with " + '"bip"',
			   type: 0
		}
    });
});
function getJSON(url) {
    var resp;
    var xmlHttp;

    resp = '';

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    xmlHttp = new XMLHttpRequest();

    if(xmlHttp != null){
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }

    return resp;
}

bot.on('message', function (user, userID, channelID, message, event) {
	if(message.substring(0, 3) == 'bip'){
		var msg = message.toLowerCase();
		var command = msg.substring(4);
		
		if(command == 'hi') {
			bot.sendMessage({
				to: channelID,
				message: "hi"
			});
		}
		if(command.substring(0, 17) == 'anonymous message'){
			var names = 'Kenneth, Bill, bib, Omid, Ken, Kenny, Yun Fan, Kelvin, Michael, Orlando, Alex, DeDeDe bot, Riche';
			var namearray = names.split(', ');
			var mess = command.substring(command.indexOf('{') + 1, command.indexOf('}'));
			var users = '<@';
			
			var randex = Math.floor(Math.random() * namearray.length);
			
			if(command.includes('<@') && command.includes('>') && command.indexOf('<@') < command.indexOf('>')){
				users += command.substring(command.indexOf('<@')+2, command.indexOf('>'));
				users += '>';
			} else {
				users = 'message:';
			}
			bot.sendMessage({
				to: '544692216011030533',
				message: users + '\n' + mess + '\nsent by ' + namearray[randex]
			});
			bot.deleteMessage({
				channelID: channelID,
				messageID: event.d.id
			});
		}
	}
});