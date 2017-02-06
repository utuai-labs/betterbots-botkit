import response from 'alexa-response';
import ear from './listener';

ear.on('message_received', function(bot, message) {
  console.log("Message Received", message);
});
