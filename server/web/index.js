const { Observable } = require('rxjs')
const dataSource = require('./dataSource')
const services = require('./services')(dataSource)

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

http.listen(3000, () => console.log('Listening on Port 3000'))

// Listen for socket connections
Observable.fromEvent(io, 'connection')
  .subscribe(client => {
    // Store current: blockUser needs param
    let currentObservable = null
    Observable.fromEvent(client, 'request')
      .map(payload => JSON.parse(payload))
      .switch(payload => {
        let serviceObservable = services[payload.service](payload, currentObservable)
        if (serviceObservable) {
          currentObservable = serviceObservable
        }
        return currentObservable
      })
      .takeUntil(Observable.fromEvent(client,'disconnect'))
      .subscribe(data => client.emit('message', data))
  })
