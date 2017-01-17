import Botkit, { facebookbot } from 'botkit';
import alexa from 'alexa-botkit';
import localtunnel from 'localtunnel';
import { uTu, constants } from 'utu';

// tag utu constants to app environment
const utu = new uTu(process.env.UTU_SECRET, {
  platform: constants.ALEXA,
  appId: process.env.ALEXA_APPID,
});
const FButu = new uTu(process.env.UTU_SECRET, {
  platform: constants.MESSENGER,
  appId: process.env.ALEXA_APPID,
});

// define ears...
export const alexaEars = alexa({
  debug: true,
});
export const facebookEars = facebookbot({
  access_token: process.env.FB_ACCESS_TOKEN,
  verify_token: process.env.FB_VERIFY_TOKEN,
});

// give tools to listen and communicate to the outside world
const alexaEarBuds = alexaEars.spawn({});
const facebookEarBuds = facebookEars.spawn({});

// start listening to your Alexa ears!
alexaEars.setupWebserver(process.env.PORT, (err, webserver) => {
  alexaEars.createWebhookEndpoints(webserver, alexaEarBuds);
  facebookEars.createWebhookEndpoints(webserver, facebookEarBuds);
  console.log(`ONLINE! ${process.env.PORT}`);
});

facebookEars.middleware.receive.use((bot, message, next) => {
  // instrament each message to have utu within the scope of each incoming message
  message.utu = FButu.withContext(
    {
      platformId: message.user,
      sessionId: message.channel,
    }
  );
  console.log("message receive post: ", message);

  // on any message that comes through send the message to utu
  message.utu.message({
    values: {
      message: message.text,
      rawMessage: {
        text: message.text,
      },
      botMessage: false,
    }
  });
  next();
});

// creating a middleware that adds the utu context to each incoming request
alexaEars.middleware.receive.use((bot, message, next) => {
  // instrament each message to have utu within the scope of each incoming message
  message.utu = utu.withContext(
    {
      platformId: message.user,
      sessionId: message.alexa.getSessionId(),
    }
  );

  // on any message that comes through send the message to utu
  message.utu.message({
    values: {
      message: message.alexa.getIntentName(),
      rawMessage: message.alexa,
      botMessage: false,
    }
  });

  if (!message.response.req.headers.signaturecertchainurl) {
    return next();
  }

  // Mark the request body as already having been parsed so it's ignored by // other body parser middlewares.
  message.response.req._body = true;
  message.response.req.rawBody = '';
  message.response.req.on('data', function(data) {
    return message.response.req.rawBody += data;
  });
  message.response.req.on('end', () => {
    var cert_url, er, error, requestBody, signature;
    try {
      message.response.req.body = JSON.parse(message.response.req.rawBody);
    } catch (error) {
      er = error;
      message.response.req.body = {};
    }
    cert_url = message.response.req.headers.signaturecertchainurl;
    signature = message.response.req.headers.signature;
    requestBody = message.response.req.rawBody;
    verifier(cert_url, signature, requestBody, function(er) {
      if (er) {
        console.error('error validating the alexa cert:', er);
        message.response.req.res.status(401).json({ status: 'failure', reason: er });
      } else {
        next();
      }
    });
  });
  next();
});

facebookEars.middleware.send.use(function(bot, message, next) {
  // on any outgoing message log the message being sent back to the user
  // console.log("send bot: ", bot);
  console.log("send middle: ", message);
  // console.log("send middle text: ", message.text);
  // message.utu.message({
  //   values: {
  //     message: 'message from FB messenger',
  //     rawMessage: 'message from FB messenger',
  //     botMessage: true,
  //   }
  // });
  next();
});

alexaEars.middleware.send.use(function(bot, message, next) {
  // on any outgoing message log the message being sent back to the user
  message.src.utu.message({
    values: {
      message: message.resp.state.response.outputSpeech.text,
      rawMessage: message.resp,
      botMessage: true,
    }
  });
  next();
});
