'use strict';

var _botkit = require('botkit');

var _botkit2 = _interopRequireDefault(_botkit);

var _utu = require('utu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uTu = new _utu.Client(process.env.UTU_KEY);

if (!process.env.TOKEN) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = _botkit2.default.slackbot({
  debug: false
});

controller.spawn({
  token: process.env.TOKEN
}).startRTM(function (err) {
  if (err) {
    throw new Error(err);
  }
});

controller.middleware.receive.use(function (bot, message, next) {
  if (message.type === 'message') {
    uTu.message({
      platform: _utu.constants.SLACK,
      platformId: message.user,
      values: {
        message: message.text,
        sessionId: message.user,
        rawMessage: message,
        botMessage: false
      }
    });

    bot.api.users.info({ user: message.user }, function (err, info) {
      uTu.user({
        platform: _utu.constants.SLACK,
        platformId: message.user,
        values: {
          email: info.user.profile.email,
          firstName: info.user.profile.first_name,
          lastName: info.user.profile.last_name,
          image: info.user.profile.image_original,
          timezone: info.user.profile.tz_label
        }
      });
    });
  }
  next();
});

controller.hears(['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
  var reply = 'Hello.';
  bot.reply(message, reply);
  uTu.message({
    platform: _utu.constants.SLACK,
    platformId: message.user,
    values: {
      message: message.text,
      sessionId: message.user,
      rawMessage: reply,
      botMessage: true
    }
  });
});

controller.hears(['attach'], ['direct_message', 'direct_mention'], function (bot, message) {
  var attachments = [];
  var attachment = {
    title: 'This is an attachment',
    color: '#FFCC99',
    fields: []
  };

  attachment.fields.push({
    label: 'Field',
    value: 'A longish value',
    short: false
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true
  });

  attachment.fields.push({
    label: 'Field',
    value: 'Value',
    short: true
  });

  attachments.push(attachment);

  var msg = {
    text: 'See below...',
    attachments: attachments
  };

  bot.reply(message, msg);

  uTu.message({
    platform: _utu.constants.SLACK,
    platformId: message.user,
    values: {
      message: msg.text,
      sessionId: message.user,
      rawMessage: msg,
      botMessage: true
    }
  });
});