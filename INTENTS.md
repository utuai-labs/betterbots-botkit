## Custom Slot Types

### CATEGORIES

```
'womens fashion'
'mens fashion'
'kids and baby'
'home'
'gifts'
'health and beauty'
'sports and fitness'
'travel and events'
'crafts and diy'
'electronics'
```

### EMAILS

```
john
john@yahoo.com
jim@google.com
```


## Intent Schema

```
{
  "intents": [
        {
      "intent": "AMAZON.CancelIntent",
      "slots": []
    },
    {
      "intent": "AMAZON.StopIntent",
      "slots": []
    },
    {
      "intent": "AMAZON.HelpIntent",
      "slots": []
    },
    {
      "intent": "exit",
      "slots": []
    },
    {
      "intent": "AMAZON.StartOverIntent",
      "slots": []
    },
    {
      "intent": "GetTopBoards"
    },
    {
      "intent": "GetCategoryList"
    },
    {
      "intent": "GetCategoryClips",
      "slots": [
        {
          "name": "CATEGORY",
          "type": "CATEGORIES"
        }
      ]
    },
    {
      "intent": "LoginIntent",
      "slots": [
        {
          "name": "EMAIL",
          "type": "EMAILS"
        }
      ]
    }
  ]
}
```

## Sample Utterances

```
GetTopBoards  boards
GetTopBoards  top boards
GetTopBoards  list top boards
GetTopBoards  show top boards
GetTopBoards  show me top boards
GetTopBoards  list boards
GetTopBoards  show boards
GetTopBoards  show me boards
GetCategoryList  categories
GetCategoryList  list the categories
GetCategoryList  list categories
GetCategoryList  what are the categories
GetCategoryList  what categories
GetCategoryList  show me the categories
GetCategoryList  show me categories
GetCategoryClips  {CATEGORY}
GetCategoryClips  products for {CATEGORY}
GetCategoryClips  show me {CATEGORY}
GetCategoryClips  show me products for {CATEGORY}
GetCategoryClips  show {CATEGORY}
GetCategoryClips  show products for {CATEGORY}
GetCategoryClips  list {CATEGORY}
GetCategoryClips  list products for {CATEGORY}
AMAZON.HelpIntent	help
AMAZON.StopIntent	quit
AMAZON.StopIntent	exit
AMAZON.StopIntent	thanks
AMAZON.StopIntent	bye
AMAZON.StopIntent	thank you
exit	quit
exit	exit
exit	thanks
exit	bye
exit	enough
LoginIntent   this is a sample utterance containing a {EMAIL} using LITERAL
LoginIntent   login {EMAIL}
LoginIntent   login
```
