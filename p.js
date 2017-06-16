function Cromise(fn) {
  let state = 'pending',
    value,
    deferred

  function resolve(newValue) {
    value = newValue
    state = 'resolved'

    if (deferred) {
      handle(deferred)
    }
  }

  function handle(onResolved) {
    if (state === 'pending') {
      deferred = onResolved
      return
    }

    onResolved(value)
  }

  this.then = function(onResolved) {
    handle(onResolved)
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
