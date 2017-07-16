'use strict'

module.exports = dataSource => {
  return {
    sendMessage: payload => {
      if (payload && payload.content && payload.from) {
        const { to, from, content } = payload
        dataSource.push({ to, from, content })
      }
    },
    command () {},
    listenToMessages: (payload, observable) => {
      const { to, me, from } = payload
      const obs = observable || dataSource.get()
      return obs.filter(message => {
        return !message.to || message.to === me || message.from === me
      })
    },
    blockUser: function (payload, observable) {
      const { blocked, from } = payload
      const obs = observable || this.listenToMessages(payload)
      return obs.filter(message => {
        return message.from !== blocked
      })
    }
  }
}
