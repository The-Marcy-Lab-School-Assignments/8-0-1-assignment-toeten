const express = require('express')
const path = require('path')

const app = express()

const pathToDistFolder = path.join(__dirname, '../vite-project/dist')

//controllers (including middleware)



//middleware
    //logRoutes
    const logRoutes = (req, res, next) => {
      const time = (new Date()).toLocaleString()
      console.log(`${req.method}: ${req.originalUrl} - ${time}`)
      next()
    }
    //serveStatic
    const serveStatic = express.static(pathToDistFolder)

//app.use (middleware)
app.use(logRoutes)
app.use(serveStatic)

const port = '8080'

//listen!

app.listen(port, () => {
  console.log(`Server now running on http://localhost:${port}`)
})