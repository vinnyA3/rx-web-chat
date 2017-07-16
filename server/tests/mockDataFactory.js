const { Subject } = require('rxjs')

module.exports = () => {
  const messagesSubjectMock = new Subject()
  return {
    push (data) {
      messagesSubjectMock.next(data)
    },
    get () {
      return messagesSubjectMock
    }
  }
}
