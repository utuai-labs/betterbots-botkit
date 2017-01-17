import response from 'alexa-response';
import ear from './listener';
import { getTopBoards, getProductsByCategory } from './service';
import { SYSTEM, BOARDS, CLIPS } from './nlp';

ear.on('message_received', function(bot, message) {
  if (message.alexa.session.application.applicationId !== process.env.ALEXA_APPID) {
    bot.reply(message,
      response
        .fail(`Invalid applicationId: ${message.alexa.session.application.applicationId}`)
        .shouldEndSession(true)
    );
  }
});

ear.hears(SYSTEM.LAUNCH.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.LAUNCH.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Session Launch");
});

ear.hears(SYSTEM.START.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.START.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Session Start");
});

ear.hears(BOARDS.TOP_BOARDS.intents, ['message_received'], function(bot, message) {
  getTopBoards()
    .then((url) => {
      bot.reply(message,
        response
          .say(`you asked for all top boards ${url}`)
          .shouldEndSession(false)
      );
    });
    message.utu.event("Top Boards");
});

ear.hears(CLIPS.LIST_CATEGORIES.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(`Categories are as follows ${CLIPS.slotTypes.CATEGORIES.toString()}`)
      .reprompt('Please say, show then a category name for example show gifts')
      .shouldEndSession(false)
  );
  message.utu.event("Clip Categories");
});

ear.hears(CLIPS.CLIP_CATEGORIES.intents, ['message_received'], function(bot, message) {
  const category = message.alexa.getSlotValue('CATEGORY');
  if (category) {
    if (CLIPS.slotTypes.CATEGORIES.indexOf(category) > 0) {
      getProductsByCategory(category)
        .then((res) => {
          bot.reply(message,
            response
              .say(`Heard you want clips for the ${category}. ${res.url}`)
              .shouldEndSession(false)
          );
        });
      message.utu.event("Clip by Category", {
        values: {
          "Category": category,
        }
      });
    } else {
      bot.reply(message,
        response
          .ask(`Sorry, but ${category} is not a category.  Please try again.`)
          .reprompt(SYSTEM.HELP.responses.help)
          .shouldEndSession(false)
      );
      message.utu.event("Error - Clip Category");
    }
  } else {
    bot.reply(message,
      response
        .ask("Sorry, I didn't catach a category.  Can you repeat it please?")
        .shouldEndSession(false)
    );
    message.utu.event("Error - Clip Category");
  }
});

ear.hears(SYSTEM.HELP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.HELP.responses.intro)
      .say(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Help");
});

ear.hears(SYSTEM.STOP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.STOP.responses.goodbye)
      .shouldEndSession(true)
  );
  message.utu.event("Goodbye");
});
