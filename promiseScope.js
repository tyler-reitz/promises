const db = new Promise((resolve, rerject) => {
  const start = new Date()
  setTimeout(() => {
    const end = new Date()
    resolve({start, end })
  }, 2000)
})

db.then(secs => console.log(secs))