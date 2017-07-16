const assert = require('assert')
const mockDataFactory = require('./mockDataFactory')
const servicesFactory = require('../web/services')

describe('Listen to message test', () => {
  it('must listen to messages sent to me', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    const me = 'Vince'
    const content = 'yerp'
    const message = { to: me, content }
    const subscription = services
      .listenToMessages({ me })
      .subscribe(message => {
        assert.equal(message.to, me)
        assert.equal(message.content, content)
        subscription.unsubscribe()
        done()
      })
    // send message
    mockData.push(message)
  })

  it('must listen to messages sent to all', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    const me = 'Vince'
    const content = 'Lets go for lunch!'
    const message = { content }
    const subscription = services
      .listenToMessages({ me })
      .subscribe(message => {
        assert.equal(message.content, content)
        subscription.unsubscribe()
        done()
      })
    mockData.push(message)
  })

  it('must not listen to message send privately', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    let receivedMessage = false
    const me = 'Vince'
    const to = 'other'
    const content = 'Nobody cared who I was until I put on the mask...'
    const message = { to, content }
    const subscription = services
      .listenToMessages({ me })
      .subscribe(message => {
        receivedMessage = true
      },
      _ => {}, // noop
      () => {
        assert.equal(receivedMessage, false)
        done()
      })
      mockData.push(message)
      mockData.get().complete()
  })
})
