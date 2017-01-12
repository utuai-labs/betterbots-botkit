# utu

SDK - uTu SDK written in javascript

[![npm version](https://badge.fury.io/js/utu.svg)](https://badge.fury.io/js/utu) [![NPM Status](http://img.shields.io/npm/dm/utu.svg?style=flat-square)](https://www.npmjs.org/package/utu)

## Installation

```sh
$ npm install --save utu
```

### Functions

#### Audience

An audience event is to track users in your system. You can call the same function to create and update an existing audience record. We will do so by checking the combination of Platform and PlatformID. You can supply and custom key / value identified you'd like for an audience record.

for things like `email`, `firstName`, `lastName` please keep the key as we have them so we can provide cross platform matching for your organization. Please see the list below.

```javascript
 import { Client, constants } from 'utu';
 const client = new Client('YOUR_UTU_API_KEY')

 client.User({
   platform: constants.SLACK, // required
   platformId: 'abc123', // required
   values: {
     firstName: "John", // example matching key
     lastName: "Doe", // example matching key
     email: "john@doe.com", // example matching key
     signedUpOn: new Date(), // example custom key
   }
 })
```

##### Matching keys

These are keys that we will use to try and link your users across platforms, channels, teams, and agents.

Key       | Example
:-------- | :-------------------
email     | john.doe@example.com
firstName | john
lastName  | doe

#### Message

A Message event is to track messages that come to and from your agent. Your system will need to create a sessionId to be able to track conversations. If you are using any NLP services you can use that same sessionId.

```javascript
  import { Client, constants } from 'utu';
  const client = new Client('YOUR_UTU_API_KEY')

  client.message({
    platform: constants.SLACK, // required
    platformId: 'abc123', // required
    values: {
      sessionId: "abc", // required
      message: 'hello',
      rawMessage: {
        text: 'hello',
        attachments: [],
      }, // required
      botMessage: true, // required (true if the message is coming from your bot)
    }
  })
```

#### Event

A custom event is any other type of event you'd like to track. You can add any values you want into the `Values` object. This is useful for tracking custom user events, i.e. `Asked for Horoscope`.

```javascript
  import { Client, constants } from 'utu';
  const client = new Client('YOUR_UTU_API_KEY')

  client.event('your custom event name', {
    platform: constants.SLACK, // required
    platformId: 'abc123', // required
    values: { // you can log key value paired data here
      myCustomValue: 'hello world',
    }
  })

 client.Event("Asked for Horoscope", Event{
   Platform: utu.MESSENGER,
   PlatformID: "abc123",
   Values: utu.Values{
     "time": time.Now(),
   },
 })
```
