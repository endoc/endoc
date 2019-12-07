const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const https = require('https')

const routeImporter = require('./routes')
const config = require('./env/config.json')

const app = express()

app.use(express.static(path.join(__dirname, 'client/dist')))
app.use(bodyParser.urlencoded({
  'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))
app.use(cors())
mongoose.connect(process.env.MONGO_CON_STR || config.DB.Mongo_ConStr, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log('Error: Database connection!\nStopping application...')
    process.exit(22)
  } else {
    // Import API routes
    app.use('/api/', routeImporter)

    // Client-side pages
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/dist/index.html'))
    })

    const port = process.env.PORT || config.Port || 3200
    // https.createServer({
    //   key: fs.readFileSync('env/server.key'),
    //   cert: fs.readFileSync('env/server.cert')
    // }, app)
    //   .listen(3000, function () {
    //     console.log('App started successfully on port ' + port)
    //   })

    app.listen(port, () => console.log('App started successfully on port ' + port))
  }
})
