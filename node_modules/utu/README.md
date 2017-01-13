# utu

SDK - uTu SDK written in javascript

[![npm version](https://badge.fury.io/js/utu.svg)](https://badge.fury.io/js/utu) [![NPM Status](http://img.shields.io/npm/dm/utu.svg?style=flat-square)](https://www.npmjs.org/package/utu)

## Installation

```sh
$ npm install --save utu
```

### Constants

Contants are used so you know you have the correct value needed for uTu to process the request. We mainly use this for the platforms we support, which are as follows:

- MESSENGER
- KIK
- ALEXA
- SLACK

you can access the constants via an import

```javascript
import { constants } from 'utu';

// within constants you will have access to the following:
// constants.MESSENGER
// constants.KIK
// constants.ALEXA
// constants.SLACK
```

### Functions

#### User

A user event is to track users in your system. You can call the same function to create and update an existing audience record. We will do so by checking the combination of Platform and PlatformID. You can supply and custom key / value identified you'd like for an audience record.

for things like `email`, `firstName`, `lastName` please keep the key as we have them so we can provide cross platform matching for your organization. Please see the list below.

```javascript
 import { uTu, constants } from 'utu';
 const client = new uTu('YOUR_UTU_API_KEY')

 client.user({
   platform: constants.SLACK, // required
   platformId: 'abc123', // required
   values: {
     firstName: "John", // example matching key
     lastName: "Doe", // example matching key
     email: "john@doe.com", // example matching key
     signedUpOn: new Date(), // example custom key
   }
 }).catch((err) => console.log(err))
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
  import { uTu, constants } from 'utu';
  const client = new uTu('YOUR_UTU_API_KEY')

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
  }).catch((err) => console.log(err))
```

#### Event

A custom event is any other type of event you'd like to track. You can add any values you want into the `Values` object. This is useful for tracking custom user events, i.e. `Asked for Horoscope`.

```javascript
  import { uTu, constants } from 'utu';
  const client = new uTu('YOUR_UTU_API_KEY')

  client.event('your custom event name', {
    platform: constants.SLACK, // required
    platformId: 'abc123', // required
    values: { // you can log key value paired data here
      myCustomValue: 'hello world',
    }
  }).catch((err) => console.log(err))

 client.event("Asked for Horoscope", {
   platform: constants.MESSENGER,
   platformId: "abc123",
   values: {
     "horoscope": "Leo"
     "time": new Date(),
   },
 }).catch((err) => console.log(err))
```

### Hidden Features

There are a few different ways to use our sdk. Below are some extra sugar functions that you integrate with uTu.

#### Configs

You can set default configs on the client so you don't need to replicate the same lines over and over again. Just remember they will be sent with every request

```javascript
import { uTu, constants } from 'utu';
const client = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA,
  appId: 'my alexa skill id', // this can also be slack team, etc.
})
```

There is also a function to do this, incase you need to set the config after initialization.

```javascript
import { uTu, constants } from 'utu';
const client = new uTu('YOUR_UTU_API_KEY');

client.setConfig({
  platform: constants.ALEXA,
  appId: 'my alexa skill id', // this can also be slack team, etc.
});
```

#### Context

So sometimes you want to log multiple items within a given sequence of events, but you do not want to keep typing the same thing over and over again. So we have added context. Which returns a new instance of the client bound with new request values.

```javascript
import { uTu, constants } from 'utu';

const client = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA
});

const ctx = client.withContext({
  platformId: 'abc123',
  sessionId: 'abc123',
});

// now each request i make from `ctx` will have `platform` bound from the config, `platformId` bound from ctx, and `sessionId` bound from ctx
ctx.user({
  values: {
    firstName: "John"
  }
});

ctx.event('User Joined', {
  values: {
    joined: new Date(),
  }
});
```

#### Set values

Setting values are again extra sugar to make your life easy, but if used wrong can cause invalid data to be sent. Setting Values through these functions can only be done if you are using context.

```javascript
import { uTu, constants } from 'utu';

const client = new uTu('YOUR_UTU_API_KEY', {
  platform: constants.ALEXA
});

const ctx = client.withContext({
  platformId: 'abc123',
  sessionId: 'abc123',
});

ctx.setValues({
  sign: 'leo'
});

// we not longer need an object passed on any events/user/messages because we have
// already setup the whole request via context and setting values to that context
ctx.event('Got Horoscope');
ctx.event('Sent Horoscope');

// set a new single value, just remember this is persisted through each ctx request
ctx.setValue('recievedAt', new Date());

ctx.event('Door Opened');
```

#### Promises!

Everything is promise based so have fun! use your async await or catch your way through any errors you have.

```javascript
// promise example
ctx.event('Got Horoscope').then().catch()

//async await example
async function () {
  const result = await ctx.event('Got Horoscope');
}
```
