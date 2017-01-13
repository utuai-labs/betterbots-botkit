import response from 'alexa-response';
import ear from './listener';
import { getTopBoards, getProductsByCategory } from './service';
import { SYSTEM, BOARDS, CLIPS } from './nlp';

ear.on('message_received', function(bot, message) {
  console.log("on");
});

ear.hears(SYSTEM.LAUNCH.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.LAUNCH.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
});

ear.hears(SYSTEM.START.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.START.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
});

ear.hears(BOARDS.TOP_BOARDS.intents, ['message_received'], function(bot, message) {
  getTopBoards()
    .then((url) => {
      bot.reply(message,
        response
          .say("you asked for all top boards " + url)
          .shouldEndSession(false)
      );
    });
});

ear.hears(CLIPS.LIST_CATEGORIES.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say('Categories are as follows: ', CLIPS.slotTypes.CATEGORIES.toString())
      .shouldEndSession(false)
  );
});

ear.hears(CLIPS.CLIP_CATEGORIES.intents, ['message_received'], function(bot, message) {
  const category = message.alexa.getSlotValue('CATEGORY');
  if (category) {
    getProductsByCategory(category)
      .then((res) => {
        bot.reply(message,
          response
            .say("Heard you want clips for the " + category + " category. " + res.url)
            .shouldEndSession(false)
        );
      });
  } else {
    bot.reply(message,
      response
        .ask("Sorry, I didn't catach a category.  Can you repeat it please?")
        .shouldEndSession(false)
    );
  }
});

ear.hears(SYSTEM.HELP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.HELP.responses.intro)
      .say(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
});

ear.hears(SYSTEM.STOP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.STOP.responses.goodbye)
      .shouldEndSession(true)
  );
});
