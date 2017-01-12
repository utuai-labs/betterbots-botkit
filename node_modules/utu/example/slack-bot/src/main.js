import Botkit from 'botkit';
import { Client, constants } from 'utu';

const uTu = new Client(process.env.UTU_KEY);

if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: false,
});

controller.spawn({
  token: process.env.TOKEN,
}).startRTM((err) => {
  if (err) {
    throw new Error(err);
  }
});

controller.middleware.receive.use((bot, message, next) => {
  if (message.type === 'message') {
    // log the incoming message
    uTu.message({
      platform: constants.SLACK,
      platformId: message.user,
      values: {
        message: message.text,
        sessionId: message.user,
        rawMessage: message,
        botMessage: false,
      },
    });

    // find the users information
    bot.api.users.info({ user: message.user }, (err, info) => {
      // log the users information
      uTu.user({
        platform: constants.SLACK,
        platformId: message.user,
        values: {
          email: info.user.profile.email,
          firstName: info.user.profile.first_name,
          lastName: info.user.profile.last_name,
          image: info.user.profile.image_original,
          timezone: info.user.profile.tz_label,
        },
      });
    });
  }
  next();
});

controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
  const reply = 'Hello.';
  bot.reply(message, reply);
  uTu.message({
    platform: constants.SLACK,
    platformId: message.user,
    values: {
      message: message.text,
      sessionId: message.user,
      rawMessage: reply,
      botMessage: true,
    },
  });
});

controller.hears(['attach'], ['direct_message', 'direct_mention'], (bot, message) => {
  const attachments = [];
  const attachment = {
    title: 'This is an attachment',
    color: '#FFCC99',
    fields: [],
  };

  attachment.fields.push({
    label: 'Field',
    value: 'A longish value',
    short: false,
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true,
  });

  attachments.push(attachment);

  const msg = {
    text: 'See below...',
    attachments,
  };

  bot.reply(message, msg);

  uTu.message({
    platform: constants.SLACK,
    platformId: message.user,
    values: {
      message: msg.text,
      sessionId: message.user,
      rawMessage: msg,
      botMessage: true,
    },
  });
});
