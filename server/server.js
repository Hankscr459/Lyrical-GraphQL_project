const express = require('express')
const path = require('path')
const publicPath = path.join(__dirname, '..', 'public')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')
const port = 4000;

const app = express()

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://localhost:27017';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

// db
mongoose.connect(
  MONGO_URI,
      {   
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
      },
  )
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, () => {
  console.log('Server is up!');
})
