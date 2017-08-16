
const myProm = new Promise(resolve, reject) {

  setTimeout(function() {
    resolve(console.log(text))
  }, 3000)

}

myProm.then('text')
