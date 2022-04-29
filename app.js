'use strict'

// variables globales
const express = require("express")
const app = express()
var CORS = require("cors")
const bodyParser = require("body-parser")

var api = express.Router()
//CARGA DE RUTAS
    var routes = require("./routes/routes")
   
//MIDDLEWARES
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(CORS())

   

   

//RUTAS 
app.use('/api', routes)

//EXPORTAR
module.exports = app