# BetterBots-Botkit
Step by step example on building a cross platform Botkit bot.  In this example
we've chosen to start with Alexa and then add FB Messenger.  Same approach can
be scaled to any channel.  We take a very fundamental approach to this where we
try to first present an opinion on the best way to build a bot and then how to
mirror that as closely as possible in Botkit.  

Coding experience always beneficial, but anyone should be able to follow these
steps.

In addition to the repo, you can find corresponding videos and docs on BetterBots:
https://betterbots.utu.ai/course/building-your-first-bot-with-botkit/

## Repo Overview

The repo is broken up into subdirectories where each directory relates to the learning objectives of a given lesson.

**Every directory contains valid code, but isn't necessarily executable.**

Everything up through 07 is intended to be run locally.  From 08 on the code is structured to run on a cloud provider of your choosing (in the example we use Heroku).  If you choose, you can run later lessons locally by keeping *localtunnel* in place within your listener.js.

## Getting Started

1. Clone the repo locally:
```
git clone
git@github.com:utu-ai/betterbots-botkit.git
```
2. Update NPM dependencies:
```
cd betterbots-botkit
npm i
```
3. Generally, we've set things up to minimize the amount of maintenance updating you need to do.  One change you will need to make though, is to point the \betterbots-botkit\package.json to the right lesson directory.  On line 41 in the package json, you will need to edit:
```
"start": "cross-env nodemon lesson-5-AI/src/index.js --watch src --exec babel-node"
```
to change the "lesson-5-AI" to correspond to the right lesson.
4. When running in local mode, you will also have to maintain an .env file that holds your cloud keys (e.g., Alexa AppId, etc.).  More detail below on .env.
5. To get things rolling, then from \betterbots-botkit\ (or whatever you named your local repo directory) simply type:
```
npm run start
```

## Environment Variables

The nature of the beast when building bots is that you are going to have a lot of external dependencies to provide rich functionality.  To maintain this interoperability you are going to need to initially create a spot to store these keys.  Once you move to the cloud this can migrate to your provider preferences, which is the case with Heroku.  

In the root \betterbots-botkit\ you are going to want to create a .env file.  We've provided a .env.example.

* SUBDOMAIN = your unique address to be used with localtunnel.
* ALEXA_APPID = provided by Amazon when you first setup a skill.
* UTU_SECRET = your bot key taken from the uTu console.
* FB_ACCESS_TOKEN = provided by Facebook after you've setup an app and enabled it for Messenger.
* FB_VERIFY_TOKEN = specific within your FB Messenger configuration.

Goes without saying, but to say it, be sure you **DONT STORE YOUR REAL KEYS IN YOUR PUBLIC REPO!**
