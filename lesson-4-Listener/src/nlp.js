export const BOARDS = {
  intents: {
    TOP_BOARDS: {
      intent: ['GetTopBoards'],
      slots: [],
      utterances: [
        '{-|list|show|show me} {-|top} boards',
      ],
    },
  },
};

export const CLIPS = {
  intents: {
    LIST_CATEGORIES: {
      intent: ['GetCategoryList'],
      slots: [],
      utterances: [
        '{-|list|what|show me} {-|are} {-|the} categories',
      ],
    },
    CLIP_CATEGORIES: {
      intent: ['GetCategoryClips'],
      slots: {
        CATEGORIES: 'CATEGORIES',
      },
      utterances: [
        '{-|list|show|show me} {-|products for} {-|CATEGORIES}',
      ],
    },
  },
  slotTypes: {
    CATEGORIES: [
      'womens fashion', 'mens fashion', 'kids and baby', 'home', 'gifts',
      'health and beauty', 'sports and fitness', 'travel and events',
      'crafts and diy', 'electronics'
    ],
  },
}

export const SYSTEM = {
  intents: {
    START: {
      intent: ['LaunchRequest', 'AMAZON.StartOverIntent'],
      slots: [],
      utterances: [],
      responses: {
        greeting: `Would you like to browse boards? or products by category?`,
      }
    },
    HELP: {
      intent: ['AMAZON.HelpIntent'],
      slots: [],
      utterances: [],
      responses: {
        help: `Mavenx.com is a social shopping sharing platform where users build
          collections of their favorite items that they then share with their social
          networks.  You can use this bot to browse the top boards by saying "show me
          boards".  Likewise you can browse products by category by saying "show me
          Gifts".  If you need a list of categories, just say "list categories"`,
      },
    },
    STOP: {
      intent: ['AMAZON.CancelIntent', 'AMAZON.StopIntent', 'quit', 'exit', 'bye', 'thanks'],
      slots: [],
      utterances: [],
      responses: {
        goodbye: 'Goodbye!  Visit us online at mavenx.com',
      },
    },
  },
}

export default SYSTEM, BOARDS, CLIPS;
