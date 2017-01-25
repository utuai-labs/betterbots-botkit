export const BOARDS = {
  TOP_BOARDS: {
    intents: ['GetTopBoards', 'boards', 'show me boards', 'show boards', 'list boards'],
    slots: [],
    utterances: [
      '{-|list|show|show me} {-|top} boards',
    ],
  },
};

export const CLIPS = {
  LIST_CATEGORIES: {
    intents: ['GetCategoryList', 'categories', 'list categories', 'show categories', 'show me categories'],
    slots: [],
    utterances: [
      '{-|list|what|show me} {-|are} {-|the} categories',
    ],
  },
  CLIP_CATEGORIES: {
    intents: ['GetCategoryClips', 'list (.*)', 'show (.*)', 'show me (.*)', 'show products for (.*)'],
    slots: {
      CATEGORY: 'CATEGORIES',
    },
    utterances: [
      '{-|list|show|show me} {-|products for} {-|CATEGORIES}',
    ],
  },
  slotTypes: {
    CATEGORIES: [
      'womens fashion', 'mens fashion', 'kids and baby', 'home', 'gifts',
      'health and beauty', 'sports and fitness', 'travel and events',
      'crafts and diy', 'electronics'
    ],
  },
}

export const IDENTITY = {
  LOGIN: {
    intents: ['LoginIntent', 'login (.*)', 'login with (.*)'],
    slots: {
      EMAIL: "string",
    },
    utterances: [
      'login {-|EMAIL}',
    ],
    responses: {
      update: `We've added that email address to your account.`,
    },
  },
}

export const SYSTEM = {
  HELP: {
    intents: ['AMAZON.HelpIntent', 'help'],
    slots: [],
    utterances: [],
    responses: {
      intro: `Mavenx.com is a social shopping sharing platform where users build
        collections of their favorite items to share with their social
        networks.`,
      help: `You can use this bot to browse the top boards by saying "show me
        boards".  Likewise you can browse products by category by saying "show me
        Gifts".  If you need a list of categories, just say "list categories"`,
    },
  },
  LAUNCH: {
    intents: ['LaunchRequest', 'facebook_optin'],
    slots: [],
    utterances: [],
    responses: {
      greeting: `Welcome to mavenx.com!`,
    }
  },
  START: {
    intents: ['AMAZON.StartOverIntent', 'Hello'],
    slots: [],
    utterances: [],
    responses: {
      greeting: `Would you like to browse boards? or products by category?`,
    }
  },
  STOP: {
    intents: ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'quit', 'exit', 'bye', 'thanks'],
    slots: [],
    utterances: [],
    responses: {
      goodbye: 'Goodbye!  Visit us online at mavenx.com',
    },
  },
}
