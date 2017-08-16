function Chronice(fn) {
  let state = 'pending',
    deferred = null,
    value

  function resolve(newValue) {
    if (newValue && typeof newValue.then === 'function') {
      newValue.then(resolve)
      return
    }
    value = newValue
    state = 'resolved'

    if (deferred) {
      handle(deferred)
    }
  }

  function handle(handler) {
    if (state === 'pending') {
      deferred = handler
      return
    }

    if (!handler.onResolved) {
      handler.resolved(value)
      return
    }

    var ret = handler.onResolved(value)
    handler.resolve(ret)
  }

  this.then = function(onResolved) {
    return new Cromise(resolve => {
      handle({
        onResolved: onResolved,
        resolve: resolve
      })
    })
  }

  fn(resolve)
}

function doSomething() {
  return new Cromise(resolve => {
    let value = 42
    resolve(value)
  })
}

doSomething()
  .then(result => {
    console.log('first result', result)
    return 88
  })
  .then(result2 => {
    console.log('second result', result2)
  })
