import Botkit from 'botkit';
import alexa from 'alexa-botkit';
import localtunnel from 'localtunnel';
import { uTu, constants } from 'utu';

// tag utu constants to app environment
const utu = new uTu(process.env.UTU_SECRET, {
  platform: constants.ALEXA,
  appId: process.env.ALEXA_APPID,
});

// define ears for Alexa
const ears = alexa({
  debug: true,
});

// give alexa the tools to listen and communicate to the outside world
const earBuds = ears.spawn({});

// start listening to your Alexa ears!
ears.setupWebserver(process.env.PORT, (err, webserver) => {
  ears.createWebhookEndpoints(webserver, earBuds, () => {
      console.log(`ONLINE! ${process.env.PORT}`);
  });
});

// creating a middleware that adds the utu context to each incoming request
ears.middleware.receive.use((bot, message, next) => {
  console.log("message - middleware: ", message);

  // if (!req.headers.signaturecertchainurl) {
  //   return next();
  // }

  // Mark the request body as already having been parsed so it's ignored by // other body parser middlewares.
  // message._body = true;
  // message.rawBody = '';
  // message.on('data', function(data) { return req.rawBody += data; });
  // req.on('end', function() {
  //   var cert_url, er, error, requestBody, signature;
  //   try {
  //     req.body = JSON.parse(req.rawBody);
  //   } catch (error) {
  //     er = error;
  //      req.body = {};
  //   }
  //   cert_url = req.headers.signaturecertchainurl;
  //   signature = req.headers.signature;
  //   requestBody = req.rawBody;
  //   verifier(cert_url, signature, requestBody, function(er) {
  //     if (er) {
  //       console.error('error validating the alexa cert:', er);
  //       res.status(401).json({ status: 'failure', reason: er });
  //     } else {
  //       next();
  //     }
  //   });
  // });

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
  next();
});

ears.middleware.send.use(function(bot, message, next) {
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

export default ears;
