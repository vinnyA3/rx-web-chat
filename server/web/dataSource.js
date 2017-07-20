'use strict'

const { Subject } = require('rxjs')
const Redis = require('ioredis')

const subscriber = new Redis()
const publisher = new Redis()
const topic = 'web_chat'

subscriber.subscribe(topic)

const messageObservable = Observable.fromEvent(subscriber, 'message', (channel, message) =>
  JSON.parse(message))

module.exports = {
  push (data) {
    publisher.publish(topic, JSON.stringify(data))
  },
  get () {
    return messageObservable
  }
}
