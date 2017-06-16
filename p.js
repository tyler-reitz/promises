function Cromise(fn) {
  let state = 'pending',
    deferred = null,
    value

  function resolve(newValue) {
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
    return new Cromise((resolve) => {
      handle({
        onResolved: onResolved,
        resolve: resolve
      })
    })
  }

  fn(resolve)
}

function doSomething() {
  return new Cromise((resolve) => {
    let value = 42
    resolve(value)
  })
}

doSomething().then((value) => {
  console.log(`Got a value: ${value}`)
})

doSomething().then((value) => {
  console.log(`Got the same value again: ${value}`)
})
