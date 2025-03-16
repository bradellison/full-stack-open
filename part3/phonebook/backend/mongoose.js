const mongoose = require('mongoose')
console.log('handling mongoose', mongoose)

if (process.argv.length<3) {
  console.log('give password')
  process.exit(1)
}

const password = process.argv[2]

const url =
//   `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`
    `mongodb+srv://bradellison:${password}@brad-free-mongodb.ekpic.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=brad-free-mongodb`

mongoose.set('strictQuery',false)

console.log('connecting to', url)
mongoose.connect(url)
console.log('connected')



