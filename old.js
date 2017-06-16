function doSomething(callback) {
  const value = 42
  callback(value)
}

doSomething((value) => {
  console.log(`Got a value: ${value}`)
})
