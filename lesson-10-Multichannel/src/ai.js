import response from 'alexa-response';
import { alexaEars, facebookEars } from './listener';
import { getTopBoards, getProductsByCategory } from './service';
import { SYSTEM, BOARDS, CLIPS } from './nlp';

alexaEars.on('message_received', function(bot, message) {
  if (message.alexa.session.application.applicationId !== process.env.ALEXA_APPID) {
    bot.reply(message,
      response
        .fail(`Invalid applicationId: ${message.alexa.session.application.applicationId}`)
        .shouldEndSession(true)
    );
  }
});

facebookEars.hears(SYSTEM.LAUNCH.intents, ['message_received'], function(bot, message) {
  bot.reply(message, SYSTEM.LAUNCH.responses.greeting);
  message.utu.event("Session Launch");
});

alexaEars.hears(SYSTEM.LAUNCH.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.LAUNCH.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Session Launch");
});

alexaEars.hears(SYSTEM.START.intents, ['message_received'], function(bot, message) {
  bot.reply(message, SYSTEM.START.responses.greeting);
  message.utu.event("Session Start");
});

alexaEars.hears(SYSTEM.START.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(SYSTEM.START.responses.greeting)
      .reprompt(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Session Start");
});

facebookEars.hears(BOARDS.TOP_BOARDS.intents, ['message_received'], function(bot, message) {
  getTopBoards()
    .then((url) => {
      bot.reply(message, `you asked for all top boards ${url}`);
    });
    message.utu.event("Top Boards");
});

alexaEars.hears(BOARDS.TOP_BOARDS.intents, ['message_received'], function(bot, message) {
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

facebookEars.hears(CLIPS.LIST_CATEGORIES.intents, ['message_received'], function(bot, message) {
  bot.reply(message, `Categories are as follows ${CLIPS.slotTypes.CATEGORIES.toString()}`);
  message.utu.event("Clip Categories");
});

alexaEars.hears(CLIPS.LIST_CATEGORIES.intents, ['message_received'], function(bot, message) {
  bot.reply(message,
    response
      .say(`Categories are as follows ${CLIPS.slotTypes.CATEGORIES.toString()}`)
      .reprompt('Please say, show then a category name for example show gifts')
      .shouldEndSession(false)
  );
  message.utu.event("Clip Categories");
});

facebookEars.hears(CLIPS.CLIP_CATEGORIES.intents, ['message_received'], function(bot, message) {
  const category = message.match[1];
  if (category) {
    if (CLIPS.slotTypes.CATEGORIES.indexOf(category) > 0) {
      getProductsByCategory(category)
        .then((res) => {
          bot.reply(message, `Heard you want clips for the ${category}. ${res.url}`);
        });
      message.utu.event("Clip by Category", {
        values: {
          "Category": category,
        }
      });
    } else {
      bot.reply(message, `Sorry, but ${category} is not a category.  Please try again.`);
      message.utu.event("Error - Clip Category");
    }
  } else {
    bot.reply(message, "Sorry, I didn't catach a category.  Can you repeat it please?");
    message.utu.event("Error - Clip Category");
  }
});

alexaEars.hears(CLIPS.CLIP_CATEGORIES.intents, ['message_received'], function(bot, message) {
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

facebookEars.hears(SYSTEM.HELP.intents, ['message_received'], (bot, message) => {
  bot.reply(message, SYSTEM.HELP.responses.intro);
  message.utu.event("Help");
});

alexaEars.hears(SYSTEM.HELP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.HELP.responses.intro)
      .say(SYSTEM.HELP.responses.help)
      .shouldEndSession(false)
  );
  message.utu.event("Help");
});

facebookEars.hears(SYSTEM.STOP.intents, ['message_received'], (bot, message) => {
  bot.reply(message, SYSTEM.STOP.responses.goodbye);
  message.utu.event("Goodbye");
});

alexaEars.hears(SYSTEM.STOP.intents, ['message_received'], (bot, message) => {
  bot.reply(message,
    response
      .say(SYSTEM.STOP.responses.goodbye)
      .shouldEndSession(true)
  );
  message.utu.event("Goodbye");
});
