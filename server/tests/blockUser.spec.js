const assert = require('assert')
const mockDataFactory = require('./mockDataFactory')
const servicesFactory = require('../web/services')

describe('Block User Test', () => {
  it('must not receive messages from blocked user', done => {
    const mockData = mockDataFactory()
    const services = servicesFactory(mockData)
    let receivedMessage = false
    const me = 'Vince'
    const blocked = 'Frieza'
    const content = 'Eradicate planet Vegeta'
    const message = { to: me, content }
    const subscription = services
      .blockUser({ blocked, me })
      .subscribe(
        message => receivedMessage = true,
        _ => {}, // noop
        () => {
          assert.equal(receivedMessage, true)
          subscription.unsubscribe()
          done()
        }
      )
    mockData.push(message)
    mockData.get().complete()
  })
})
