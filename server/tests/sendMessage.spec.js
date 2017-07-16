const assert = require('assert')
const mockDataFactory = require('./mockDataFactory')
const servicesFactory = require('../web/services')

describe('Send Message Test', () => {
  it('must support sending a message', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    const from = 'Vince'
    const to = 'Jane Doe'
    const content = 'Hello there, the angel from my nightmare.'
    const message = { to, from, content }
    const subscription = mockData.get().subscribe(message => {
      assert.equal(message.from, from)
      assert.equal(message.to, to)
      assert.equal(message.content, content)
      subscription.unsubscribe()
      done()
    })
    // send
    services.sendMessage(message)
  })

  it('must support broadcast messages', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    const from = 'Vince'
    const content = 'Hello world!'
    const message = { from, content }

    const subscription = mockData.get().subscribe(message => {
      assert.equal(message.from, from)
      assert.equal(message.content, content)
      subscription.unsubscribe()
      done()
    })
    // send
    services.sendMessage(message)
  })
})
