'use strict'

const { Subject } = require('rxjs')

const messageSubject = new Subject()

module.exports = {
  push (data) {
    messageSubject.next(data)
  },
  get () {
    return messageSubject
  }
}
