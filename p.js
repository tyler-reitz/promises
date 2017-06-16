function Promise(fn) {
  let callback = null
  this.then = function(cb) {
    callback = cb
  }

  function resolve(value) {
    callback(value)
  }

  fn(resolve)
}

function doSomething() {
  return new Promise((resolve) => {
    let value = 42
    resolve(value)
  })
}

doSomething().then((value) => {
  console.log(`Got a valval: ${value}`)
})
