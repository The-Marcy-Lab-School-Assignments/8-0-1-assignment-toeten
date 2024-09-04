const express = require('express')
const path = require('path')

const app = express()

const pathToDistFolder = path.join(__dirname, '../vite-project/dist')

//controllers (including middleware)

//response controllers
const serveSlash = (req,res,next) => {
  res.sendFile(__dirname + '/index.html')
}

const serveAbout = (req, res, next) => {
  res.send(`
    <h1>About me</h1>
    <p>I am so cool like....</p>
  `);
};


const serveWhat = (req,res,next) => {
  const {name, favFood} = req.query
  res.send(`My name is ${name} and my favorite food is ${favFood}`)
}

const serveData = (req,res,next) => {
  const coolPeople = [{name: 'nicole'}, {name: 'javier'}, {name: 'noe'}]
  res.send(coolPeople)
}


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

//app.get (response controllers)
app.get('/', serveSlash)
app.get('/about', serveAbout)
app.get('/api/what', serveWhat)
app.get('/api/data', serveData)

const port = '8080'

//listen!

app.listen(port, () => {
  console.log(`Server now running on http://localhost:${port}`)
})